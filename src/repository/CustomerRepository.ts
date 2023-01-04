import { Customer } from "../models/Customer";
import { Customers } from "../models/CustomerSchema";
let userStorage: Customer[] = [];

const createCustomer = (id: number, firstName: string, lastName: string) => {

    const customer = new Customer(id, firstName, lastName);
    userStorage.push(customer);

  
};

const searchCustomer = (customerName: string) => {

    return userStorage.filter(
      (cust) => cust.firstName === customerName || cust.lastName === customerName
    );

};

const searchCustomerByID = (id: number) => {
  return userStorage.find((cust) => cust.id === id);
}

const deleteCustomer = (id: number) => {
  if (userStorage.length === 0)
    console.log("There are no users in the database");

  userStorage.splice(getIndex(id), 1);
};

const updateCustomer = (id: number, newFirstName: string, newLastName: string) => {
  userStorage[getIndex(id)].firstName = newFirstName;
  userStorage[getIndex(id)].lastName = newLastName;
};

const getIndex = (id: number) => {return id-1;};


// const searchCustomerDB = (name: string) => {
//   const customers = Customers.find({firstName: name});
//   return customers;
// }

export {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
  updateCustomer,
  searchCustomerByID,
};




