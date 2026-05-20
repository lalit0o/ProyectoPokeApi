import './App.css'
import { useState, useEffect } from 'react';
import Tarjeta from './components/PokemonCard';
import { obtenerDatos } from './services/obtenerDatos';
import type { Pokemon } from './types/pokemon.interface';




export default function App() {


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
  return (<div>
    <div className="flex justify-center mb-6 w-full">
      <input
        type="text"
        placeholder="Busca un pokemon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} 
        className="px-4 py-2 w-80 rounded-xl bg-amber-300 text-black focus:outline-none"
      />
    </div>
    <div className=' bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 '>
      {pokemonsFiltrados ? pokemonsFiltrados.map((pokemon) => (

        <div className='flex justify'>
          <Tarjeta pokemon={pokemon} />
        </div>

      )

      ) : "No hay pokemones con ese nombre"}


    </div>
  </div>

  )
}


