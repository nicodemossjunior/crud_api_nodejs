import express from 'express'
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}`+
      '@cluster0.7gcs9.mongodb.net/bank?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Conectado ao MongoDB Atlas.');
  } catch (err) {
    console.log('Erro a conectar ao MongoDB Atlas ' + err);
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT, () => console.log('API iniciada'));