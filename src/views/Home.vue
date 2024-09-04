<template>
  <div class="container">
    <p class="text-center">
      Add up to 6 Pokémon to your Team. Once you added total of Pokémon, please
      go to Team page, click on each Pokémon to see more details! 😊
    </p>

    <div class="pagination">
      <button
        class="prev"
        @click="previousPage"
        :disabled="currentPage === 1"
      ></button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="next"
        @click="nextPage"
        :disabled="currentPage >= totalPages"
      ></button>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    
    <div v-else class="pokemon-grid">
      <div
        v-for="pokemon in paginatedPokemonList"
        :key="pokemon.name"
        class="pokemon"
      >
        <h3 class="pokemon-name">{{ pokemon.name }}</h3>
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
            pokemon.url
          )}.png`"
          alt="pokemon.name"
        />

        <div class="buttons">
          <button
            @click="addPokemon(pokemon)"
            :disabled="
              isPokemonSelected(pokemon) || selectionCount >= maxSelection
            "
            class="add"
          ></button>
          <button
            @click="removePokemon(pokemon)"
            :disabled="!isPokemonSelected(pokemon)"
            class="remove"
          ></button>
        </div>
      </div>
    </div>

    <div class="counter">Pokémon Added: {{ selectionCount }}</div>

    <article class="pb-20">
      <div class="pagination">
      <button
        class="prev"
        @click="previousPage"
        :disabled="currentPage === 1"
      ></button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        class="next"
        @click="nextPage"
        :disabled="currentPage >= totalPages"
      ></button>
    </div>
    </article>
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

p {
  width: 70%;
  color: var(--text-color);
  font-size: 1.8rem;
  margin:0 auto 2rem;
  font-weight: 600;
}

button {
  margin: 0 3rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
