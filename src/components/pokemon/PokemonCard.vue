<template>
  <div @click="selectPokemon">
    <img :src="pokemon.image" alt="Pokemon Image" />
    <p>{{ pokemon.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pokemon: Object,
  },
  methods: {
    selectPokemon() {
      this.$emit('select', this.pokemon);
    }
  }
});
</script>

<style scoped>

</style>
