import DetallePokemon from "../components/DetallePoke";
import { useStore } from "../hooks/useStore";

export default function Comparar() {
    const pokemones = useStore((state) => state.pokemones);



    return (
        <div className="justify-center gap-12">
            <h1 className="flex justify-center text-3xl bold">Comparación entre pokemones</h1>
            <div className="flex flex-row justify-center gap-12">{pokemones.map((pokemon) => (
                <DetallePokemon objeto={pokemon} />
            ))}</div>

        </div>
    )
}