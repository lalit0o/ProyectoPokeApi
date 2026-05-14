import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


type Pokemon = {
    name: string;
    url: string;
}

type props = {
    pokemon: Pokemon

}
type Sprites = {
    back_default: string;
    back_shiny: string;
    front_default: string;
}

type ApiResponse = {
    sprites: Sprites;


}



export default function Tarjeta({ pokemon }: props) {
    const [datos, setDatos] = useState<ApiResponse | null>(null);

    
    useEffect(() => {
        async function obtenerDatos() {
            try {
                const response = await fetch(pokemon.url);

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
    }, [pokemon.url])
    return (
        <div className="flex justify-center">{!datos ? (
            <p>Cargando pokemón...</p>
        ) : (<div className="flex flex-col justify-center bg-gray-100 rounded-2xl shadow-2xl items-center p-4 " >
            <p className="capitalize">{pokemon.name}</p>
            <img src={datos.sprites.front_default} alt={pokemon.name} />
            <Link to="/Detalle" 
                    state={{url:pokemon.url}} className="bg-gray-600 rounded-3xl p-4 hover:bg-amber-400">Detalle del Pokemon</Link>
        </div>


        )}

        </div>)




}