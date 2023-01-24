import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
import notFound from './middlewares/not-found.js';
import errorMiddleware from './middlewares/error-handler.js';
import taskRoutes from './routes/task.js';
const app = express();
app.use('/api/v1/task', taskRoutes);
app.use(express.json());
app.use(notFound);
app.use(errorMiddleware);
const PORT = process.env.PORT || 15000;
const start = async() => {
 try {
  return await connectDB(process.env.CONNECTIONSTRING),
  app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}...`);
  })
 } catch(error) {
  console.log({msg:error});
 }
}

start();