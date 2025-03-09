import data from "./data/breakingbad/breakingbad.js";
import dataFunctions from "./data.js";

const charactersElement = data.breaking_bad;
const cardContainer = document.querySelector("#card-container");
const selectStatus = document.querySelector("#select-status");
const selectCategory = document.querySelector("#select-category");
const searchForName = document.querySelector("#btn-search");
const reset = document.querySelector("#reset");
const searchResult = document.querySelector("#result");
const selectOrder = document.querySelector("#select-order");

function displayCards(characters) {
  cardContainer.innerHTML = "";
  const newArray = Object.entries(characters);
  newArray.forEach(
    (character) =>
      (cardContainer.innerHTML += `
         <div class="card">
            <img class="poster-img" src="${character[1].img}" alt="${character[1].name}">
            <ul class="card-text" style="list-style: none">                       
            <li>Name: ${character[1].name}</li>
            <li>NickName: ${character[1].nickname}</li>
            <li>Status: ${character[1].status}</li>
            <li>Occupation: ${character[1].occupation}</li>
            <li>Birthday: ${character[1].birthday}</li>
            <li>Portrayed: ${character[1].portrayed}</li> 
            <li>Category: ${character[1].category}</li>
            </ul>                
        </div>`)
  );
}

displayCards(charactersElement);

const filters = {
  status: null,
  category: null,
  order: null,
  updatedList: charactersElement
};

function applyFilters() {
  searchForName.value = "";
  let filteredList = charactersElement;
  if (filters.category) {
    filteredList = dataFunctions.filter(filteredList, filters.category, "category");
  }
  if (filters.status) {
    filteredList = dataFunctions.filter(filteredList, filters.status, "status");
  }
  if (filters.order) {
    filteredList = dataFunctions.order(filteredList, filters.order);
  }

  filters.updatedList = filteredList;

  displayCards(filteredList);

  const percentage = dataFunctions.calculatePercentage(charactersElement.length, filteredList.length);
  searchResult.innerHTML = "This category represents " + percentage + "% of the characters";
}

function onStatusChange(event) {
  filters.status = event.target.value;
  applyFilters();
}

function onCategoryChange(event) {
  filters.category = event.target.value;
  applyFilters();
}

function onSortChange(event) {
  filters.order = event.target.value;
  applyFilters();
}

function onSearchForName(event) {
  const { value } = event.target;
  const searchedName = dataFunctions.searchName(filters.updatedList, value);
  displayCards(searchedName);
  if (!searchedName.length) {
    searchResult.innerHTML = "Character not found";
  } else {
    searchResult.innerHTML = "";
  }
}

function onResetSearch(event) {
  location.reload(event)
}

function onSearch(element, event, callback) {
  element.addEventListener(event, callback);
}

onSearch(selectStatus, "change", onStatusChange);
onSearch(selectCategory, "change", onCategoryChange);
onSearch(selectOrder, "change", onSortChange);
onSearch(searchForName, "keyup", onSearchForName);
onSearch(reset, "click", onResetSearch);
