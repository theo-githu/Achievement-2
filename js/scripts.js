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
    console.log(pokemon.name + height + pokemone.height + 'm');
});
