// stabiliamo le costanti
const MAX_POKEMON = 1302;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-pokemon");
const numberFiler = document.querySelector("#number");
const nameFiler = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

let allPokemons = [];

// inseriamo l'api per ricevere i dati dalla nostra api con il comando fetch
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
.then((Response) => Response.json())
.then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
});

// utilizziamo le funzioni asincrone per evitare il lag del caricamento dei dati
async function fetchPokemonDataBeforeRedirect(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()
            ),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()
        ),
        ]);
        return true
    } catch (error) {
            console.error("Failed to fetch Pokemon data before redirect");
    }
}

function displayPokemons(pokemon) {
    listWrapper.innerHTML = "";

    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/");
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="number-wrap">
                <p class="caption-fonts">#${pokemonID}</p>
            </div>
            <div class="img-wrap">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
            </div>
            <div class="name-wrap">
                <p class="body3-fonts">#${pokemon.name}</p>
            </div>
        `;

        listItem.addEventListener("click", async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);
            if (success) {
                windows.location.href = `./detail.html?id=${pokemonID}`
            }
        });

        listWrapper.appendChild(listItem);
    });
}