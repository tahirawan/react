import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/products', async (req, res) => {
  const meals = await fs.readFile('./data/available-products.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.get('/cart', async (req, res) => {
  const cartData = await fs.readFile('./data/cartData.json', 'utf8');
  res.json(JSON.parse(cartData));
});

app.post('/cart', async (req, res) => {
  const cartData = req.body;
  console.log(cartData);
  // return res.status(200).json({ message: 'Cart updated!' });
  if (cartData === null || cartData.items === null) {
      return res.status(400).json({ message: 'Missing data.' });
  }
  // const cartData = await fs.readFile('./data/cartData.json', 'utf8');
  // const allOrders = JSON.parse(cartData);
  // allOrders.push(newOrder);
  await fs.writeFile('./data/cartData.json', JSON.stringify(cartData));
  res.status(200).json({ message: 'Cart updated!' });
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  //sleep
  //await new Promise((resolve) => setTimeout(resolve, 2000));

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postcode'] === null ||
    orderData.customer['postcode'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
