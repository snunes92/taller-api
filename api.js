let pokemonShiny;
const pokeballButton = document.getElementById('pokeball-button');
const pokemonNumberElement = document.getElementById('pokemon-number');
const pokemonNameElement = document.getElementById('pokemon-name');
const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
const pokemonImageElement = document.getElementById('pokemon-image');

pokeballButton.addEventListener('click', () => {
    // Realiza una solicitud para obtener un Pokémon aleatorio
    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data => {
            // Genera un número aleatorio entre 1104 (total de pokemons en la api) y 1.
            const randomPokemonNumber = Math.floor(Math.random() * (1104 - 1 + 1)) + 1;
            // Genera un número aleatorio entre 2 y 1.
            pokemonShiny = (1 === Math.floor(Math.random() * (2 - 1 + 1)) + 1);
            return fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}`);
        })
        .then(response => response.json())
        .then(data => {
            const pokemonNumber = data.id;
            const pokemonName = data.name;
            const pokemonHeightDecimeters = data.height;
            const pokemonWeightHectograms = data.weight;
            let pokemonImageUrl;

            // Modifica el estilo y usa otra imagen dependiendo de la variable.
            if (pokemonShiny === true) {
                pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonNumber}.png`;
                pokemonNumberElement.style.color = 'blue';
                pokemonNameElement.style.color = 'blue';
            } else {
                pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
                pokemonNumberElement.style.color = '';
                pokemonNameElement.style.color = '';
            }

            // Convierte altura a metros y peso a kilogramos
            const pokemonHeightMeters = (pokemonHeightDecimeters / 10).toFixed(2);
            const pokemonWeightKilograms = (pokemonWeightHectograms / 10).toFixed(2);

            // Actualiza la información del Pokémon en la página con las unidades
            pokemonNumberElement.textContent = "N°" + pokemonNumber;
            pokemonNameElement.textContent = pokemonName;
            pokemonHeightElement.textContent = `Altura: ${pokemonHeightMeters} metros`;
            pokemonWeightElement.textContent = `Peso: ${pokemonWeightKilograms} kilogramos`;
            pokemonImageElement.src = pokemonImageUrl;
        })
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error);
        });
});
