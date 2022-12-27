"use strict";
import {
  createCustomer,
  deleteCustomer,
  searchCustomer,
} from "./src/repository/CustomerRepository.js";

document.getElementById("add-button").addEventListener("click", () => {
  const firstName = document.getElementById("add-first-name").value;
  const lastName = document.getElementById("add-last-name").value;

  createCustomer(firstName, lastName);
});

document.querySelector("table").addEventListener("click", (e) => {
  const target = e.target;
  
  if (target.classList.contains("delete")) {
    const lastName = target.parentElement.previousElementSibling.innerText;
    const firstName =
      target.parentElement.previousElementSibling.previousElementSibling
        .innerText;

    deleteCustomer(firstName, lastName);

    target.parentElement.parentElement.remove();
  }
});


document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("search").value;

  const filteredList = searchCustomer(input);

  displayCustomers(filteredList);
});

const displayCustomers = (userList) => {
  document.querySelector(".table-header").style.display = "contents";

  const userTable = document.querySelector(".table-body");
  let dataHtml = "";

  for (let i = 0; i < userList.length; i++) {
    dataHtml += `
      <tr>
      <td class="first-name">${userList[i].firstName}</td>
      <td class="last-name">${userList[i].lastName}</td>
      <td>
          <button class="btn delete">Remove</button>
      </td>
      </tr>
    `;
  }
  userTable.innerHTML = dataHtml;
};
