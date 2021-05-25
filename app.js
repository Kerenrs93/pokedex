const colores={
    fire: '#d00000',
    grass: '#aacc00',
    electric: '#fff209',
    water: '#0096c7',
    ground: '#7f5539',
    rock: '#8a817c',
    fairy: '#ff7096',
    poison: '#cdb4db',
    bug: '#007f5f',
    dragon: '#b5179e',
    psychic: '#ffc8dd',
    flying: '#8d99ae',
    fighting: '#6a040f',
    normal: '#ffffff',
}

const tiposPrincipal=Object.keys(colores);
const contenedor=document.querySelector('#contenedor');
const numeroDePokemons=150;

const esperarPokemon=async()=>{
    for (let i = 1; i <= numeroDePokemons; i++) {
        await obtenerPokemon(i);        
    }
}

const obtenerPokemon=async(id)=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    const respuesta=await fetch(url);
    const pokemon=await respuesta.json();
    crearCarta(pokemon);
}

const crearCarta=(pokemon)=>{
    const pokemonDiv=document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    const tipoPokemon= pokemon.types.map(type=>type.type.name);
    const tipo=tiposPrincipal.find(type=>tipoPokemon.indexOf(type)>-1);
    const name= pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color=colores[tipo];
    pokemonDiv.style.backgroundColor=color;
    const pokemonHTML=`
        <div class="imgContenedor">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div>
            <span class="numeroPokemon">#${pokemon.id.toString().padStart(3,'0')}</span>
            <h3 class="nombrePokemon">${name}</h3>
            <small>Tipo:${tipo}</small>
        </div>
    `;
    pokemonDiv.innerHTML=pokemonHTML;
    contenedor.appendChild(pokemonDiv);
}

esperarPokemon()