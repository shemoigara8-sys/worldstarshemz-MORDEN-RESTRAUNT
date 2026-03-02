const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const ordersRoutes = require('./routes/orders');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});