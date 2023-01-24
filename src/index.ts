import express, { Express, Request, Response} from 'express';
import {router} from './routes/customers'
import { connectDB } from './database/dbconnection';
import dotenv from 'dotenv';


const app: Express = express();
dotenv.config();
const PORT = process.env.PORT || 8080;


// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/customers', router);

app.listen(PORT, ()=> {console.log(`App running on http://localhost:${PORT}`);});


