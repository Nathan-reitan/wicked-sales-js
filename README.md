# wicked-sales
A full stack Node.js and React shopping cart app
## Live Site
See the live site here - [wickedSales](https://wicked-sales.nathanreitan.com/)
## Technologies
* HTML5
* CSS3
* React
* Bootstrap
* AWS EC2
* Node
* PostgreSQL
* Webpack 4
## Feature List
1. User can view the products for sale - Full Stack
2. User can view the details of a product - Full Stack
3. User can add a product to their cart - Full Stack
4. User can view their cart summary - Front End
5. User can place an order - Full Stack
## System Requirements
* Node.js 10 or higher
* NPM 6 or higher
## Getting Started
1. Clone the repository and navigate to the directory
```
cd wickedSales
```
2. Install all dependencies with NPM
```
npm install
```
3. Setup database
```
pgweb --db=wickedSales
```
4. initialize postgres server
```
sudo service postgresql start
```
5. Import existing database
```
npm run db:import
```
6. Start the project.  Once your system finishes compiling you can view the application by opening http:localhost:3000 in your browser
```
npm run dev
```
