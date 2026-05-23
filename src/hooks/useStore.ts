import { create } from 'zustand'

type ListadoPokemon = {
    name: string;
    url: string;
}




type Store = {
    pokemones: ListadoPokemon[]
    agregar: (pokemon: ListadoPokemon) => void;
    eliminar: (nombre: string) => void
}



export const useStore = create<Store>()((set, get) => ({
    pokemones: [],
    agregar: (pokemon) => {
        const pokemones = get().pokemones;
        set({ pokemones: [...pokemones, pokemon] })

    },
    eliminar: (nombre) => {
        set((state) => ({
            pokemones: state.pokemones.filter((pokemon) => pokemon.name !== nombre)
        }))

    }

}))
