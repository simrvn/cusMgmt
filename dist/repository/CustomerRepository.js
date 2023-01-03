import { Customer } from "../models/Customer.js";
let userStorage = [];
const createCustomer = (firstName, lastName) => {
    const customer = new Customer(firstName, lastName);
    userStorage.push(customer);
};
const deleteCustomer = (firstName, lastName) => {
    if (userStorage.length === 0)
        console.log("There are no users in the database");
    const index = findCustomerIndex(firstName, lastName);
    userStorage.splice(index, 1);
};
const searchCustomer = (input) => {
    return userStorage.filter((cust) => cust.firstName === input || cust.lastName === input);
};
const updateCustomer = (ogFirstName, ogLastName, newFirstName, newLastName) => {
    const index = findCustomerIndex(ogFirstName, ogLastName);
    userStorage[index].firstName = newFirstName;
    userStorage[index].lastName = newLastName;
};
const findCustomerIndex = (firstName, lastName) => {
    return userStorage.findIndex((cust) => cust.firstName === firstName && cust.lastName === lastName);
};
export { createCustomer, deleteCustomer, userStorage, searchCustomer, updateCustomer, };
