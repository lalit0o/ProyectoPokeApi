import type { Pokemon } from "../types/pokemon.interface";


export async function ObtenerNombre(nombre: string = "") {
    try {
        if (!nombre) throw new Error("El nombre está vacío");
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!res.ok) throw new Error("No se encontró el Pokémon");
        
        const pokemon: Pokemon = await res.json();
        return pokemon;
    } catch (e) {
        console.log(e);
        throw e;
    }
}