import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connectdb.js';
dotenv.config();
import addressRoutes from './routes/addressRoutes.js';

const app = express();

app.use(cors());
app.use(json());

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017'   

connectDB(DATABASE_URL);

app.use('/api/addresses', addressRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});