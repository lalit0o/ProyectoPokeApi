import type { Pokemon } from "../types/pokemon.interface";

type ApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[]
}


export async function obtenerDatos() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

        if (!response.ok) {
            throw new Error(`Error HTTP:${response.status}`);

        }

        const resultado: ApiResponse = await response.json();
        return resultado;


    } catch (error) {
        console.log(error);
        return null;
    }

}