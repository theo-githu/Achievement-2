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
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = uppercaseFirst(pokemon.name);
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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.weight = details.weight;
            item.height = details.height;
            item.abilities = details.abilities;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    // Modal start. 
    // 
    //modalContainer and modal need to be global variable for the 
    //showDetails function and the hideModal function. 
    let modalContainer = document.querySelector('#modal-container');
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    // addListItem calls this function, via click event on pokemon button.
    // Modal will be shown with additional pokemon information.
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal();
        });
    }

    //add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('scr', img);
    imageElement.setAttribute('width', '304');
    imageElement.setAttribute('height', '228');
    imageElement.setAttribute('alt', 'Pokemon Portrait');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

    function hideModal() {
    modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

modalContainer.addEventListener('click', (e) => {
    //only want to close if user clicks on overlay
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
});



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
}) ();

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
