const dataFunctions = {
  filter: function (characters, value, key) {
    /*esta função faz o filtro de todas as categorias */
    const filter = characters.filter(function (character) {
      const filtered = character[key].includes(value); //O método includes() determina se um array contém um determinado elemento, retornando true ou false apropriadamente. 
      
      return filtered;
    });

    return filter;
  },

  ascending: function (characters) {
    const order = characters.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });

    return order;
  },

  descending: function (characters) {
    const order = characters.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      } else {
        return 1;
      }
    });

    return order;
  },

  order: function (characters, sortBy) {
    const copy = [...characters];
    if (sortBy === "ascending") {
      return dataFunctions.ascending(copy);
    }
    return dataFunctions.descending(copy);
  },

  searchName: function (characters, name) {
    const filtered = characters.filter(function (character) { // o método filter cria um novo array contendo apenas os elementos que atendem a uma determinada condição.
      const filteredSearch = character.name
        .toLowerCase()
        .includes(name.toLowerCase()); 
      return filteredSearch;
    });
    return filtered;
  },

  calculatePercentage: function (sizeList, sizeFilteredList) {
    return Math.round((sizeFilteredList * 100) / sizeList);
  },
};

export default dataFunctions;
