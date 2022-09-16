let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Venusaur',
            height: 2,
            weight: '100kg',
            abilities: ['chlorophyll', 'overgrow'],
            types: ['grass', 'poison']
        },
        {
            name: 'Charizard',
            weight: '90.5kg',
            height: 1.7,
            abilities: ['blaze', 'solar-power'],
            types: ['fire', 'flying']
        },
        {
            name: 'Vileplume',
            weight: '18.6kg',
            height: 1.2,
            abilities: ['effect-spore', 'chlorophyll'],
            types: ['grass', 'poison']
        }
    ];

    // Function returns list of pokemon 
    function getAll() {
        return pokemonList;
    }
    // Function adds pokemon and validates typeof    
    function add(pokemon) {
        if (typeof pokemon !== 'object') {
            console.log('Please assign a Pokemon');
        }
        let keys = Object.keys(pokemon);
        if (!keys.includes('name')) {
            console.log('Requirements are missing');
        }
        pokemonList.push(pokemon);
    }

    // filter function. Starts at 0 as array
    function filterPokemonByName(name) {
        let result = getAll().filter((pokemon) => pokemon.name == name);
        return result[0];
    }

    // return function
    return {
        getAll: getAll,
        add: add
    };
})();

console.log(pokemonRepository.getAll()); //[]
pokemonRepository.add({ name: 'Mew', height: 0.4, weight: '4kg', abilities: ['Synchronize'], types: ['psychic'] });
console.log(pokemonRepository.getAll()); //[{name: 'Mew'}]

// forEach() loops 
pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(pokemon.name + ' - Height: ' + pokemon.height + 'm' + '<br>');
});


