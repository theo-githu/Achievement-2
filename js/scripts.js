let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Venusaur',
            height: 2,
            abilities: ['chlorophyll', 'overgrow'],
            types: ['grass', 'poison']
        },
        {
            name: 'Charizard',
            height: 1.7,
            abilities: ['blaze', 'solar-power'],
            types: ['fire', 'flying']
        },
        {
            name: 'Vileplume',
            height: 1.2,
            abilities: ['effect-spore', 'chlorophyll'],
            types: ['grass', 'poison']
        }
    ];

    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    }
})();

console.log(pokemonRepository.getAll()); //[]
pokemonRepository.add({ name: 'Mew' });
console.log(pokemonRepository.getAll()); //[{name: 'Mew'}]

// forEach() loops 
let height = ' - Height: '
pokemonList.forEach(function (pokemon) {
    document.write(pokemon.name + height + pokemon.height + 'm' + '<br>');
});
