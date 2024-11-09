import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  //
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length);
    return pokemonsOptions.value[randomIndex];
  });
  const isLoading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonArray: Pokemon[] = response.data.results.map((pkm) => {
      const id = pkm.url.split('/').at(-2) ?? 0;
      return {
        name: pkm.name,
        id: +id,
      };
    });

    return pokemonArray.sort(() => Math.random() - 0.5);
  };

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (idToCheck: number) => {
    if (idToCheck !== randomPokemon.value.id) {
      console.log(`${idToCheck} es incorrecto`);

      return (gameStatus.value = GameStatus.Lost);
    }
    console.log(`${idToCheck} es correcto`);
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.5 },
    });
    return (gameStatus.value = GameStatus.Won);
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextRound();
  });

  return {
    pokemonsOptions,
    randomPokemon,
    gameStatus,
    isLoading,
    getNextRound,
    checkAnswer,
  };
};
