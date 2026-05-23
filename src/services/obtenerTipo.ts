export async function obtenerTipo(filtro: string) {

    if(filtro==='') return;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${filtro}`);

        if (!response.ok) {
            throw new Error(`Error HTTP:${response.status}`);

        }

        const resultado = await response.json();
        return resultado.pokemon.map(
            (p: any) => p.pokemon
        );


    } catch (error) {
        console.log(error);
        return null;
    }

}