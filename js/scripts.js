let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon && 'detailsUrl' in pokemon
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
            pokemon.abilities = details.abilities;
            pokemon.types = details.types;
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

    function showDetails(pokemon) {
        function showModal(pokemon) {
            let modalBody = $('.modal-body');
            let modalTitle = $('modal-title');
            let modalHeader = $('modal-header');

            //clear existing content of the modal
            modalTitle.empty();
            modalBody.empty();

            //creating elements for modal content
            let nameElement = $('<h1> + pokemon.name + </h1>');

            let imageElement = $('<img class='modal - img' style='width: 50 % '>');
            imageElement.attr('src', pokemon.imageUrl);

            let heightElement = $('<p> + pokemon.height + </p>');

            let weightElement = $('<p> + pokemon.weight + </p>');

            let typesElement = $('<p> + 'types: ' + pokemon.types + </p>');

            modalTitle.append(nameElement);
            modalBoday.append(imageElement);
            modalBody.append(heightElement);
            modalBody.append(weightElement);
            modalBody.append(typesElement);

            // pokemonRepository.loadDetails(pokemon).then(function () {
            //     console.log(pokemon)

            //     // show modal. When button is clicked, 'is-visible' class is added to the container.
            //     modalContainer.classList.add('is-visible');

            //     // add new modal content. 
            //     let closeButtonElement = document.createElement('button');
            //     closeButtonElement.classList.add('modal-close-button');
            //     closeButtonElement.innerText = 'Close';
            //     closeButtonElement.addEventListener('click', hideModal);

            //     let modalHeader = document.createElement('h1');
            //     modalHeader.innerText = pokemon.name;

            //     let modalContent = document.createElement('div');
            //     modalContent.classList.add('modal-content');

            //     let imageContainer = document.createElement('img');
            //     imageContainer.classList.add('image-container');
            //     imageContainer.src = pokemon.imageUrl;
            //     imageContainer.alt = 'Pokemon Portrait';

            //     let pokemonInfoA = document.createElement('p');
            //     pokemonInfoA.innerHTML = 'Height: ' + pokemon.height;
            //     let pokemonInfoB = document.createElement('p');
            // //     pokemonInfoB.innerText = 'Type: ' + pokemonTypes(pokemon);

            //     // Append all elements created
            //     modal.appendChild(closeButtonElement);
            //     modal.appendChild(modalHeader);
            //     modal.appendChild(modalContent);
            //     modalContent.appendChild(imageContainer);
            //     modalContent.appendChild(pokemonInfoA);
            //     modalContent.appendChild(pokemonInfoB);

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

        });
    }


    // reset content in the modal and hide modal container. 
    function hideModal() {
        modal.innerHTML = '';
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

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetail: showDetails
    };
})();

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
