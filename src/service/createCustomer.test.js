import {userStorage} from "../utils/userStore.js"
import {createCustomer, deleteCustomer} from  "../service/createCustomer.js"

afterEach(() => {
  userStorage.splice(0, userStorage.length)
});

test("should add a new user to userStorage array", () => {
  const customer = {firstName:"Tom", lastName:"Hardy"};

  createCustomer(customer);

  console.log(userStorage);
  expect(userStorage.at(-1)).toEqual(customer);

});

