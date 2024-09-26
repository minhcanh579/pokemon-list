"use client"

import React, { useEffect, useState } from 'react'
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import { Pokemon, Type } from "./types/Types";
import { fetchPokemonData, fetchPokemonsDetailData, fetchTypesData, fetchTypesDetailData } from "./apis";


export default function Home() {
  const [types, setTypes] = useState<Type[]>([]);
  const [totalPokemonInfo, setTotalPokemonInfo] = useState<Pokemon[]>([]);
  const [totalPokemons, setTotalPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState<number>(0);
  const ITEMCOUNT_PER_PAGE = 48;

  useEffect(() => {
    fetchTypes();
    fetchTotalPokemons();
  }, []);

  useEffect(() => {
      const selectedCount = types.reduce((acc, type) => {
        return acc + (type.selected ? 1 : 0);
      }, 0);
      const pokemonList = types.flatMap((type) => {
        if (type.selected) return type.pokemon;
        return [];
      });

      let duplicates: { [key: string]: {count: number, pokemon: Pokemon} }  = {};
      for (let _pokemon of pokemonList) {
        if (duplicates[_pokemon.url]) {
            duplicates[_pokemon.url] = {count: duplicates[_pokemon.url].count + 1, pokemon: _pokemon};
        } else {
            duplicates[_pokemon.url] = {count: 1, pokemon: _pokemon};
        }
      }
      
      const pokemonUrls = Object.keys(duplicates).filter(pokemon => duplicates[pokemon].count === selectedCount);
      
      const start = page * ITEMCOUNT_PER_PAGE;
      const end = (page + 1) * ITEMCOUNT_PER_PAGE;
      const urls = selectedCount > 0 ? pokemonUrls.slice(start, end) : totalPokemonInfo
        .slice(start, end)
        .map((info) => info.url);

      fetchPokemons(urls)

      setTotalPokemons(selectedCount === 0 ? totalPokemonInfo: pokemonUrls.map((url) => duplicates[url].pokemon))
      
  }, [page, types])


  const fetchTotalPokemons = () => {
    fetchPokemonData()
    .then(data => {
      setTotalPokemonInfo(data.results);
    }).catch(error => {
      console.error('Failed to fetch Pokemon data:', error);
    });
  }

  const fetchPokemons = (urls: string[]) => {
    fetchPokemonsDetailData(urls)
        .then(data => {
          const results = data.sort((a, b) => a.id - b.id);
          setPokemons(results);
        }).catch(error => {
          console.error('Failed to fetch Type data:', error);
        });
  }

  const fetchTypes = () => {
    fetchTypesData()
    .then(data => {
      fetchTypesDetailData(data.results.map((item: Type) => item.url))
        .then(data => {
          const results = data.map((type) => (
            { id: type.id, name: type.name, pokemon: type.pokemon }
          )).sort((a, b) => a.id - b.id);
          setTypes(results);
        }).catch(error => {
          console.error('Failed to fetch Type data:', error);
        });
      
    }).catch(error => {
      console.error('Failed to fetch Type data:', error);
    });
  };

  const onClickType = (typeId: number) => {
    setTypes((prevTypes) =>
      prevTypes.map((type, index) =>
          index === typeId ? { ...type, selected: !type.selected } : type
      )
    );

    setPage(0);
  }
  return (
    <div>
      {
        types.length != 0 && 
        <>
          <div className='mx-auto max-w-screen-xl'>
            <Header 
              types={types} 
              onClickType={onClickType}/>
            {
              totalPokemons.length != 0 
              ? <div className='my-12 mx-4 font-bold'>{`${totalPokemons.length} results found.`}</div>
              : <div className='text-center text-3xl mx-auto my-24 font-bold'>No results found.</div>
            }
          </div>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
            <PokemonList 
              pokemons={pokemons}
            />
          </div>
          <div className='mt-8 flex justify-center'>
            <button className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none' 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}  
            >
              Prev
            </button>
            <button className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none' 
              disabled={page === Math.floor((totalPokemons.length - 1) / ITEMCOUNT_PER_PAGE)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      }
    </div>
  );
}
