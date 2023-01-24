import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import { ArrayRepository, getUserStorage, IRepository, MongoRepository } from "../repository/CustomerRepository";
import { Customer } from "../models/Customer";

const router = Router();

router.use(bodyParser.json());

let repository: IRepository;
const persistentMode = false;

if (persistentMode){
  repository = new ArrayRepository();
}
else {
  repository = new MongoRepository();
}

router.get('/', (req: Request, res: Response) => {
  res.send(repository.getCustomers());
});

router.post('/', (req: Request, res: Response) => {
  repository.create(req.body);
  res.send("User successfully added");
});

router.get('/:id', (req: Request, res: Response) => {
  res.send(repository.getCustomerByID(Number(req.params.id)));
});

router.delete('/:id', (req: Request, res: Response) => {
  repository.delete(Number(req.params.id));
  res.send("User successfully deleted");
});

router.put('/:id', (req: Request, res: Response) => {
  repository.update(req.body);
  res.send("User successfully updated");
});

router.get('/search/:name', (req: Request, res: Response) => { 
  res.send(repository.searchByName(req.params.name));
});

export { router };
