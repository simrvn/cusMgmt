import { Customer } from "../models/Customer";


let userStorage: Customer[] = [];

const createCustomer = (id: number, firstName: string, lastName: string) => {
  const customer = new Customer(id, firstName, lastName);
  userStorage.push(customer);
};

const deleteCustomer = (firstName: string, lastName: string) => {
  if (userStorage.length === 0)
    console.log("There are no users in the database");

  const index = findCustomerIndex(firstName, lastName);

  userStorage.splice(index, 1);
};

const searchCustomer = (input: string) => {
  return userStorage.filter(
    (cust) => cust.firstName === input || cust.lastName === input
  );
};

const updateCustomer = (ogFirstName: string, ogLastName: string, newFirstName: string, newLastName: string) => {
  const index = findCustomerIndex(ogFirstName, ogLastName);

  userStorage[index].firstName = newFirstName;
  userStorage[index].lastName = newLastName;
};

const findCustomerIndex = (firstName: string, lastName: string) => {
  return userStorage.findIndex(
    (cust) => cust.firstName === firstName && cust.lastName === lastName
  );
};

export {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
  updateCustomer,
};
