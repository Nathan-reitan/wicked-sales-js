--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
12	10	3	2900
13	11	3	2900
14	12	3	2900
15	13	3	2900
16	14	2	2595
17	15	3	2900
18	16	3	2900
19	17	3	2900
20	18	3	2900
21	18	2	2595
22	18	1	2999
23	19	3	2900
24	19	2	2595
25	19	1	2999
26	20	3	2900
27	21	3	2900
28	22	1	2999
29	22	3	2900
30	23	3	2900
31	23	2	2595
32	24	3	2900
33	24	2	2595
34	24	1	2999
35	25	3	2900
36	25	2	2595
37	25	1	2999
38	26	3	2900
39	26	2	2595
40	26	1	2999
41	27	3	2900
42	27	2	2595
43	27	1	2999
44	28	3	2900
45	28	2	2595
46	28	1	2999
47	29	1	2999
48	29	2	2595
49	29	3	2900
50	29	4	999
51	30	1	99900
52	31	3	74999
53	32	3	74999
54	33	3	74999
55	33	2	74999
56	34	2	74999
57	34	3	74999
58	35	2	74999
59	35	3	74999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-04-25 13:12:19.027911-07
2	2020-04-25 13:12:47.673861-07
3	2020-04-25 13:13:48.250911-07
4	2020-04-25 13:14:17.564455-07
5	2020-04-25 13:18:51.356284-07
6	2020-04-25 13:22:26.008428-07
7	2020-04-25 13:26:12.663423-07
8	2020-05-18 10:29:13.87203-07
9	2020-05-18 16:19:42.146153-07
10	2020-05-18 17:28:41.131711-07
11	2020-05-19 12:20:10.912569-07
12	2020-05-19 12:28:24.548899-07
13	2020-05-19 12:29:47.517854-07
14	2020-05-19 12:30:28.302373-07
15	2020-05-19 12:31:08.516515-07
16	2020-05-19 12:31:38.637358-07
17	2020-05-19 12:32:22.136144-07
18	2020-05-19 12:33:02.456166-07
19	2020-05-19 12:34:52.755182-07
20	2020-05-19 12:37:45.052709-07
21	2020-05-19 12:46:22.052963-07
22	2020-05-19 12:52:35.757143-07
23	2020-05-19 12:54:13.52903-07
24	2020-05-19 13:01:40.723408-07
25	2020-05-19 13:02:40.678968-07
26	2020-05-19 13:04:01.259566-07
27	2020-05-19 13:04:33.199331-07
28	2020-05-19 13:05:25.267701-07
29	2020-05-19 13:06:16.494806-07
30	2020-05-26 13:57:02.534583-07
31	2020-05-26 13:59:31.317053-07
32	2020-05-26 14:33:18.089611-07
33	2020-05-26 14:34:23.482181-07
34	2020-05-26 14:35:07.810717-07
35	2020-05-26 14:35:45.307846-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
1	NZXT Starter PC	99900	/images/nzxt-starter.png	A starter PC guaranteed to provide up to 80 FPS running Fortnite	This PC is a great starting PC built in a NZXT H510 White case an Intel Core i5-9400F 6-Core 2.9GHz processor an NVIDIA GeForce GTX 1660 Ti-MSI Ventus XS 6G OC graphics card, an ASRock B365 Phantom Gaming 4 Motherboard, 16GB of Team T-Force Vulcan Z RAM, 1TB of storage, a 500W power supply, Microsoft Windows 10 Operating System, and a 2 year warranty on all parts & labor
4	24" Predator XB1 Gaming Monitor	39999	/images/acer-predator.png	Harness the brilliant colors and vivid display of this Acer Predator monitor.	It displays 16.7 million colors and has a resolution of 1920 x 1080 pixels to provide an incredible viewing experience. This 24-inch LCD Acer Predator monitor with built-in speakers uses LED backlight technology to provide a crisp, clean display.
6	Logitech G910	19999	/images/logitechG910.webp	An amazing Logitech keyboard with RGB capability	Maintain full control of your gaming commands with the customizable, illuminated keys on this Orion Spectrum mechanical gaming keyboard. Connect the unit to a smartphone or tablet to display in-game information when you need a second screen. Anti-ghosting protection keeps the Orion Spark mechanical gaming keyboard from freezing up during intense gaming sessions.
2	IBUYPOWER	74999	/images/iBUYPOWER.png	Game to your full potential with this iBUYPOWER gaming desktop computer.	The Intel Core i5 processor and 8GB of RAM multitask smoothly, while the 1TB HDD and a 240GB SSD offer ample file storage space and rapid booting. This iBUYPOWER gaming desktop computer has an NVIDIA GeForce GTX 1650 SUPER graphics card to render detailed visuals for total immersion in your favorite RPG or FPS titles, and the air cooling system keeps components running at optimal temperatures.
5	Logitech G502	4699	/images/logitechG502.png	Step up your game with this Logitech HERO Core wired gaming mouse.	This highly customizable device makes it easy to enhance your performance with surface tuning calibration for improved accuracy and 11 programmable buttons for custom commands. This Logitech HERO Core wired gaming mouse lets you change DPI on the fly with three convenient buttons for instant adjustments.
3	ABS Rogue	74999	/images/abs-rogue.png	Get a leg up on your competitors with this ABS Rogue	Great budget PC right now thats perfect for upgrades and still has a great punch as is with the RX 580 8gb version which it does not say in the title, and the Ryzen 2600 handles pretty much any game as well, also it does come with 1 stick (1x8gb) so you can add more ram in the 2nd ram slot (motherboard has 2 slots total) once you have the money. The computer also comes with a 512gb ssd with Windows 10 obviously installed to it making the whole pc much faster and zippy whatever you might be doing, after the Windows 10 install I recall having somewhere between 450-480 gb left and it has 2 apps pre-installed and the Newegg webpage on the desktop, now bloatware at all Better than whats in the pictures, the pictures show a 400w power supply which I heard might be kind of pushin it to be enough wattage for the system, and adding more cooling fans (since there is only 1 case and and the cpu fan) would just use up more wattage-but it actually comes with a Raidmax 500w psu which makes me feel a lot safer, plus it comes with a one year warranty.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 59, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 35, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 6, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

