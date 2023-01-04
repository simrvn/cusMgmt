import { Router, Request, Response } from "express";
import {
  deleteCustomer,
  searchCustomer,
  updateCustomer,
  userStorage,
} from "../repository/CustomerRepository";
import { createCustomer } from "../repository/CustomerRepository";
import bodyParser from "body-parser";
import { toggle } from "../configs/toggleConfig";
import { Customers } from "../models/CustomerSchema";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req: Request, res: Response) => {
  res.render("index", { custList: [] });
});

//create new customer
router.post("/api/create-customer", (req: Request, res: Response) => {
  try {
    const id = Math.floor(Math.random() * 1000);
    const firstName = req.body.firstName;
    const lastName =  req.body.lastName;
    if (toggle) {
      const customer = new Customers({
        id,
        firstName,
        lastName
      });
      customer.save();
    } else {
      createCustomer(
        id,
        firstName,
        lastName
      );
    }
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

//search customer by name
router.get("/search", (req: Request, res: Response) => {
  res.render("searchCustomer", {
    custList: searchCustomer(req.query.custName as string),
  });
});

//delete customer
router.delete("/api/customer/:id", (req: Request, res: Response) => {
  try {
    deleteCustomer(Number(req.params.id));
    res.send({ message: "Customer deleted succesfully" });
  } catch (error) {
    res.send(error);
  }
});

//display all customers
router.get("/api/customers", (req: Request, res: Response) => {
  try {
    res.json(userStorage);
  } catch (error) {
    res.send(error);
  }
});

//update customer
router.put("/api/customer/:id", (req: Request, res: Response) => {
  try {
    updateCustomer(
      Number(req.params.id),
      req.body.firstName,
      req.body.lastName
    );
    res.send({ message: "Customer updated successfully" });
  } catch (error) {
    res.send(error);
  }
});

export { router };
