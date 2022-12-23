import {userStorage} from "../utils/userStore.js"

export const createCustomer = (customer) => {
  userStorage.push(customer);
}