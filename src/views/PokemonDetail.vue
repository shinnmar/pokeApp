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

    <p>Description:</p>
    <p class="description">{{ description }}</p>

    <div class="stats">
      <h2>Stats</h2>
      <div v-for="stat in pokemon.stats" :key="stat.stat.name">
        <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
        <progress :value="stat.base_stat" max="160"></progress>
      </div>
    </div>

    <div v-if="evolutionChain">
      <h2>Evolution Chain:</h2>
      <ul>
        <li v-for="evolution in evolutionChain" :key="evolution.id">
          {{ evolution.name }}
          <img :src="getSpriteUrl(evolution.id)" :alt="evolution.name" />
        </li>
      </ul>
    </div>

    <button @click="playCry">Play Cries</button>
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  fetchPokemonDetail,
  fetchPokemonSpecies,
  fetchPokemonEvolutionChain,
} from "../services/api";

export default defineComponent({
  setup() {
    const route = useRoute();
    const pokemon = ref<any>({});
    const description = ref<string>("");
    const evolutionChain = ref<any[]>([]);
    const cry = ref<HTMLAudioElement | null>(null);

    const cleanDescription = (description: string): string => {
      return description.replace(/\n|\f/g, " ").trim();
    };

    onMounted(async () => {
      const id = Number(route.params.id);
      try {
        pokemon.value = await fetchPokemonDetail(id);
        const speciesData = await fetchPokemonSpecies(id);

        // clean description using the previous function
        const rawDescription =
          speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === "en"
          )?.flavor_text || "No description available";
        description.value = cleanDescription(rawDescription);

        const evolutionData = await fetchPokemonEvolutionChain(id);
        evolutionChain.value = extractEvolutions(evolutionData);

        const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemon.value.name.toLowerCase()}.mp3`;
        cry.value = new Audio(cryUrl);
      } catch (error) {
        console.error("Error loading Pokémon details:", error);
      }
    });

    const playCry = () => {
      if (cry.value) {
        cry.value.play();
      }
    };

    const extractEvolutions = (evolutionData: any) => {
      const evolutions: any[] = [];

      const processEvolution = (evolution: any) => {
        if (evolution) {
          const speciesUrl = evolution.species.url;
          const id = speciesUrl.split("/").filter(Boolean).pop();

          evolutions.push({
            name: evolution.species.name,
            id: id,
          });

          if (evolution.evolves_to.length) {
            evolution.evolves_to.forEach((e: any) => processEvolution(e));
          }
        }
      };

      processEvolution(evolutionData.chain);
      return evolutions;
    };

    // Get images for evolution chain
    const getSpriteUrl = (pokemonId: string) => {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    };

    return {
      pokemon,
      description,
      evolutionChain,
      playCry,
      getSpriteUrl,
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

.description {
  text-transform: lowercase;
}

.stats {
  display: flex;
  flex-direction: column;
}

</style>
