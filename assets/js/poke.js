const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener('click', obtenerPokemon,);
const pokeInput = document.getElementById("buscador");
const pokemonImg = document.getElementById("pokeImg");
const pokemonCard = document.getElementById("pokeCard");
pokemonCard.classList.add("invisible");
const pokError = document.getElementById("pokError");
pokError.classList.add("invisible");

async function obtenerPokemon() {
    let pokeInputValue = pokeInput.value.toLowerCase();
    if (!siEs(pokeInputValue)) {
        pokeValue(false);
        return;
    }
    pokeValue(true);
    let poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInputValue}`);
    if (poke.ok) {
        let pokeJson = await poke.json();
        mostrarPokemon(pokeJson); 
    } return;
}

/* function pokError(){
    
} */

function siEs(pokeInputValue) {
    if (pokeInputValue.length >= 1 && pokeInputValue.length < 13) return true;
    else {
        return false;
    }
}

function pokeValue(si) {
    if (si) pokeInput.style.border = '';
    else {
        pokeInput.style.border = '';
    }
}

function mostrarPokemon(pokemon) {
    pokemonCard.classList.remove("invisible");
    pokemonImg.setAttribute('src', pokemon.sprites.versions['generation-v']['black-white'].animated.front_default);
    document.getElementById("nombre").textContent = pokemon.name;
    document.getElementById("id").textContent = pokemon.id;
    let altura = pokemon.height / 10;
    document.getElementById("altura").textContent = altura + ' m'; 
    let peso = pokemon.weight / 10;
    document.getElementById("peso").textContent = peso + ' Kg';

    let tipos = pokemon.types;
    let nombreTipo = tipos.map(function(poke) {
        return poke.type.name;
    });
    let tipoStr = nombreTipo.toString();
    document.getElementById("tipo").textContent = tipoStr.replace(',' , ' ');

    let habilidades = pokemon.abilities;
    let nombreHab = habilidades.map(function(poke) {
        return poke.ability.name;
    });
    let habStr = nombreHab.toString();
    document.getElementById("habilidades").textContent = habStr;

}


