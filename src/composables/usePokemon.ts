import { ref, computed, onMounted } from "vue";
import { fetchPokemonDetail } from "../services/api";

export function usePokemon(id: number) {
  const pokemon = ref<any>(null);

  onMounted(async () => {
    try {
      pokemon.value = await fetchPokemonDetail(id);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  });

  return {
    pokemon: computed(() => pokemon.value),
    types: computed(() => pokemon.value?.types || []),
    stats: computed(() => pokemon.value?.stats || []),
  };
}
