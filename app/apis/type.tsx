import { Type } from "../types/Types";

export const fetchTypesData = () => {
  return fetch('https://pokeapi.co/api/v2/type/')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network Error');
      }
      return res.json(); 
    })
    .catch((error) => {
      console.error('Error fetching Type data:', error);
      throw error; 
    });
};

const fetchTypeDetailData = (url: string) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Network response was not ok for ${url}`);
      }
      return res.json();
    });
};

export const fetchTypesDetailData = async (urls: string[]): Promise<Type[]> => {
  try {
    const results = await Promise.all(urls.map(fetchTypeDetailData));
    return results.map((type) =>  ({ id: type.id, name: type.name, pokemon: type.pokemon.map((pokemon: any) => pokemon.pokemon)  }));;
  } catch (error) {
    console.error('Error fetching Type data:', error);
    throw error;
  }
};