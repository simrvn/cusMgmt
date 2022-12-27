"use strict";
import {
  createCustomer,
  deleteCustomer,
  userStorage,
  searchCustomer,
} from "./src/repository/CustomerRepository.js";

document.getElementById("add-button").addEventListener("click", () => {
  const firstName = document.getElementById("add-first-name").value;
  const lastName = document.getElementById("add-last-name").value;

  createCustomer(firstName, lastName);
  console.log(userStorage);
});

const deleteButton = document.getElementById("delete");
if (deleteButton){
  deleteButton.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").textContent;
    const lastName = document.getElementById("last-name").textContent;
    console.log(lastName);
    deleteCustomer(firstName, lastName);
    displayCustomers(userStorage);
  });
};


document.getElementById("search-button").addEventListener("click", () => {
  const input = document.getElementById("search").value;

  const filteredList = searchCustomer(input);

  displayCustomers(filteredList);

});


const displayCustomers = (userList) =>{

  document.querySelector(".table-header").style.display = "contents";

  const userTable = document.querySelector(".user-table");
  let dataHtml = '';

  console.log(userList);

  for (let i=0; i<userList.length; i++){
    dataHtml += `
      <tr>
      <td id="first-name">${userList[i].firstName}</td>
      <td id="last-name">${userList[i].lastName}</td>
      <td>
          <button id="delete" class="btn delete">Remove</button>
      </td>
      </tr>
    `;
  }
  userTable.innerHTML = dataHtml;
}

