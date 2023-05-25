import data from "./data/breakingbad/breakingbad.js";

import dataFunctions from "./data.js";

const charactersElement = data.breaking_bad; //aqui onde puxa o banco de dados do breakingbad.js para fornecer os personagens.
const cardContainer = document.querySelector("#card-container"); //Aqui cria os cards.
const selectStatus = document.querySelector("#select-status"); //Seletor de busca do status.
const selectCategory = document.querySelector("#select-category"); //Seletor de busca por séries em que o personagem participou.
const searchForName = document.querySelector("#btn-search"); //cria busca por nome.
const reset = document.querySelector("#reset"); //cria o argumento de reset.
const percentageElement = document.querySelector("#percentage");
const selectOrder = document.querySelector("#select-order");

function displayCards(characters) {
  //cria os cards
  const arrayResults = characters.map((item) => {  //map nos permite visitar cada um dos elementos da array, coletando neste processo um valor de retorno para cada elemento visitado.
    //aqui está o método MAP
    const template = `                   
        <div class="card">

            <img class="poster-img" src="${item.img}" alt="${item.name}">
            <ul class="card-text" style="list-style: none">                       
            <li>Name: ${item.name}</li>
            <li>NickName: ${item.nickname}</li>
            <li>Status: ${item.status}</li>
            <li>Occupation: ${item.occupation}</li>
            <li>Birthday: ${item.birthday}</li>
            <li>Portrayed: ${item.portrayed}</li> 
            <li>Category: ${item.category}</li>
           
            </ul>                

        </div>
        `;
    return template; //a constante acima cria todo o card e suas caracteristicas, puxando os dados da base de dados
  });
  return arrayResults.join(""); //o arrayResults é convertido em uma única string usando o método join("")
}
cardContainer.innerHTML = displayCards(charactersElement);

selectStatus.addEventListener("change", (event) => {
  const value = event.target.value;
  const filteredList = dataFunctions.filter(charactersElement, value, "status"); //o "filter" está puxando da função filter do data.js
  const cards = displayCards(filteredList);
  cardContainer.innerHTML = cards;

  const percentage = dataFunctions.calculatePercentage(
    charactersElement.length,
    filteredList.length
  );
  percentageElement.innerHTML =
    "This category represents " + percentage + "% of the characters";
});

selectCategory.addEventListener("change", (event) => {
  const value = event.target.value;
  const filteredList = dataFunctions.filter(charactersElement, value, "category"); //o "filter" está puxando da função filter do data.js
  const cards = displayCards(filteredList);
  cardContainer.innerHTML = cards;

  const percentage = dataFunctions.calculatePercentage(
    charactersElement.length,
    filteredList.length
  );
  percentageElement.innerHTML =
    "This category represents " + percentage + "% of the characters";
});

selectOrder.addEventListener("change", (event) => {
  const value = event.target.value;
  const orderedList = dataFunctions.order(charactersElement, value);
  const cards = displayCards(orderedList);
  cardContainer.innerHTML = cards;
});

reset.addEventListener("click", (event) => {
  location.reload(event);
});

searchForName.addEventListener("keyup", function (event) {
  const value = event.target.value;
  const filteredList = dataFunctions.searchName(charactersElement, value);
  const cards = displayCards(filteredList);
  cardContainer.innerHTML = cards;
});
