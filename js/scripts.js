let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
            // 'weight' in pokemon &&
            // 'height' in pokemon &&
            // 'abilities' in pokemon &&
            // 'types' in pokemon
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

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.weight = details.weight;
            item.height = details.height;
            // item.abilities = details.abilities;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    }

    // filter function. Starts at 0 as array
    // function filterPokemonByName(name) {
    //     let result = getAll().filter((pokemon) => pokemon.name == name);
    //     return result[0];
    // }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetail: showDetails
    };
})();

// code now obsolete as information is from API
// console.log(pokemonRepository.getAll()); //[]
// pokemonRepository.add({ name: 'Mew', height: 0.4, weight: '4kg', abilities: ['Synchronize'], types: ['psychic'] });
// console.log(pokemonRepository.getAll()); //[{name: 'Mew'}]

// forEach() loops 
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



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
