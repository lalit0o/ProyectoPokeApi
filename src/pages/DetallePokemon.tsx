import { useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon.interface";
import { useLocation } from "react-router-dom";


export default function Detalle() {
    const [datos, setDatos] = useState<Pokemon | null>(null);
    const location = useLocation();
    const url = location.state?.url;
    useEffect(() => {
        async function obtenerDatos() {
            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP:${response.status}`);

                }

                const resultado: Pokemon = await response.json();
                setDatos(resultado);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerDatos();
    }, [url])



    return (<div className="flex justify-center mt-10 bg-gray-300 my-5">
        <div className="flex flex-col text-center bg-white rounded-3xl shadow-2xl w-100 border-3 gap-5 pb-5 px-5">
            <p className="text-4xl capitalize text-center">{datos?.name}</p>
            <img src={datos?.sprites.front_default} width={500} height={500}></img>
            
            <p className="self-start">Tipos: </p>
            <div className="flex flex-row gap-5">
            {datos?.types.map((tipo) => (
                <span className="bg-amber-400 self-start rounded-2xl px-5" key={tipo.slot}>
                    {tipo.type.name}

                </span>
            ))}
            </div>
            <span className="bg-green-500 self-start rounded-2xl px-5">Peso: {datos?.height}</span>
            <span className="bg-amber-700 self-start rounded-2xl px-5">Altura: {datos?.weight}</span>
            <span className="bg-yellow-400 self-start rounded-2xl px-5">Estadisticas base: {datos?.base_experience}</span>

        </div>


    </div>)


}