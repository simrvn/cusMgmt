"use strict";
import { createCustomer, deleteCustomer, userStorage, searchCustomer} from "./src/repository/CustomerRepository.js";

document.getElementById("add-button").addEventListener("click", () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;

  createCustomer(firstName, lastName);
  console.log(userStorage);

});

document.getElementById("remove-button").addEventListener("click",() => {
  const firstName = document.getElementById("remove-first-name").value;
  const lastName = document.getElementById("remove-last-name").value;

  deleteCustomer(firstName, lastName);
  console.log(userStorage);

});

document.getElementById("search-button").addEventListener('click', () => {
  const input = document.getElementById("search").value;
    console.log(searchCustomer(input));
});
