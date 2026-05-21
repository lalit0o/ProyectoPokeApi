import type { Pokemon } from '../types/pokemon.interface'

import {create} from 'zustand'




type Store = {
    pokemones: Pokemon[]
    agregar:(pokemon:Pokemon)=>void;
    eliminar:(nombre:string)=>void
}



export const useStore = create<Store>()((set,get)=>({
    pokemones:[],
    agregar:(pokemon)=>{
        const pokemones = get().pokemones;
        set({pokemones:[...pokemones,pokemon]})

    },
    eliminar:(nombre)=>{
        set((state)=>({
            pokemones:state.pokemones.filter((pokemon)=>pokemon.name!==nombre)
        }))
        
    }

}))
