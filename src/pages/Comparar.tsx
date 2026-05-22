import DetallePokemon from "../components/DetallePoke";
import { useStore } from "../hooks/useStore";

export default function Comparar(){
    const pokemones = useStore((state)=>state.pokemones);



    return (
        <div className="flex flex-row justify-center gap-12">
            <h1 className="flex justify-center text-3xl bold">Comparar</h1>
            {pokemones.map((pokemon)=>(
                <DetallePokemon objeto={pokemon}/>
            ))}
        </div>
    )
}