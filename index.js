"use strict";
import { Customer } from "./src/models/Customer.js";
import { createCustomer, deleteCustomer, isNameEqual } from "./src/service/CRUDCustomer.js";
import { userStorage } from "./src/utils/userStore.js";



createCustomer('Tom', 'Hardy')

document.querySelector(".add-button").addEventListener("click", function () {
  const firstName = document.querySelector(".first-name").value;
  const lastName = document.querySelector(".last-name").value;
  const message = document.getElementById("message");

  createCustomer(firstName, lastName);
  console.log(userStorage);

  message.textContent = "Customer successfully added";
});

document.querySelector(".remove-button").addEventListener("click", function () {
  const firstName = document.querySelector(".delete-first-name").value;
  const lastName = document.querySelector(".delete-last-name").value;
  const message = document.getElementById("delete-message");

  console.log(typeof firstName);
  console.log(firstName.length);
  
  if (firstName.length === 0 || lastName.length === 0 ){
    message.textContent = "Please fill in all fields";
  }

  else if (isNameEqual(userStorage, new Customer(firstName, lastName)) === false){
    message.textContent = "Customer not in database";
  }

  else if (userStorage.length === 0){
    message.textContent = "Invalid request, database is empty";
  }
  
  else{
    deleteCustomer(firstName, lastName);
    console.log(userStorage);
    message.innerText = "Customer successfully removed";
  }

});
