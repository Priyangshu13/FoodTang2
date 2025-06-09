import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import managerUserRouter from './routes/managerUserRoute.js';
import adminUserRouter from './routes/adminUserRoute.js';
import orderRouter from './routes/orderRoute.js';
import inventoryRouter from './routes/inventoryRoute.js';

import { requestLogger, errorHandler } from './middleware/errorinventory.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/images', express.static('uploads'));

app.use('/admin', adminUserRouter);
app.use('/manager', managerUserRouter);
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);      // **Important: orderRouter mounted here**
app.use('/api/inventory', inventoryRouter);

app.get('/', (req, res) => res.send('API is working'));

app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });
