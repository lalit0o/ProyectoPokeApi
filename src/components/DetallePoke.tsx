import { useEffect, useState } from "react";

import type { Pokemon } from "../types/pokemon.interface";
import { ObtenerNombre } from "../services/obtenerNombre";

type Poke={
    name:string;
    url:string;
}




export default function DetallePokemon({objeto}:{objeto:Poke}) {
    const [pokemon,setPokemon]=useState<Pokemon>();


    useEffect(()=>{
        async function Obtener(){
            const res:Pokemon = await ObtenerNombre(objeto.name);
            setPokemon(res);

        }
        Obtener();
    },[])

    
    return (
        <div className="flex justify-center mt-10 bg-gray-300 my-5">
            <div className="flex flex-col text-center bg-white rounded-3xl shadow-2xl w-100 border-3 gap-5 pb-5 px-5">
                <p className=" flex text-4xl capitalize font-bold mt-4 bg-blue-400 p-4 text-center justify-center rounded-3xl">{pokemon?.name}</p>
                <img src={pokemon?.sprites.front_default} width={500} height={500} alt={pokemon?.name} className="mx-auto" />

                <p className="self-start font-bold">Tipos: </p>
                <div className="flex flex-row gap-5">
                    {pokemon?.types.map((tipo) => (
                        <span className="bg-amber-400 self-start rounded-2xl px-5 text-black capitalize" key={tipo.slot}>
                            {tipo.type.name}
                        </span>
                    ))}
                </div>
                <p className="self-start font-bold">Altura: </p>
                <span className="bg-green-500 self-start text-white rounded-2xl px-5">{pokemon?.height}</span>
                <p className="self-start font-bold">Peso: </p>
                <span className="bg-amber-700 self-start text-white rounded-2xl px-5">{pokemon?.weight}</span>
                <p className="self-start font-bold">Experiencia Base: </p>

                <span className="bg-amber-700 self-start text-white rounded-2xl px-5">{pokemon?.base_experience}</span>
                <p className="self-start font-bold">Habilidades: </p>
                <div className="flex flex-row gap-5">
                    {pokemon?.abilities.map((tipo) => (
                        <div>
                            <span className="bg-amber-400 self-start rounded-2xl px-5 text-black capitalize" key={tipo.slot}>
                                {tipo.ability?.name}
                            </span>

                        </div>


                    ))}
                </div>
                
            </div>
        </div>
    );
}