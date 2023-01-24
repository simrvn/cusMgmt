import { Customer, Customers, ICustomer } from "../models/Customer";

let userStorage: Customer[] = [];

const getUserStorage = () => {
  return userStorage;
};

interface IRepository {
  create(customer: ICustomer): void;
  delete(id: number): void;
  getCustomers(): any;
  getCustomerByID(id: number): any;
  searchByName(customerName: string): any;
  update(customer: ICustomer): void;
}

class ArrayRepository implements IRepository {
  create(customer: ICustomer): void {
    const newCustomer = new Customer(customer);
    getUserStorage().push(newCustomer);
  }

  delete(id: number): void {
    if (getUserStorage().length === 0)
      console.log("There are no users in the database");
    getUserStorage().splice(getIndex(id), 1);
  }

  getCustomers() {
      return getUserStorage();
  }

  getCustomerByID(id: number) {
    return getUserStorage().find((cust) => cust.id === id);
  }

  //TODO: relook at this
  searchByName(customerName: string): Customer[] {
    return getUserStorage().filter(
      (cust) =>
        cust.firstName === customerName || cust.lastName === customerName
    );
  }

  update(customer: ICustomer): void {
    getUserStorage()[getIndex(customer.id)].firstName = customer.firstName;
    getUserStorage()[getIndex(customer.id)].lastName = customer.lastName;
  }
}

class MongoRepository implements IRepository {
  async create(customer: ICustomer): Promise<void> {
    const existingCustomer = await Customers.findOne({ id: customer.id });
    if (existingCustomer) {
      throw new Error(`A customer with id: ${customer.id} already exists`);
    } else {
      const newCustomer = new Customers(customer);
      await newCustomer.save();
    }
  }

  async delete(id: number): Promise<void> {
    await Customers.deleteOne({ id: id });
  }

  async getCustomers() : Promise<Customer[]>{
    return await Customers.find();
  }

  async getCustomerByID(id: number) {
      return await Customers.findOne({id: id});
  }

  async searchByName(customerName: string): Promise<Customer[]> {
    return await Customers.find({
      $or: [{ firstName: customerName }, { lastName: customerName }],
    });
  }
  
  async update(customer: ICustomer): Promise<void> {
    await Customers.updateOne(
      { id: customer.id },
      { firstName: customer.firstName, lastName: customer.lastName }
    );
  }
}

const getIndex = (id: number) => {
  return id - 1;
};

export { IRepository, ArrayRepository, MongoRepository, getUserStorage };
