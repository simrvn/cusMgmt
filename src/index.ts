import { Customer } from "./models/Customer";
import {
  createCustomer,
  deleteCustomer,
  searchCustomer,
  updateCustomer,
  userStorage,
} from "./repository/CustomerRepository";

createCustomer("Tom", "Hardy");
createCustomer("Tom", "Holland");

let firstNameInput = document.getElementById("add-first-name") as HTMLInputElement;
let lastNameInput = document.getElementById("add-last-name") as HTMLInputElement;
const saveButton = document.getElementById("save-button") as HTMLElement;

let ogFirstName = '';
let ogLastName = '';

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (saveButton.innerText === 'Add Customer'){
    createCustomer(firstNameInput.value, lastNameInput.value);
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

document.getElementById("search-button")!.addEventListener("click", () => {
  searchCustomers();
});

const searchCustomers = () => {
  const input = (document.getElementById("search") as HTMLInputElement).value;

  const filteredList = searchCustomer(input);

  displayCustomers(filteredList);
};

const displayCustomers = (userList: Customer[]) => {
  (document.querySelector(".table-header") as HTMLElement).style.display = "contents";

  const userTable = (document.querySelector(".table-body") as HTMLElement);
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
      const target = e.target as HTMLButtonElement;
      const lastName = (target?.parentElement?.previousElementSibling as HTMLTableCellElement).innerText;
      const firstName =
        (target?.parentElement?.previousElementSibling?.previousElementSibling as HTMLTableCellElement)
          .innerText;
        deleteCustomer(firstName, lastName);
        (target?.parentElement?.parentElement as HTMLTableRowElement).remove();
    
    });
  });

  document.querySelectorAll(".edit").forEach(el => {
    el.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;;
      ogLastName = (target?.parentElement?.previousElementSibling as HTMLTableCellElement).innerText;
      ogFirstName =
      (target?.parentElement?.previousElementSibling?.previousElementSibling as HTMLTableCellElement)
      .innerText;

          (document.querySelector(".modal-title") as HTMLElement).innerText = "Edit Customer";
          saveButton.innerText = "Edit Details"

          console.log(ogFirstName, ogLastName);
      
          firstNameInput.value = ogFirstName;
          lastNameInput.value = ogLastName;
    });
  });
};
