<template>
  <div class="container">
    <h1>Team</h1>
    <div v-if="selectedPokemons.length === 0">
      You've not selected a Pokémon.
    </div>
    <div v-else class="selected-pokemon">
      <div
        v-for="pokemon in selectedPokemons"
        :key="pokemon.name"
        class="pokemon"
      >
        <router-link :to="`/team/${getPokemonId(pokemon.url)}`">
          <h2 class="pokemon-name">{{ pokemon.name }}</h2>
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
              pokemon.url
            )}.png`"
            alt="pokemon.name"
          />
        </router-link>
        <button @click="removePokemon(pokemon)" class="remove-selected">Remove Pokémon</button>
        <div v-if="pokemonDetails[getPokemonId(pokemon.url)]">
          <p>
            Type:
            <span
              v-for="type in pokemonDetails[getPokemonId(pokemon.url)].types"
              :key="type.type.name"
              :class="getTypeClass(type.type.name)"
            >
              {{ type.type.name }}
            </span>
          </p>

          <div class="stats">
            <h2>Stats</h2>
            <div
              v-for="stat in pokemonDetails[getPokemonId(pokemon.url)].stats"
              :key="stat.stat.name"
            >
              <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
              <progress :value="stat.base_stat" max="160"></progress>
            </div>
          </div>

          <audio
            :id="`audio-${getPokemonId(pokemon.url)}`"
            :src="`https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`"
          ></audio>

          <button class="play-cry" @click="playCry(getPokemonId(pokemon.url))">Play Cry</button>
        </div>
      </div>

      <div class="counter">
        Total selected Pokémon: {{ selectedPokemons.length }}
      </div>
    </div>
    <router-link to="/">
      <button class="go-back">Go back to Pokédex</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { useTeam } from "../composables/useTeam";
import { fetchPokemonDetail } from "../services/api";
import { pokemonTypeClasses, PokemonType } from '../styles/pokemonTypes';

export default {
  setup() {
    const { getSelectedPokemons, removePokemon } = useTeam();
    const selectedPokemons = computed(() => getSelectedPokemons());
    const pokemonDetails = ref<Record<string, any>>({});

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
img {
  width: 10%;
}
</style>
