let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon && 'detailsUrl' in pokemon &&
            'weight' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
            // 'abilities' in pokemon
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
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
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

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.weight = details.weight;
            pokemon.height = details.height;
            //pokemon.abilities = details.abilities;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Fetch the type names from the types array of the detailed pokemon info object and assign them to a string. 
    function pokemonTypes(pokemon) {
        let types = pokemon.types;
        let pokemonTypes = '';
        for (let i = 0; i < types.length; i++) {
            if (!types[i + 1]) {
                pokemonTypes = pokemonTypes + types[i].type.name;
            } else {
                pokemonTypes = pokemonTypes + types[i].type.name + ', ';
            }
        }
        return pokemonTypes;
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $("modal-title");
        let modalHeader = $("modal-header");

        //clear existing content of the modal
        modalTitle.empty();
        modalBody.empty();

        //creating elements for modal content
        let nameElement = $('<h1> + pokemon.name + </h1>');

        let imageElement = $('<img class="modal-img">');
        imageElement.attr('src', pokemon.imageUrl);

        let heightElement = $('<p> + "Height:" + pokemon.height + </p>');

        let weightElement = $('<p> + "Weight:" + pokemon.weight + </p>');

        let typesElement = $('<p> + "Types:" + pokemon.types + </p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetail: showDetails,
        showModal: showModal
    };
})();

// forEach() loops 
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

