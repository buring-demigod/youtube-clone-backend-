const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const dataRoutes = require('./routes/dataRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/', dataRoutes);
app.use('/', userRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});