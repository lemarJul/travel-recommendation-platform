import { fetchTravelData } from "./fetchData.js";
import * as navbar from "./components/navBar.js";
import * as searchBar from "./components/searchBar.js";

document.addEventListener("DOMContentLoaded", function () {
  //nav functionality
  navbar.init();

  // Search functionality
  searchBar.init();

  fetchTravelData().then((data) => {
    console.log("data", data);
  });
});
