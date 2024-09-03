<template>
  <div class="container">
    <h2 class="text-center">PokeTeam</h2>
    <article class="text-center" v-if="selectedPokemons.length === 0">
      <span class="message">You've not selected a Pokémon.</span>
    </article>
    <div v-else class="selected-pokemon center">
      <div
        v-for="pokemon in selectedPokemons"
        :key="pokemon.name"
        class="pokemon"
      >
        <router-link
          class="pokemon-link column"
          :to="`/team/${getPokemonId(pokemon.url)}`"
        >
          <h3 class="pokemon-name">{{ pokemon.name }}</h3>
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
              pokemon.url
            )}.png`"
            alt="pokemon.name"
          />
        </router-link>

        <div
          v-if="pokemonDetails[getPokemonId(pokemon.url)]"
          class="pokemon-card"
        >
          <span class="type-title">Type</span>
          <div class="pokemon-type">
            <span
              v-for="type in pokemonDetails[getPokemonId(pokemon.url)].types"
              :key="type.type.name"
              :class="getTypeClass(type.type.name)"
            >
              {{ type.type.name }}
            </span>
          </div>

          <div class="stats">
            <h3>Stats</h3>
            <div
              v-for="stat in pokemonDetails[getPokemonId(pokemon.url)].stats"
              :key="stat.stat.name"
              :class="getStatClass(stat.stat.name)"
            >
              <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
              <progress :value="stat.base_stat" max="160"></progress>
            </div>
          </div>

          <div class="btns text-center column">
            <audio
              :id="`audio-${getPokemonId(pokemon.url)}`"
              :src="`https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`"
            ></audio>

            <button
              class="play-cry"
              @click="playCry(getPokemonId(pokemon.url))"
            >
              Play Cry
            </button>

            <button
              @click="removePokemon(pokemon)"
              class="remove-selected"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useTeam } from "../composables/useTeam";
import { fetchPokemonDetail } from "../services/api";
import { pokemonTypeClasses, PokemonType } from "../styles/pokemonTypes";

export default {
  setup() {
    const { getSelectedPokemons, removePokemon } = useTeam();
    const selectedPokemons = computed(() => getSelectedPokemons());
    const pokemonDetails = ref<Record<string, any>>({});

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

    const getPokemonId = (url: string) => {
      const parts = url.split("/");
      return parts[parts.length - 2];
    };

    const getTypeClass = (typeName: string) => {
      return pokemonTypeClasses[typeName as PokemonType] || "";
    };

    const loadPokemonDetails = async () => {
      for (const pokemon of selectedPokemons.value) {
        const pokemonId = getPokemonId(pokemon.url);
        try {
          const pokemonData = await fetchPokemonDetail(Number(pokemonId));
          pokemonDetails.value[pokemonId] = {
            types: pokemonData.types,
            stats: pokemonData.stats,
          };
        } catch (error) {
          console.error(
            `Error fetching details for Pokémon ID ${pokemonId}:`,
            error
          );
        }
      }
    };

    const playCry = (pokemonId: string) => {
      const audioElement = document.getElementById(
        `audio-${pokemonId}`
      ) as HTMLAudioElement;
      if (audioElement) {
        audioElement.play();
      }
    };

    watch(selectedPokemons, loadPokemonDetails, { immediate: true });

    return {
      selectedPokemons,
      getStatClass,
      removePokemon,
      getPokemonId,
      pokemonDetails,
      playCry,
      getTypeClass,
    };
  },
};
</script>

<style>
h2 {
  color: var(--text-color);
}

.pokemon-link {
  color: var(--white);
}

.pokemon-card {
  text-align: left;
}

.message {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--text-color);
}

.selected-pokemon .pokemon {
  border-radius: 0.8rem;
  padding: 1rem;
}

.pokemon-type,
h3 {
  margin: 1rem 0;
}
</style>
