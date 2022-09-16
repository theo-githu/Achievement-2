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

    // forEach() loops 
    let height = ' - Height: '
    pokemonList.forEach(function (pokemon) {
        document.write(pokemon.name + height + pokemon.height + 'm' + '<br>');
    });

    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
    };
})();

console.log(pokemonRepository.getAll()); //[]
pokemonRepository.add({ name: 'Mew' });
console.log(pokemonRepository.getAll()); //[{name: 'Mew'}]

