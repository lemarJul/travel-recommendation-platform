/**
 * Fetches travel recommendation data from the JSON file
 * @returns {Promise<Object>} The travel data containing countries, temples, and beaches
 * @throws {Error} If there's an error fetching or parsing the data
 */
async function fetchTravelData() {
  try {
    const response = await fetch("/travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching travel data:", error);
    throw error;
  }
}

/**
 * Gets all countries from the travel data
 * @returns {Promise<Array>} Array of countries with their cities
 */
async function getCountries() {
  const data = await fetchTravelData();
  return data.countries;
}

/**
 * Gets all temples from the travel data
 * @returns {Promise<Array>} Array of temples
 */
async function getTemples() {
  const data = await fetchTravelData();
  return data.temples;
}

/**
 * Gets all beaches from the travel data
 * @returns {Promise<Array>} Array of beaches
 */
async function getBeaches() {
  const data = await fetchTravelData();
  return data.beaches;
}

// Export functions for use in other files
export { fetchTravelData, getCountries, getTemples, getBeaches };
