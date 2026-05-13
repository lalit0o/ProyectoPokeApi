
import './App.css'
import { useState, useEffect } from 'react';


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
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0');

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

  return (<div>{datos ? datos.results.map((pokemon) =>(
    
    <p>{pokemon.name}</p>)

  ) : "Cargando..."}


  </div>)
}


