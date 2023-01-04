import { Router, Request, Response, request } from "express";
import { userStorage } from "../repository/CustomerRepository";
import { createCustomer } from "../repository/CustomerRepository";
import bodyParser from "body-parser";

const router = Router();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

router.get("/customers", (req: Request, res: Response) => {
  res.json(userStorage);
});

router.post(
  "/api/create-customer",
  urlencodedParser,
  (req: Request, res: Response) => {
    try {
        createCustomer(
          userStorage.length + 1,
          req.body.firstName,
          req.body.lastName
        );
        console.log(userStorage);
        res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  }
);

export { router };
