import axios from "axios";

export interface Pokemon {
  id: number;
  name: string;
  order: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    map(arg0: (type: any) => import("react").JSX.Element): any;
    slot: number;
    type: {
      name: string;
    };
  };
  species: {
    url: string;
  };
}

export interface AllPokemon {
  count: number;
  next: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface Species {
  flavor_text_entries: {
    flavor_text: string;
  }[];
}

export async function get(url: string): Promise<Pokemon> {
  const response = await axios.get(url);
  return response.data;
}

export async function getAllPokemons({ pageParam }: { pageParam?: string }) {
  const response = await axios.get(
    pageParam || "https://pokeapi.co/api/v2/pokemon/"
  );
  return response.data;
}

export async function getPokemon(name: string): Promise<Pokemon[]> {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=1000`
    );
    const pokemonList: Pokemon[] = response.data.results;
    const filteredPokemon: Pokemon[] = pokemonList.filter((pokemon) =>
      pokemon.name.startsWith(name.toLowerCase())
    );
    if (filteredPokemon.length === 0) {
      throw new Error(`No Pokemon found starting with ${name}`);
    }
    return filteredPokemon;
  } catch (error) {
    throw new Error("error");
  }
}
