import * as searchMessage from "./searchMessage.js";

const getResultsContainer = () => document.getElementById("searchResults");
const createResultsContainer = () => {
  const el = document.createElement("div");
  el.id = "searchResults";
  return document.body.appendChild(el);
};

// HTML Templates
const templates = {
  sectionHeader: document.createElement("template"),
  resultCard: document.createElement("template"),
};

// Initialize templates
templates.sectionHeader.innerHTML = `
  <h2></h2>
`;

templates.resultCard.innerHTML = `
  <div class="result-card">
    <img onerror="this.style.display='none'">
    <div class="result-info">
      <h3></h3>
      <p class="description"></p>
      <p class="country-info" style="display: none"></p>
    </div>
  </div>
`;

function createSectionHeader(title) {
  const header = templates.sectionHeader.content.cloneNode(true);
  header.querySelector("h2").textContent = title;
  return header;
}

function createResultCard(item) {
  const card = templates.resultCard.content.cloneNode(true);

  const img = card.querySelector("img");
  img.src = item.imageUrl || "";
  img.alt = item.name;

  card.querySelector("h3").textContent = item.name;
  card.querySelector(".description").textContent = item.description || "";

  const countryInfo = card.querySelector(".country-info");
  if (item.type === "city") {
    countryInfo.textContent = `Country: ${item.country}`;
    countryInfo.style.display = "block";
  }

  return card;
}

function displayResults(results) {
  const resultsContainer = getResultsContainer() ?? createResultsContainer();

  console.log({ results });
  resultsContainer.innerHTML = "";

  const totalResults = Object.values(results).reduce(
    (total, resultType) => total + resultType.length,
    0
  );

  if (totalResults === 0) {
    searchMessage.show("No results found");
    resultsContainer.style.display = "none";
    return;
  }

  const fragment = document.createDocumentFragment();

  if (results.countries.length > 0) {
    fragment.appendChild(createSectionHeader("Countries and Cities"));
    results.countries.forEach((item) => {
      fragment.appendChild(createResultCard(item));
    });
  }

  if (results.temples.length > 0) {
    fragment.appendChild(createSectionHeader("Temples"));
    results.temples.forEach((temple) => {
      fragment.appendChild(createResultCard(temple));
    });
  }

  if (results.beaches.length > 0) {
    fragment.appendChild(createSectionHeader("Beaches"));
    results.beaches.forEach((beach) => {
      fragment.appendChild(createResultCard(beach));
    });
  }

  resultsContainer.appendChild(fragment);
  resultsContainer.style.display = "block";
}

export { getResultsContainer, displayResults };
