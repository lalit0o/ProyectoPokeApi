import './App.css'
import { useState, useEffect } from 'react';
import Tarjeta from './components/PokemonCard';
import { obtenerDatos } from './services/obtenerDatos';
import type { Pokemon } from './types/pokemon.interface';

import { useStore } from './hooks/useStore';
import { Link } from 'react-router-dom';

export default function App() {

  const pokemones = useStore((state) => state.pokemones);
  const eliminar = useStore((state)=>state.eliminar);



  const [datos, setDatos] = useState<Pokemon[] | null>();
  const [busqueda, setBusqueda] = useState<string>("");
  useEffect(() => {
    async function cargarDatos() {
      const pokemons = await obtenerDatos();
      const resultado = pokemons?.results;
      setDatos(resultado);
    }

    cargarDatos();

  }, []);
  const pokemonsFiltrados = datos?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];
  return (<>
    <div className="flex justify-center bg-black w-full">
      <input
        type="text"
        placeholder="Busca un pokemon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="px-4 py-2 w-80 rounded-xl bg-amber-300 text-black focus:outline-none"
      />
    </div>
    <div className=' bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4'>
      {pokemonsFiltrados ? pokemonsFiltrados.map((pokemon) => (

        <div className='flex justify'>
          <Tarjeta pokemon={pokemon} />
        </div>

      )

      ) : "No hay pokemones con ese nombre"}



    </div>

    {pokemones.length == 2 && (<div className="fixed bottom-5 right-5 z-50 bg-gray-400 text-white px-6 py-3 rounded-3xl border-3 shadow-lg ">
      <Link to={'/Comparar'} className="bg-white rounded-3xl text-black hover:bg-yellow-600 transition-all">
        <h1>Comparar Pokemones</h1>
      </Link>
      {pokemones.map((pokemon) => (
        <div className='flex flex-row'>
          <p>{pokemon.name}</p>
          <button onClick={()=>eliminar(pokemon.name)}>Eliminar</button>
        </div>
      ))}
    </div>

    )}
  </>

  )
}


