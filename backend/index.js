const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/home', authMiddleware, (req, res) => {
  res.json({ message: `Welcome User ${req.user.id}` });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch(err => console.error(err));
