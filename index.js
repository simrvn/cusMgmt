import {
  createCustomer,
  deleteCustomer,
  searchCustomer,
  updateCustomer,
  userStorage,
} from "./src/repository/CustomerRepository.js";

createCustomer("Tom", "Hardy");
createCustomer("Tom", "Holland");

let firstNameInput = document.getElementById("add-first-name");
let lastNameInput = document.getElementById("add-last-name");
const saveButton = document.getElementById("save-button");

let ogFirstName = '';
let ogLastName = '';

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (saveButton.innerText === 'Add Customer'){
    createCustomer(firstNameInput.value, lastNameInput.value);
  console.log("testing if i reach here again");
  }

  if (saveButton.innerText === 'Edit Details'){
    updateCustomer(
      ogFirstName,
      ogLastName,
      firstNameInput.value,
      lastNameInput.value
    );
    console.log(userStorage);
    searchCustomers();
  }
});

document.getElementById("search-button").addEventListener("click", () => {
  searchCustomers();
});

const searchCustomers = () => {
  const input = document.getElementById("search").value;

  const filteredList = searchCustomer(input);

  displayCustomers(filteredList);
};

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
          <button 
          class="btn edit" 
          data-action="edit"
          data-bs-toggle="modal" 
          data-bs-target="#add-form"
          >Edit</button>
          <button 
          class="btn delete" 
          data-action="delete" 
          >Remove</button>
        </td>
      </tr>
    `;
  }
  userTable.innerHTML = dataHtml;
  
  document.querySelectorAll(".delete").forEach(el => {
    el.addEventListener("click", (e) => {
      const target = e.target;
      const lastName = target.parentElement.previousElementSibling.innerText;
      const firstName =
        target.parentElement.previousElementSibling.previousElementSibling
          .innerText;
        deleteCustomer(firstName, lastName);
        target.parentElement.parentElement.remove();
    
    });
  });

  document.querySelectorAll(".edit").forEach(el => {
    el.addEventListener("click", (e) => {
      const target = e.target;
      ogLastName = target.parentElement.previousElementSibling.innerText;
      ogFirstName =
        target.parentElement.previousElementSibling.previousElementSibling
          .innerText;

          document.querySelector(".modal-title").innerText = "Edit Customer";
          saveButton.innerText = "Edit Details"

          console.log(ogFirstName, ogLastName);
      
          firstNameInput.value = ogFirstName;
          lastNameInput.value = ogLastName;
    });
  });
};
