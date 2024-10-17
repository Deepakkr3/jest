import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/ormConfig';
import userRoutes from './routes/userRoutes';

export const app = express();

app.use(express.json());
app.use('/api', userRoutes);

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => console.log('Error during Data Source initialization:', error));
