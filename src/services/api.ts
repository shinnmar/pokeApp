import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export async function fetchFirst151Pokemon() {
  try {
    const response = await api.get("pokemon", {
      params: {
        limit: 151,  // the first 151 Pokémon
        offset: 0    // first one
      }
    });
    return response.data.results; // get back to the list
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
}

export default api;
