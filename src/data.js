const dataFunctions = {
  filter: (characters, value, key) => {
    const filter = characters.filter((character) => {
      const filtered = character[key].includes(value);
      
      return filtered;
    });

    return filter;
  },

  ascending: (characters) => {
    const order = characters.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    });

    return order;
  },

  descending: (characters) => {
    const order = characters.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      } else {
        return 1;
      }
    });

    return order;
  },

  order: (characters, sortBy) => {
    const copy = [...characters];
    if (sortBy === "ascending") {
      return dataFunctions.ascending(copy);
    }
    return dataFunctions.descending(copy);
  },

  searchName: (characters, name) => {
    const filtered = characters.filter((character) => {
      const filteredSearch = character.name
        .toLowerCase()
        .includes(name.toLowerCase()); 
      return filteredSearch;
    });
    return filtered;
  },

  calculatePercentage: (sizeList, sizeFilteredList) => {
    return Math.round((sizeFilteredList * 100) / sizeList);
  },
};

export default dataFunctions;
