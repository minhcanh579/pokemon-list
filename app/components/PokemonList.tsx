import React from 'react'
import { PokemonListProps } from '../types';
import Image from 'next/image';

const PokemonList: React.FC<PokemonListProps> = ({pokemons}) => {
    return (
        pokemons.map((pokemon) => (
            <div key={pokemon.id}>
                <div className='h-24 w-24 mx-auto'>
                    <Image
                        src={pokemon.imageUrl || ''}
                        alt={pokemon.name}
                        title={pokemon.name}
                        width={100}
                        height={100}
                        loading="lazy"
                    />
                </div>
                <div className='text-center'>{pokemon.name}</div>
            </div>
        ))
    )
}

export default PokemonList;