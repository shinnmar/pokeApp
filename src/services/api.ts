import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export async function fetchFirst151Pokemon() {
  try {
    const response = await api.get("pokemon", {
      params: {
        limit: 151, // the first 151 Pokémon
        offset: 0, // first one
      },
    });
    return response.data.results; // get back to the list
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
}

export async function fetchPokemonDetail(id: number) {
  try {
    const response = await api.get(`pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    throw error;
  }
}

export async function fetchPokemonSpecies(id: number) {
  try {
    const response = await api.get(`pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    throw error;
  }
}

// add the evolutionChain for Team and Team:id
export async function fetchPokemonEvolutionChain(id: number) {
  try {
    const speciesResponse = await fetchPokemonSpecies(id);
    const evolutionChainUrl = speciesResponse.evolution_chain.url;
    const response = await api.get(evolutionChainUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon evolution chain:", error);
    throw error;
  }
}

export default api;
