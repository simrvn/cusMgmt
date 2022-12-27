import { Customer } from "../models/Customer.js";
import {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
  updateCustomer,
} from "./CustomerRepository.js";

afterEach(() => {
  userStorage.splice(0, userStorage.length);
});

test("should add a new user to userStorage array", () => {
  createCustomer("Tom", "Hardy");

  expect(userStorage.at(-1)).toEqual(new Customer("Tom", "Hardy"));
});

test("should delete an existing user in userStorage array", () => {
  //setup
  createCustomer("Tom", "Hardy");
  createCustomer("Tom", "Holland");
  createCustomer("Tom", "Hiddleston");

  deleteCustomer("Tom", "Holland");

  expect(userStorage).not.toContainEqual(new Customer("Tom", "Holland"));
});

test("should not delete any user if userStorage array is empty", () => {
  console.log = jest.fn();

  deleteCustomer("Tom", "Hardy");

  expect(console.log).toHaveBeenCalledWith(
    "There are no users in the database"
  );
});

test("should find existing user(s) by first name", () => {
  createCustomer("Tom", "Hardy");

  let output = searchCustomer("Tom");

  expect(output).toContainEqual(new Customer("Tom", "Hardy"));
});

test("should find existing user(s) by last name", () => {
  createCustomer("Tom", "Hardy");

  let output = searchCustomer("Hardy");

  expect(output).toContainEqual(new Customer("Tom", "Hardy"));
});

test("should update customer first name and/or last name in userStorage", () => {
  createCustomer("Tom", "Hardy");
  createCustomer("Tom", "Holland");
  createCustomer("Tom", "Hiddleston");

  updateCustomer("Tom", "Holland", "David", "Beckham");

  expect(userStorage).toContainEqual(new Customer("David", "Beckham"));
  expect(userStorage).not.toContainEqual(new Customer("Tom", "Holland"));
});
