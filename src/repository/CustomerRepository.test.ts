import { Customer } from "../models/Customer";
import {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
  updateCustomer,
  searchCustomerByID,
} from "./CustomerRepository";

afterEach(() => {
  userStorage.splice(0, userStorage.length);
});

test("should add a new user to userStorage array", () => {
  createCustomer(1, "Tom", "Hardy");

  expect(userStorage.at(-1)).toEqual(new Customer(1, "Tom", "Hardy"));
});

test("should delete an existing user in userStorage array", () => {
  //setup
  createCustomer(1, "Tom", "Hardy");
  createCustomer(2, "Tom", "Holland");
  createCustomer(3, "Tom", "Hiddleston");

  deleteCustomer(2);

  expect(userStorage).not.toContainEqual(new Customer(2, "Tom", "Holland"));
});

test("should not delete any user if userStorage array is empty", () => {
  console.log = jest.fn();

  deleteCustomer(1);

  expect(console.log).toHaveBeenCalledWith(
    "There are no users in the database"
  );
});

test("should find existing user(s) by first name", () => {
  createCustomer(1, "Tom", "Hardy");

  const output = searchCustomer("Tom");

  expect(output).toContainEqual(new Customer(1, "Tom", "Hardy"));
});

test("should find existing user(s) by last name", () => {
  createCustomer(1, "Tom", "Hardy");

  const output = searchCustomer("Hardy");

  expect(output).toContainEqual(new Customer(1, "Tom", "Hardy"));
});

test("should update customer first name and/or last name in userStorage", () => {
  createCustomer(1, "Tom", "Hardy");
  createCustomer(2, "Tom", "Holland");
  createCustomer(3, "Tom", "Hiddleston");

  updateCustomer(2, "David", "Beckham");

  expect(userStorage).toContainEqual(new Customer(2, "David", "Beckham"));
  expect(userStorage).not.toContainEqual(new Customer(2, "Tom", "Holland"));
});

test("should find customer by id", ()=> {
  createCustomer(1, "Tom", "Hardy");
  createCustomer(2, "Tom", "Holland");
  createCustomer(3, "Tom", "Hiddleston");

  const output = searchCustomerByID(2);
  console.log(output);

  expect(output).toMatchObject(new Customer(2, "Tom", "Holland"));
});
