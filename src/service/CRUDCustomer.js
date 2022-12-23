import { Customer } from "../models/Customer.js";
import {userStorage} from "../utils/userStore.js"

const createCustomer = (firstName, lastName) => {
  const customer = new Customer(firstName, lastName);
  userStorage.push(customer);
}

const deleteCustomer = (firstName, lastName) => {
  const customer = new Customer(firstName, lastName);

  if (userStorage.length ===0) 
    console.log("There are no users in the database");
  
  for (var i=0; i<userStorage.length; i++){
    if (isNameEqual(userStorage[i], customer)){
      userStorage.splice(i,1);
      break;
      
    }
  }
}

const isNameEqual = (obj1, obj2) => {
  return obj1.firstName === obj2.firstName && obj1.lastName === obj2.lastName
}

export {
  createCustomer,
  deleteCustomer,
  isNameEqual
}