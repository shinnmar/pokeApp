<template>
  <div v-if="pokemonDetail">
    <h1>{{ pokemonDetail.name }}</h1>
    <img :src="pokemonDetail.sprites.front_default" :alt="pokemonDetail.name" />
    <p>Altura: {{ pokemonDetail.height }} dm</p>
    <p>Peso: {{ pokemonDetail.weight }} hg</p>
    <p>Tipos:</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokemon } from '../composables/usePokemon';
import { useRoute } from 'vue-router';

const route = useRoute();
const { fetchPokemonDetail, pokemonDetail } = usePokemon();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  fetchPokemonDetail(id);
});
</script>

<style scoped>

</style>
