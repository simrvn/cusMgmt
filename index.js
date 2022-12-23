"use strict";
import { Customer } from "./src/models/Customer.js";
import { createCustomer } from "./src/service/CreateCustomer.js";
import { userStorage } from "./src/utils/userStore.js";

document.querySelector(".add-button").addEventListener("click", function () {
  const firstName = document.querySelector(".first-name").value;
  const lastName = document.querySelector(".last-name").value;

  createCustomer(new Customer(firstName, lastName));
  console.log(userStorage);

  const message = document.getElementById("message");
  message.innerText = "Customer successfully added";
});
