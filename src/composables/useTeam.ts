import { ref } from "vue";

const maxSelection = 6;
const selectedPokemons = ref<any[]>([]);

export function useTeam() {
  const addPokemon = (pokemon: any) => {
    if (
      selectedPokemons.value.length < maxSelection &&
      !isPokemonSelected(pokemon)
    ) {
      selectedPokemons.value.push(pokemon);
    }
  };

  const removePokemon = (pokemon: any) => {
    selectedPokemons.value = selectedPokemons.value.filter(
      (p) => p.name !== pokemon.name
    );
  };

  const isPokemonSelected = (pokemon: any) =>
    selectedPokemons.value.some((p) => p.name === pokemon.name);

  const getSelectedPokemons = () => selectedPokemons.value;

  const getSelectionCount = () => selectedPokemons.value.length;

  return {
    addPokemon,
    removePokemon,
    isPokemonSelected,
    getSelectedPokemons,
    getSelectionCount,
  };
}
