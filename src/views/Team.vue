<template>
  <div>
    <h1>Team</h1>
    <div v-if="selectedPokemons.length === 0">
      You've not selected a Pokémon.
    </div>
    <div v-else>
      <div v-for="pokemon in selectedPokemons" :key="pokemon.name" class="pokemon">
        <p>{{ pokemon.name }}</p>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`" alt="pokemon.name" />
        <button @click="removePokemon(pokemon)">Quitar</button>
      </div>
      <div class="counter">
        Total selected Pokémon: {{ selectedPokemons.length }}
      </div>
    </div>
    <router-link to="/">
      <button>Go back to Pokédex</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useTeam } from '../composables/useTeam';

export default {
  setup() {
    const { getSelectedPokemons, removePokemon } = useTeam();

    const selectedPokemons = computed(() => getSelectedPokemons());

    const getPokemonId = (url: string) => {
      const parts = url.split('/');
      return parts[parts.length - 2];
    };

    return {
      selectedPokemons,
      removePokemon,
      getPokemonId,
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

.counter {
  margin-top: 20px;
  font-weight: bold;
}
</style>
