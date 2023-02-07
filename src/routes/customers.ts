import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import {
  ArrayRepository,
  getUserStorage,
  IRepository,
  MongoRepository,
} from "../repository/CustomerRepository";
import { persistentMode } from "../constants/persistantMode";

const router = Router();

router.use(bodyParser.json());
let repository: IRepository;

if (persistentMode) {
  repository = new ArrayRepository();
} else {
  repository = new MongoRepository();
}

router.get("/", async (req: Request, res: Response) => {
  res.send(await repository.getCustomers());
});

router.post("/", async (req: Request, res: Response) => {
  repository.create(req.body);
  res.send("User successfully added");
});

router.get("/:id", async (req: Request, res: Response) => {
  res.send(await repository.getCustomerByID(Number(req.params.id)));
});

router.delete("/:id", (req: Request, res: Response) => {
  repository.delete(Number(req.params.id));
  res.send("User successfully deleted");
});

router.put("/:id", (req: Request, res: Response) => {
  repository.update(req.body);
  res.send("User successfully updated");
});

router.get("/search/:name", async (req: Request, res: Response) => {
  res.send(await repository.searchByName(req.params.name));
});

export { router };
