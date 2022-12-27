import { Customer } from "../models/Customer.js";

let userStorage = [];

const createCustomer = (firstName, lastName) => {
  const customer = new Customer(firstName, lastName);
  userStorage.push(customer);
};

const deleteCustomer = (firstName, lastName) => {
  const customer = new Customer(firstName, lastName);

  if (userStorage.length === 0)
    console.log("There are no users in the database");

  const index = userStorage.findIndex(
    (cust) => cust.firstName === firstName && cust.lastName === lastName
  );

  userStorage.splice(index, 1);
};

const searchCustomer = (input) => {
  return userStorage.filter(
    (cust) => cust.firstName === input || cust.lastName === input
  );
};

export {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
};
