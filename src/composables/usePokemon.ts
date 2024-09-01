import { ref } from "vue";
import api from "../services/api";

export function usePokemon() {
  const pokemonList = ref<any[]>([]);
  const currentPage = ref(1);
  const pageSize = 25;
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Function to have the pokemon list with pagination
  const fetchPokemonList = async () => {
    loading.value = true;
    error.value = null;
    try {
      const offset = (currentPage.value - 1) * pageSize;
      const response = await api.get(
        `pokemon?limit=${pageSize}&offset=${offset}`
      );
      pokemonList.value = response.data.results;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Have next page of pokemon
  const nextPage = async () => {
    currentPage.value++;
    await fetchPokemonList();
  };

  // Go back page
  const previousPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      await fetchPokemonList();
    }
  };

  return {
    pokemonList,
    loading,
    error,
    fetchPokemonList,
    nextPage,
    previousPage,
    currentPage,
  };
}
