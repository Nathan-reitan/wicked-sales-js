require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `select "productId",
                      "name",
                      "price",
                      "image",
                      "shortDescription"
                from "products"
                order by "productId" asc;
                `;

  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.status(200).send(products);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).send('An unexpected error has occurred');
    });
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: '"ProductId" must be a positive integer'
    });
  }
  const sql = `select *
                from "products"
                where "productId" = $1
                `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const products = result.rows;
      if (!products[0]) {
        res.status(404).json({
          ClientError: `Cannot find product with productId: ${productId}`
        });
        next();
      } else {
        res.status(200).send(products[0]);
      }
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

app.get('/api/cart', (req, res, next) => {
  const params = [req.session.cartId];
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    db.query(`select "c"."cartItemId",
              "c"."price",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
              from "cartItems" as "c"
              join "products" as "p" using ("productId")
            where "c"."cartId" = $1
           `, params)
      .then(cart => {
        return res.status(201).json(cart.rows[0]);
      });
  }

});

app.post('/api/cart', (req, res, next) => {
  const productId = req.body.productId;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const params = [productId];
  const sql = `select price
                from "products"
                where "productId" = $1
                `;
  db.query(sql, params)
    .then(response => {
      const product = response.rows[0];
      if (!product) {
        throw new ClientError('no product found with that productId', 400);
      }
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: product.price
        };
      }
      return db.query(`insert into "carts" ("cartId", "createdAt")
                values (default, default)
                returning "cartId"
                `)
        .then(result => {
          return result.rows[0];
        })
        .then(cart => {
          return {
            cartId: cart.cartId,
            price: product.price
          };
        });
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const params = [data.cartId, productId, data.price];
      return db.query(`insert into "cartItems" ("cartId", "productId", "price")
                      values ($1, $2, $3)
                      returning "cartItemId"
                      `, params);
    })
    .then(response => {
      const cartItemId = response.rows[0].cartItemId;
      const params = [cartItemId];
      return db.query(`select "c"."cartItemId",
                      "c"."price",
                      "p"."productId",
                      "p"."image",
                      "p"."name",
                      "p"."shortDescription"
                      from "cartItems" as "c"
                      join "products" as "p" using ("productId")
                      where "c"."cartItemId" = $1
                      `, params)
        .then(cartInventory => res.status(201).send(cartInventory.rows[0]));
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  const name = req.body.name;
  const creditCard = req.body.creditCard;
  const shippingAddress = req.body.shippingAddress;
  if (!cartId) {
    return res.status(400).send('No cart exists.');
  }
  if (!name) {
    return res.status(400).send('Please insert your name.');
  } else if (!creditCard) {
    return res.status(400).send('Please insert your credit card.');
  } else if (!shippingAddress) {
    return res.status(400).send('Please insert the shipping Address.');
  }
  const params = [cartId, name, creditCard, shippingAddress];
  const order = `
              INSERT into "orders" ("orderId", "cartId", "name", "creditCard", "shippingAddress", "createdAt")
              VALUES (default, $1, $2, $3, $4, default)
              RETURNING *
              `;
  db.query(order, params)
    .then(response => response.rows[0])
    .then(data => {
      if (data) {
        delete req.session.cartId;
      }
      res.status(201).json(data);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
