import './App.css'
import { useState, useEffect } from 'react';
import Tarjeta from './components/PokemonCard';
import { obtenerDatos } from './services/obtenerDatos';
import { useStore } from './hooks/useStore';
import { Link } from 'react-router-dom';
import { obtenerTipo } from './services/obtenerTipo';
import List from './components/List';

type ListadoPokemon = {
  name: string;
  url: string;
}

export default function App() {

  const pokemones = useStore((state) => state.pokemones);
  const eliminar = useStore((state) => state.eliminar);


  const [filtro, setFiltro] = useState<string>("");
  const [datos, setDatos] = useState<ListadoPokemon[] | null>();
  const [busqueda, setBusqueda] = useState<string>("");
  useEffect(() => {
    async function cargarDatos() {
      const pokemons: ListadoPokemon[] | null = await obtenerDatos();
      setDatos(pokemons)
    }

    cargarDatos();

  }, []);

  useEffect(() => {
    async function cargarTipo() {
      if (filtro === '') {
        const pokemons: ListadoPokemon[] | null = await obtenerDatos();
        setDatos(pokemons);
      }
      else {
        const pokemons = await obtenerTipo(filtro);
        setDatos(pokemons);
      }
    }
    cargarTipo();
  }, [filtro])



  const pokemonsFiltrados = datos?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];



  return (<div className='bg-gray-400 '>
    <div className="flex justify-center mt-4 mb-5  ">
      <input
        type="text"
        placeholder="Busca un pokemon"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="px-4 py-2 w-80 rounded-xl bg-amber-300 text-black focus:outline-none"
      />
    </div>
    <List filtro={filtro} setFiltro={setFiltro} />
    <div className=' bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 ml-10'>
      {pokemonsFiltrados ? pokemonsFiltrados.map((pokemon) => (

        <div className='flex justify'>
          <Tarjeta pokemon={pokemon} />
        </div>

      )

      ) : "No hay pokemones con ese nombre"}



    </div>



    {pokemones.length >= 1 && (<div className="fixed bottom-5 right-5 z-50 bg-gray-400 text-white px-6 py-3 rounded-3xl border-3 shadow-lg ">
      <h1 className='text-xl'>Pokemones seleccionados</h1>
      {pokemones.map((pokemon) => (
        <div className='flex flex-row gap-3 mt-4 mb-4'>
          <p className='capitalize bg-green-400'>{pokemon.name}</p>
          <button className="cursor-pointer" onClick={() => eliminar(pokemon.name)}>Eliminar pokemon</button>
        </div>
      ))}
      <Link to={'/Comparar'} className="bg-white rounded-3xl text-black hover:bg-yellow-600 transition-all">
        <h1 className='bg-yellow-400 p-3 rounded-2xl'>Comparar Pokemones</h1>
      </Link>
    </div>

    )}
  </div>

  )
}




