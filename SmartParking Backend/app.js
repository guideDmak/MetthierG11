import express from 'express';
import cors from 'cors';
import usersRouter from './routers/usersRouter.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});