import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    team: [],
  }),
  actions: {
    async fetchPokemon() {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      this.pokemonList = response.data.results;
    },
    addToTeam(pokemon: any) {
      if (this.team.length < 6) {
        this.team.push(pokemon);
      }
    },
    removeFromTeam(index: number) {
      this.team.splice(index, 1);
    },
  },
});
