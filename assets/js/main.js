document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const pokemonList = document.getElementById('pokemonList');

    const maxRecords = 151;
    let allPokemons = [];

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `;
    }

    function loadPokemonItems() {
        pokeApi.getPokemons(0, maxRecords).then((pokemons = []) => {
            allPokemons = pokemons;
            const newHtml = allPokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML = newHtml;
    
            // Adicione um evento de clique para cada Pokémon na lista
            pokemonList.querySelectorAll('.pokemon').forEach((pokemonElement) => {
                pokemonElement.addEventListener('click', function () {
                    const selectedPokemonId = pokemonElement.dataset.pokemonId;
                    const selectedPokemon = allPokemons.find(pokemon => pokemon.id === Number(selectedPokemonId));
    
                    // Exiba os detalhes do Pokémon selecionado
                    displayPokemonDetails(selectedPokemon);
                });
            });
        });
    }
    

    function displayPokemonDetails(pokemon) {
        const pokemonDetails = document.getElementById('pokemonDetails');
        pokemonDetails.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>Number: #${pokemon.number}</p>
            <p>Height: ${pokemon.height}</p>
            <p>Weight: ${pokemon.weight}</p>
            <p>Type: ${pokemon.type}</p>
            <p>Abilities: ${pokemon.abilities.join(', ')}</p>
            <p>Base Experience: ${pokemon.baseExperience}</p>
            <!-- Adicione mais detalhes conforme necessário -->
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        `;
    }
    
    


    function loadPokemonItems() {
        pokeApi.getPokemons(0, maxRecords).then((pokemons = []) => {
            allPokemons = pokemons;
            const newHtml = allPokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML = newHtml;
        });
    }

    function displayPokemons(pokemons) {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML = newHtml;
    }

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredPokemons = allPokemons.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm)
            );
            displayPokemons(filteredPokemons);
        });
    }

    // Remova completamente a lógica relacionada ao "Load More"
    // Se houver algum trecho remanescente, remova-o.

    // loadMoreButton.addEventListener('click', () => {
    //     // Lógica do "Load More"
    // });

    loadPokemonItems();
});