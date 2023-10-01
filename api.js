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
            const randomPokemonNumber = Math.floor(Math.random() * data.count) + 1;
            
            return fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}`);
        })
        .then(response => response.json())
        .then(data => {
            const pokemonNumber = data.id;
            const pokemonName = data.name;
            const pokemonHeightDecimeters = data.height;
            const pokemonWeightHectograms = data.weight;
            const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;

            // Convierte altura a metros y peso a kilogramos
            const pokemonHeightMeters = (pokemonHeightDecimeters / 10).toFixed(2);
            const pokemonWeightKilograms = (pokemonWeightHectograms / 10).toFixed(2);

            // Actualiza la información del Pokémon en la página con las unidades
            pokemonNumberElement.textContent = pokemonNumber;
            pokemonNameElement.textContent = pokemonName;
            pokemonHeightElement.textContent = `${pokemonHeightMeters} metros`;
            pokemonWeightElement.textContent = `${pokemonWeightKilograms} kilogramos`;
            pokemonImageElement.src = pokemonImageUrl;
        })
        .catch(error => {
            console.error('Error al obtener el Pokémon:', error);
        });
});
