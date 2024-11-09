<template>
  <section v-if="isLoading || !randomPokemon.id" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>
  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5 text-3xl">¿Quien es ese pokémon?</h1>
    <div class="h-20">
      <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound()">¿Jugar otra vez?</button>
    </div>
    <!-- Pokemon Picture -->
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
    <!-- Pokemon Options -->
    <PokemonOptions :pokemon-options="pokemonsOptions" :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id" @selected-pokemon="checkAnswer" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { isLoading, randomPokemon, gameStatus, pokemonsOptions, checkAnswer, getNextRound } = usePokemonGame();


</script>

<style scoped>
button {
  @apply bg-blue-500 text-white shadow-md p-1 rounded-lg cursor-pointer text-center transition-all hover:bg-blue-300
}
</style>
