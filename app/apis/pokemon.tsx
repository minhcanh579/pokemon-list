import { Pokemon } from "../types";

export const fetchPokemonData = async () => {    
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=1200')
  .then((res) => {
    if (!res.ok) {
      throw new Error('Network Error');
    }
    return res.json(); 
  })
  .catch((error) => {
    console.error('Error fetching Pokemon data:', error);
    throw error; 
  });
};

const fetchPokemonDetailData = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok for ${url}`);
      }
      return res.json();
    });
};

export const fetchPokemonsDetailData = async (urls: string[]): Promise<Pokemon[]> => {
  try {
    const results = await Promise.all(urls.map(fetchPokemonDetailData));
    return results.map((pokemon) =>  ({ id: pokemon.id, url: pokemon.url, name: pokemon.name, imageUrl: pokemon['sprites']['other']['official-artwork']['front_default'] }));
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
};