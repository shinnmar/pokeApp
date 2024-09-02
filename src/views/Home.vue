<template>
  <div>
    <h1>Pokédex</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div
        v-for="pokemon in paginatedPokemonList"
        :key="pokemon.name"
        class="pokemon"
      >
        <p>{{ pokemon.name }}</p>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
            pokemon.url
          )}.png`"
          alt="pokemon.name"
        />

        <button
          @click="addPokemon(pokemon)"
          :disabled="
            isPokemonSelected(pokemon) || selectionCount >= maxSelection
          "
        >
          Add
        </button>
        <button
          @click="removePokemon(pokemon)"
          :disabled="!isPokemonSelected(pokemon)"
        >
          Remove
        </button>
      </div>
      <div class="counter">Pokémon Added: {{ selectionCount }}</div>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">
          Next
        </button>
      </div>

      <router-link to="/team">
        <button>Go to Team</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchFirst151Pokemon } from "../services/api";
import { useTeam } from "../composables/useTeam";

export default {
  setup() {
    // Initialize Pokemonlist as an empty array
    const pokemonList = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    const currentPage = ref(1);
    const pokemonPerPage = 25;
    const totalPages = computed(() => Math.ceil(151 / pokemonPerPage));
    const maxSelection = 6;
    const { addPokemon, removePokemon, isPokemonSelected, getSelectionCount } =
      useTeam();
    const selectionCount = computed(() => getSelectionCount());

    // Computed property to create pagination
    const paginatedPokemonList = computed(() => {
      const start = (currentPage.value - 1) * pokemonPerPage;
      const end = start + pokemonPerPage;
      return pokemonList.value.slice(start, end);
    });

    //this shows only the first 151 Pokémon
    const fetchPokemons = async () => {
      try {
        pokemonList.value = await fetchFirst151Pokemon();
      } catch (e) {
        error.value = "Failed to load Pokémon.";
      } finally {
        loading.value = false;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    onMounted(() => {
      fetchPokemons();
    });

    const getPokemonId = (url: string) => {
      const parts = url.split("/");
      return parts[parts.length - 2];
    };

    return {
      pokemonList,
      loading,
      error,
      nextPage,
      previousPage,
      currentPage,
      getPokemonId,
      addPokemon,
      removePokemon,
      isPokemonSelected,
      selectionCount,
      maxSelection,
      totalPages,
      paginatedPokemonList,
    };
  },
};
</script>

<style scoped>
img {
  width: 8%;
}

.pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  cursor: pointer;
  margin: 0 5px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter {
  margin-top: 20px;
  font-weight: 600;
}
</style>
