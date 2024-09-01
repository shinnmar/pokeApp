<template>
  <div>
    <h1>Pokédex</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="pokemon in pokemonList" :key="pokemon.name" class="pokemon">
        <p>{{ pokemon.name }}</p>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`" alt="pokemon.name" />
        <button 
          @click="addPokemon(pokemon)"
          :disabled="isPokemonSelected(pokemon) || selectionCount >= maxSelection">
          Add
        </button>
        <button 
          @click="removePokemon(pokemon)"
          :disabled="!isPokemonSelected(pokemon)">
          Remove
        </button>
      </div>
      <div class="counter">
        Pokémon Added: {{ selectionCount }}
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>
      <router-link to="/team">
        <button>Go to Team</button>
      </router-link>
    </div>
  </div>
</template>


<script lang="ts">
import { onMounted, computed } from 'vue';
import { usePokemon } from '../composables/usePokemon';
import { useTeam } from '../composables/useTeam'; 

export default {
  setup() {
    const { pokemonList, loading, error, fetchPokemonList, nextPage, previousPage, currentPage } = usePokemon();
    const { addPokemon, removePokemon, isPokemonSelected, getSelectionCount } = useTeam();

    const maxSelection = 6;
    const selectionCount = computed(() => getSelectionCount());

    onMounted(() => {
      fetchPokemonList();
    });

    const getPokemonId = (url: string) => {
      const parts = url.split('/');
      return parts[parts.length - 2];
    };

    return {
      pokemonList,
      loading,
      error,
      fetchPokemonList,
      nextPage,
      previousPage,
      currentPage,
      getPokemonId,
      addPokemon,
      removePokemon,
      isPokemonSelected,
      selectionCount,
      maxSelection
    };
  },
};
</script>

<style scoped>
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