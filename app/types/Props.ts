import { Pokemon, Type } from "./Types";

export interface HeaderProps {
    types: Type[]; 
    onClickType: (index: number) => void;
}

export interface PokemonListProps {
    pokemons: Pokemon[]; 
}
