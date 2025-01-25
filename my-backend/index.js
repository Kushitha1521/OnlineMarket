const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const products = [
  { id: 1, name: 'Laptop', price: '$999', image: 'https://images.unsplash.com/photo-1612838818789-8e9689e59b08' },
  { id: 2, name: 'Smartphone', price: '$499', image: 'https://images.unsplash.com/photo-1604079112971-8b34f07b3952' },
  { id: 3, name: 'Headphones', price: '$199', image: 'https://images.unsplash.com/photo-1612223428664-423e2404ebdd' },
  { id: 4, name: 'Smartwatch', price: '$129', image: 'https://images.unsplash.com/photo-1593642634441-87b6c56f20a7' },
];


// Get products list
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
