<template>
  <div class="container">
    <div class="pokemon-detail column" v-if="pokemon.name">
      <div class="content row">
        <div class="pokemon">
          <h1>{{ pokemon.name }}</h1>
          <img
            :src="pokemon.sprites.other['official-artwork'].front_default"
            alt="pokemon.name"
          />

          <div class="pokemon-card">
            <span class="subtitle">Type</span>
            <div class="pokemon-type">
              <span
                v-for="type in pokemon.types"
                :key="type.type.name"
                :class="getTypeClass(type.type.name)"
                >{{ type.type.name }}</span
              >
            </div>

            <div class="info">
              <p>
                <span class="subtitle">Height:</span> {{ pokemon.height / 10 }} m
              </p>
              <p><span class="subtitle">Weight:</span> {{ pokemon.weight / 10 }} kg</p>
            </div>

            <p class="subtitle">Description:</p>
            <p class="description">{{ description }}</p>
          </div>
        </div>

        <div class="stats">
          <h3>Stats</h3>
          <div
            v-for="stat in pokemon.stats"
            :key="stat.stat.name"
            :class="getStatClass(stat.stat.name)"
          >
            <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
            <progress :value="stat.base_stat" max="160"></progress>
          </div>
        </div>
      </div>

      <button @click="playCry">Play Cry</button>

      <div v-if="evolutionChain" class="evolution-chain column">
        <h3 class="evolution-title">Evolution Chain</h3>
        <ul>
          <div class="evolution-pokemon">
            <li
              class="pokemon-item"
              v-for="evolution in evolutionChain"
              :key="evolution.id"
            >
              {{ evolution.name }}
              <img
                class="evolution-img"
                :src="getSpriteUrl(evolution.id)"
                :alt="evolution.name"
              />
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  fetchPokemonDetail,
  fetchPokemonSpecies,
  fetchPokemonEvolutionChain,
} from "../services/api";
import { pokemonTypeClasses, PokemonType } from "../styles/pokemonTypes";

export default defineComponent({
  setup() {
    const route = useRoute();
    const pokemon = ref<any>({});
    const description = ref<string>("");
    const evolutionChain = ref<any[]>([]);
    const cry = ref<HTMLAudioElement | null>(null);

    const getStatClass = (statName: string) => {
      switch (statName) {
        case "hp":
          return "hp";
        case "attack":
          return "attack";
        case "defense":
          return "defense";
        case "special-attack":
          return "special-attack";
        case "special-defense":
          return "special-defense";
        case "speed":
          return "speed";
        default:
          return "";
      }
    };

    const cleanDescription = (description: string): string => {
      return description.replace(/\n|\f/g, " ").trim();
    };

    const getTypeClass = (typeName: string) => {
      return pokemonTypeClasses[typeName as PokemonType] || "";
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
      getStatClass,
      pokemonTypeClasses,
      description,
      evolutionChain,
      playCry,
      getSpriteUrl,
      getTypeClass,
    };
  },
});
</script>

<style scoped>
.description {
  margin: 1rem 0;
}

.subtitle {
  color: #a2d2eb;
}

.pokemon {
  width: 40%;
  padding: 1rem;
  border-radius: 0.8rem;
}

.pokemon-type {
  display: flex;
  flex-direction: row;
}

.pokemon-detail,
.description {
  text-transform: capitalize;
}

.info {
  margin: 2rem 0;
}

.content {
  width: 100%;
}

.stats {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 30%;
}

.evolution-pokemon {
  display: flex;
  flex-direction: row;
}

.evolution-title {
  text-align: center;
}

.evolution-img {
  width: 50%;
}

.evolution-pokemon {
  display: flex;
  flex-direction: row;
}

.pokemon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
