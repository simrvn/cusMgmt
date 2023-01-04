import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {router} from './routes/routes'
import { createCustomer } from './repository/CustomerRepository';
import { connectDB } from './database/dbconnection';
import { Customers } from './models/CustomerSchema';
dotenv.config({path: './configs/config.env'});


const app: Express = express();
const PORT = process.env.PORT || 8080;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

connectDB();

app.use(router);

app.listen(PORT, ()=> {console.log(`App running on http://localhost:${PORT}`);});


