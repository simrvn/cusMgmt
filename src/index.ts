import express, { Express, Request, Response} from 'express';
import {router} from './routes/customers'
import dotenv from 'dotenv';
import { connectDB } from './database/dbconnection';
import { persistentMode } from './constants/persistantMode';


const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

if (!persistentMode) {
  connectDB();
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/customers', router);

app.listen(PORT, ()=> {console.log(`App running on http://localhost:${PORT}`);});


