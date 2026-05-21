import Tarjeta from "../components/PokemonCard";
import { useStore } from "../hooks/useStore";

export default function Comparar(){
    const pokemones = useStore((state)=>state.pokemones);



    return (
        <div className="flex flex-row">
            {pokemones.map((pokemon)=>(
                <Tarjeta pokemon={pokemon}/>
            ))}
        </div>
    )
}