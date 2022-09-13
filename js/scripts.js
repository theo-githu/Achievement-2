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

let height = ' - Height: ';
let m = 'm';
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 1.3) {
        document.write(pokemonList[i].name + height + pokemonList[i].height + m + ' is the smallest pokemon.');
    } else {
        document.write(pokemonList[i].name + height + pokemonList[i].height + m + '<br>');
    }
}