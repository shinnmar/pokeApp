import { defineStore } from "pinia";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemonList: Pokemon[];
  team: Pokemon[];
}

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemonList: [],
    team: [],
  }),
  actions: {
    async fetchPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/"
        );
        this.pokemonList = response.data.results;
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    },
    addToTeam(pokemon: Pokemon) {
      if (this.team.length < 6) {
        this.team.push(pokemon);
      }
    },
    removeFromTeam(index: number) {
      this.team.splice(index, 1);
    },
  },
});