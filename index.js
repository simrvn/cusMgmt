"use strict";
import { Customer } from "./src/models/Customer.js";
import { createCustomer, deleteCustomer, isNameEqual, userStorage } from "./src/repository/CustomerRepository.js";

document.getElementById("add-button").addEventListener("click", function () {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;

  createCustomer(firstName, lastName);
  console.log(userStorage);

});

document.getElementById("remove-button").addEventListener("click", function () {
  const firstName = document.getElementById("remove-first-name").value;
  const lastName = document.getElementById("remove-last-name").value;

  deleteCustomer(firstName, lastName);
  console.log(userStorage);

});