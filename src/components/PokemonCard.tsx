import { Link } from 'react-router-dom';
import type { Pokemon } from "../types/pokemon.interface";
import { useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';


export default function Tarjeta({ pokemon }: { pokemon: Pokemon }) {
    const agregar = useStore((state)=>state.agregar);
    const [esFavorito, setEsFavorito] = useState<boolean>(false);
    const urlParts = pokemon.url ? pokemon.url.split('/') : []; 
    const pokemonId = urlParts[urlParts.length - 2];
    const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    useEffect(() => {
        const favoritosGuardados = localStorage.getItem('favoritos');
        if (favoritosGuardados) {
            const lista: string[] = JSON.parse(favoritosGuardados);
            setEsFavorito(lista.includes(pokemon.name));
        }
    }, [pokemon.name]);

    const toggleFavorito = () => {
        const favoritosGuardados = localStorage.getItem('favoritos');
        let lista: string[] = favoritosGuardados ? JSON.parse(favoritosGuardados) : [];

        if (esFavorito) {
            lista = lista.filter(name => name !== pokemon.name);
            setEsFavorito(false);
        } else {
            lista.push(pokemon.name);
            setEsFavorito(true);
        }
        localStorage.setItem('favoritos', JSON.stringify(lista));
    };

    return (
        <div className="flex justify-center">{!pokemon ? (
            <p>Cargando pokemón...</p>
        ) : (<div className="flex flex-col justify-center bg-gray-100 rounded-2xl shadow-2xl items-center p-4 relative border-3" >
            <button
                onClick={toggleFavorito}
                className="absolute top-2 right-2 text-2xl "
            >
                {esFavorito ? '⭐' : '☆'}
            </button>

            
            <p className="capitalize">{pokemon.name}</p>
            <img
                src={imagenUrl}
                alt={pokemon.name}
                className="w-32 h-32 object-contain"
            />
            <button onClick={()=>agregar(pokemon)} className='bg-green-400 px-10 py-3 rounded-3xl hover:bg-red-400'>Comparar</button>

            <Link to={`/DetallePokemon/${pokemon.name}`}
                className="bg-gray-600 rounded-3xl p-4 hover:bg-amber-400 mt-10">Detalle Pokemon</Link>
        </div>
        )}
        </div>)
}