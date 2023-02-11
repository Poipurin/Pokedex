const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener('click', obtenerPokemon,);
const pokeInput = document.getElementById("buscador");
const pokemonImg = document.getElementById("pokeImg");
const pokemonCard = document.getElementById("card");
pokemonCard.classList.add("invisible");
const pokError = document.getElementById("card-error");
pokError.classList.add("invisible");

async function obtenerPokemon() {
    let pokeInputValue = pokeInput.value;
    if (!siEs(pokeInputValue)) {
        pokeValue(false);
        return;
    }
    pokeValue(true);
    let poke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInputValue}`);
    if (poke.ok) {
        let pokeJson = await poke.json();
        mostrarPokemon(pokeJson); 
    }
    else {
        pokError();
    }
}

function siEs(pokeInputValue) {
    if (pokeInputValue.length >= 1 && pokeInputValue.length < 20) return true;
    else {
        return false;
    }
}

function mostrarPokemon(pokemon) {
    pokemonCard.classList.remove("invisible");
    pokemonImg.setAttribute('src', pokemon.sprites.front_default);
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
    document.getElementById('tipo').textContent = tipoStr.replace(',' , ' ');

    let habilidades = pokemon.abilities;
    let nombreHab = habilidades.map(function(poke) {
        return poke.ability.name;
    });
    let habStr = nombreHab.toString();
    document.getElementById('habilidades').textContent = habStr;

}


