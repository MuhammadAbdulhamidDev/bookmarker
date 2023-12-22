// ========================================================== //
// ======================== Box Modal ======================= //
// ========================================================== //
// Get elements for box model
let boxModel = document.querySelector(".box-info");
let closeBtn = document.getElementById("closeBtn");

//Close Model Function
function closeBoxModel() {
  boxModel.classList.add("d-none");
}

// Close model when close button is clicked
closeBtn.addEventListener("click", closeBoxModel);

// Close model when the Escape key is pressed
document.addEventListener("keydown", function (element) {
  if (element.key === "Escape") {
    closeBoxModel();
  }
});

// Close model when clicking outside the box model
document.addEventListener("click", function (element) {
  if (element.target.classList.contains("box-info")) {
    closeBoxModel();
  }
});
// ========================================================== //
// ========================= Set-Up ========================= //
// ========================================================== //
// Get inputs & selected elements
let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");
let siteCategory = document.getElementById("siteCategory");
// let filteredCategory = document.getElementById("filteredCategory");

// Global variable for update
let updateIndex = -1;

// Global variable for selected category
let selectedCategory = "";
function handleSelectChange(value) {
  selectedCategory = value;
}

// Get buttons IDs
let addButton = document.getElementById("addBtn");
let updateButton = document.getElementById("updateBtn");

// Array to store site objects
let sitesList = [];
// Array to store filtered site objects
let filteredSites = [];

// ========================================================== //
// ======================= Validation ======================= //
// ========================================================== //
function validationName() {
  let regexName = /^[A-Za-z-\d\s]{4,20}$/;
  if (!regexName.test(siteNameInput.value)) {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  } else {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
    return true;
  }
}
function validationURL() {
  let regexURL =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  if (!regexURL.test(siteUrlInput.value)) {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  } else {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
    return true;
  }
}
function removeValidClasses() {
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}
function addValidClasses() {
  siteNameInput.classList.add("is-valid");
  siteUrlInput.classList.add("is-valid");
}
function addInvalidClasses() {
  siteNameInput.classList.add("is-invalid");
  siteUrlInput.classList.add("is-invalid");
}
function removeInvalidClasses() {
  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
}
// ========================================================== //
// ==================== Create Operation ==================== //
// ========================================================== //
// Event listener for add button
addButton.onclick = function () {
  if (validationName() && validationURL()) {
    addSite();
    removeValidClasses();
  } else {
    boxModel.classList.remove("d-none");
    addInvalidClasses();
  }
};
// Add site function
function addSite() {
  let siteObj = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
    category: selectedCategory,
  };

  sitesList.push(siteObj);
  localStorage.setItem("websites", JSON.stringify(sitesList));

  clearForm();
  filteredSites = sitesList;
  displaySites(filteredSites);
}
// Clear input fields
function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteCategory.value = "Select Category";
  filteredCategory.value = "1";
}
// ========================================================== //
// =================== Display Operation ==================== //
// ========================================================== //
// Check if there are stored websites in local storage
if (localStorage.getItem("websites") != null) {
  sitesList = JSON.parse(localStorage.getItem("websites"));
  filteredSites = sitesList;
  displaySites(filteredSites);
}
// Display sites
function displaySites(list) {
  let length = list.length;
  let tableBody = "";

  for (let i = 0; i < length; i++) {
    tableBody += `
      <tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${list[i].name}</td>
        <td>${list[i].category}</td>
        <td>
          <button class="btn btn-success">
            <a href="${
              list[i].url
            }" target="_blank" class="text-decoration-none text-light">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
          </button>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can pe-2"></i>Delete
          </button>
        </td>
        <td>
          <button class="btn btn-warning" onclick="setData(${i})">
            <i class="fa-solid fa-pen-to-square pe-2"></i>Update
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = tableBody;
}
// ========================================================== //
// ==================== Filter Operation ==================== //
// ========================================================== //
let filteredCategory = "";
// Filter sites by category
function filterSitesByCategory(category = "1") {
  filteredCategory = category;
  filteredSites = [];
  switch (category) {
    case "1":
      filteredSites = sitesList;
      displaySites(filteredSites);
      break;
    case "2":
      filterAndDisplaySitesByCategory("AI");
      break;
    case "3":
      filterAndDisplaySitesByCategory("CS");
      break;
    case "4":
      filterAndDisplaySitesByCategory("Front-End");
      break;
    case "5":
      filterAndDisplaySitesByCategory("English");
      break;
    case "6":
      filterAndDisplaySitesByCategory("Social Media");
      break;
    case "7":
      filterAndDisplaySitesByCategory("News");
      break;
    case "8":
      filterAndDisplaySitesByCategory("Series & Movies");
      break;
    case "9":
      filterAndDisplaySitesByCategory("Others");
      break;
  }
}
// function filterAndDisplaySitesByCategory(category) {
//   filteredSites = sitesList.filter((site) => site.category === category);
//   displaySites(filteredSites);
// }
function filterAndDisplaySitesByCategory(category) {
  filteredSites = sitesList
    .map((site, index) => ({ ...site, originalIndex: index }))
    .filter((site) => site.category === category);
  displaySites(filteredSites);
}
// ========================================================== //
// ==================== Delete Operation ==================== //
// ========================================================== //
function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(sitesList));
  displaySites(sitesList);
}
// ========================================================== //
// =================== Search Operation ===================== //
// ========================================================== //
function search(term) {
  let length = filteredSites.length;
  let searchArr = [];
  for (let i = 0; i < length; i++) {
    if (filteredSites[i].name.toLowerCase().includes(term.toLowerCase())) {
      searchArr.push(filteredSites[i]);
    }
  }
  displaySites(searchArr);
  if (searchArr.length === 0 && term === "") {
    displaySites(sitesList);
    return;
  }
}
// ========================================================== //
// =================== update Operation ===================== //
// ========================================================== //
updateButton.onclick = function () {
  if (validationName() && validationURL()) {
    updateData();
    removeValidClasses();
    console.log(selectedCategory);
  } else {
    boxModel.classList.remove("d-none");
  }
};
// function setData(index) {
//   updateIndex = index;
//   let currentSite = filteredSites[index];
//   siteNameInput.value = currentSite.name;
//   siteUrlInput.value = currentSite.url;
//   siteCategory.value = currentSite.category;
//   removeInvalidClasses();
//   addValidClasses();
//   updateButton.classList.remove("d-none");
//   addButton.classList.add("d-none");
// }
function setData(index) {
  updateIndex = filteredSites[index].originalIndex;
  let currentSite = filteredSites[index];
  siteNameInput.value = currentSite.name;
  siteUrlInput.value = currentSite.url;
  siteCategory.value = currentSite.category;
  removeInvalidClasses();
  addValidClasses();
  updateButton.classList.remove("d-none");
  addButton.classList.add("d-none");
}
// function updateData() {
//   let siteObj = {
//     name: siteNameInput.value,
//     url: siteUrlInput.value,
//     category: siteCategory.value,
//   };
//   sitesList[updateIndex] = siteObj;
//   localStorage.setItem("websites", JSON.stringify(sitesList));
//   filterSitesByCategory(selectedCategory);
//   clearForm();
//   displaySites(filteredSites);
//   updateButton.classList.add("d-none");
//   addButton.classList.remove("d-none");
// }
function updateData() {
  let siteObj = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
    category: siteCategory.value,
  };

  // Update the corresponding item in sitesList
  sitesList.splice(updateIndex, 1, siteObj);

  // Update localStorage
  localStorage.setItem("websites", JSON.stringify(sitesList));

  // Update filteredSites based on the selected category
  filterSitesByCategory(filteredCategory);

  // Clear the form and display the updated sites
  clearForm();

  // Hide the update button and show the add button
  updateButton.classList.add("d-none");
  addButton.classList.remove("d-none");
}
