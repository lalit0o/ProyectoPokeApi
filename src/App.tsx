
import './App.css'
import { useState, useEffect } from 'react';
import Tarjeta from './components/PokemonCard';

type Pokemon = {
  name: string;
  url: string;
}


type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[]
}

export default function App() {
  const [datos, setDatos] = useState<ApiResponse | null>(null);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30');

        if (!response.ok) {
          throw new Error(`Error HTTP:${response.status}`);

        }

        const resultado: ApiResponse = await response.json();
        setDatos(resultado);

      } catch (error) {
        console.log(error);
      }
    }
    obtenerDatos();
  }, [])

  return (<div className=' bg-gray-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 '>{datos ? datos.results.map((pokemon) => (

    <div className='flex justify'>
      <Tarjeta pokemon={pokemon}/>
    </div>

  )

  ) : "Cargando..."}


  </div>)
}


