import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonsOptions = ref<Pokemon[]>([]);

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

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonsOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
    console.log(pokemonsOptions.value);
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
  });

  return {
    pokemonsOptions,
    gameStatus,
    isLoading,
    getNextOptions,
  };
};
