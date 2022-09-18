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

    // Function adds pokemon and validates typeof    
    // function add(pokemon) {
    //     if (typeof pokemon !== 'object') {
    //         console.log('Please assign a Pokemon');
    //     }
    //     let keys = Object.keys(pokemon);
    //     if (!keys.includes('name')) {
    //         console.log('Requirements are missing');
    //     }
    //     pokemonList.push(pokemon);
    // }

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'weight' in pokemon &&
            'height' in pokemon &&
            'abilities' in pokemon &&
            'types' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        // add event listener - listens to clicks on pokemon buttons and returns information of the button
        button.addEventListener('click', function (event) {
            showDetails(pokemon); //event handler 
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    // filter function. Starts at 0 as array
    function filterPokemonByName(name) {
        let result = getAll().filter((pokemon) => pokemon.name == name);
        return result[0];
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetail: showDetails
    };
})();

console.log(pokemonRepository.getAll()); //[]
pokemonRepository.add({ name: 'Mew', height: 0.4, weight: '4kg', abilities: ['Synchronize'], types: ['psychic'] });
console.log(pokemonRepository.getAll()); //[{name: 'Mew'}]

// forEach() loops 
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

new Promise((resolve, reject) => {
    
})
