import { createCustomer, deleteCustomer, searchCustomer, updateCustomer, userStorage, } from "./repository/CustomerRepository.js";
createCustomer("Tom", "Hardy");
createCustomer("Tom", "Holland");
let firstNameInput = document.getElementById("add-first-name");
let lastNameInput = document.getElementById("add-last-name");
const saveButton = document.getElementById("save-button");
let ogFirstName = '';
let ogLastName = '';
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (saveButton.innerText === 'Add Customer') {
        createCustomer(firstNameInput.value, lastNameInput.value);
    }
    if (saveButton.innerText === 'Edit Details') {
        updateCustomer(ogFirstName, ogLastName, firstNameInput.value, lastNameInput.value);
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
            var _a, _b, _c, _d;
            const target = e.target;
            const lastName = ((_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling).innerText;
            const firstName = ((_c = (_b = target === null || target === void 0 ? void 0 : target.parentElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling) === null || _c === void 0 ? void 0 : _c.previousElementSibling)
                .innerText;
            deleteCustomer(firstName, lastName);
            ((_d = target === null || target === void 0 ? void 0 : target.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement).remove();
        });
    });
    document.querySelectorAll(".edit").forEach(el => {
        el.addEventListener("click", (e) => {
            var _a, _b, _c;
            const target = e.target;
            ;
            ogLastName = ((_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling).innerText;
            ogFirstName =
                ((_c = (_b = target === null || target === void 0 ? void 0 : target.parentElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling) === null || _c === void 0 ? void 0 : _c.previousElementSibling)
                    .innerText;
            document.querySelector(".modal-title").innerText = "Edit Customer";
            saveButton.innerText = "Edit Details";
            console.log(ogFirstName, ogLastName);
            firstNameInput.value = ogFirstName;
            lastNameInput.value = ogLastName;
        });
    });
};
