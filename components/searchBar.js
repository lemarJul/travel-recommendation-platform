import { getResultsContainer, displayResults } from "./searchResult.js";
import * as searchMessage from "./searchMessage.js";
import { fetchTravelData } from "../fetchData.js";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.querySelector(".search-btn");
const clearBtn = document.querySelector(".clear-btn");

function init() {
  if (!searchInput) return;
  // Search functionality
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Clear functionality
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchMessage.hide();
    clearResults();
  });
}

async function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    searchMessage.show("Please enter a search term");
    clearResults();
    return;
  }

  try {
    const results = filterData(await fetchTravelData(), query);
    displayResults(results);
  } catch (error) {
    console.error("Error during search:", error);
    searchMessage.show("An error occurred while searching");
  }
}

function filterData(data, query) {
  const results = {
    countries: [],
    temples: [],
    beaches: [],
  };

  // Search countries and cities
  data.countries.forEach((country) => {
    if (country.name.toLowerCase().includes(query)) {
      results.countries.push({
        type: "country",
        ...country,
      });
    }
    country.cities.forEach((city) => {
      if (
        city.name.toLowerCase().includes(query) ||
        query === "country" ||
        query === "countries" ||
        query === "city" ||
        query === "cities"
      ) {
        results.countries.push({
          type: "city",
          country: country.name,
          ...city,
        });
      }
    });
  });

  // Search temples
  data.temples.forEach((temple) => {
    if (
      temple.name.toLowerCase().includes(query) ||
      query === "temple" ||
      query === "temples"
    ) {
      results.temples.push({
        type: "temple",
        ...temple,
      });
    }
  });

  // Search beaches
  data.beaches.forEach((beach) => {
    if (
      beach.name.toLowerCase().includes(query) ||
      query === "beach" ||
      query === "beaches"
    ) {
      results.beaches.push({
        type: "beach",
        ...beach,
      });
    }
  });

  return results;
}

function clearResults() {
  let container;
  if ((container = getResultsContainer())) {
    container.innerHTML = "";
    container.style.display = "none";
  }
}

export { init };
