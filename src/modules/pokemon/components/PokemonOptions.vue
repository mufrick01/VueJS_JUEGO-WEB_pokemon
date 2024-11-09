<template>
  <section class="mt-5">
    <ul>
      <li v-for="({ id, name }) in props.pokemonOptions" :key="id">
        <button :class="[
          'capitalize disabled:shadow-none disabled:bg-gray-100',
          {
            correct: correctAnswer === id && blockSelection,
            incorrect: correctAnswer !== id && blockSelection,
          }
        ]" :disabled="props.blockSelection" @click="$emit('selectedPokemon', id)">
          {{ name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  pokemonOptions: Pokemon[],
  blockSelection: boolean,
  correctAnswer: number
}


const props = defineProps<Props>();

defineEmits<{
  selectedPokemon: [id: number]
}>();


</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100
}

.correct {
  @apply bg-green-500 hover:bg-green-300
}

.incorrect {
  @apply bg-red-500 opacity-70 hover:bg-red-300
}
</style>
