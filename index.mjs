import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gradesRouter from './routes/grades.mjs';
import connectDB from './db/conn.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/grades', gradesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Initialize connection and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(console.error);