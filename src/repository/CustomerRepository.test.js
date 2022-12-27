import { Customer } from "../models/Customer.js";
import {createCustomer, deleteCustomer, userStorage} from  "./CustomerRepository.js"

afterEach(() => {
  userStorage.splice(0, userStorage.length)
});

test("should add a new user to userStorage array", () => {
  createCustomer('Tom', 'Hardy');

  expect(userStorage.at(-1)).toEqual(new Customer('Tom', 'Hardy'));

});

test("should delete an existing user in userStorage array", () => {
  //setup
  createCustomer('Tom', 'Hardy');
  createCustomer('Tom', 'Holland');
  createCustomer('Tom', 'Hiddleston');

  deleteCustomer('Tom', 'Holland');

  expect(userStorage).not.toContainEqual(new Customer('Tom', 'Holland'));
});

test("should not delete any user if userStorage array is empty", () => {
  console.log = jest.fn();

  deleteCustomer('Tom', 'Hardy');

  expect(console.log).toHaveBeenCalledWith('There are no users in the database');

});
