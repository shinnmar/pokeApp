<template>
  <div class="pokemon-detail" v-if="pokemon.name">
    <h1>{{ pokemon.name }}</h1>
    <img
      class="pokemon"
      :src="pokemon.sprites.other['official-artwork'].front_default"
      alt="pokemon.name"
    />

    <p>
      Type:
      <span v-for="type in pokemon.types" :key="type.type.name">{{
        type.type.name
      }}</span>
    </p>
    <p>Height: {{ pokemon.height / 10 }} m</p>
    <p>Weight: {{ pokemon.weight / 10 }} kg</p>

    <div class="stats">
      <h2>Stats</h2>
      <div v-for="stat in pokemon.stats" :key="stat.stat.name">
        <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
        <progress :value="stat.base_stat" max="160"></progress>
      </div>
    </div>

    <button @click="playCry">Play Cries</button>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  setup() {
    const route = useRoute();
    const pokemon = ref<any>({});
    const cry = ref<HTMLAudioElement | null>(null);

    onMounted(async () => {
      const id = route.params.id;
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      console.log("Success: Fetching Pokémon from URL:", url);
      try {
        const response = await axios.get(url);
        pokemon.value = response.data;

        const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemon.value.name.toLowerCase()}.mp3`;
        cry.value = new Audio(cryUrl);
      } catch (error) {
        console.error("Error, audio doesn't play :c", error);
      }
    });

    const playCry = () => {
      if (cry.value) {
        cry.value.play();
      }
    };

    return {
      pokemon,
      playCry,
    };
  },
});
</script>

<style scoped>
.pokemon-detail {
  text-transform: capitalize;
}

.pokemon {
  width: 30%;
}

.stats {
  display: flex;
  flex-direction: column;
}
</style>
