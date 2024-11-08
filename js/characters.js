const requestURL = 'https://dragonball-api.com/api/characters?limit=58';

async function fetchCharactersJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error en la petición al Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error al obtener los personajes de la Api : ', error);
        return null;
    }
   
}

function createCharactersCard ({name, ki, maxKi, gender, affiliation, race, image}){
    return `
        <div class="card" style="width: 550px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${race} - ${gender}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${maxKi}</li>
                <li class="list-group-item">${affiliation}</li>
                <li class="list-group-item">${ki}</li>
            </ul>
        </div>
`;
}

async function displayCharacters() {
    const charactersSection = document.getElementById('charactersSection');
    const charactersData = await fetchCharactersJson();

    if (charactersData && charactersData.items){
        const charactersCards = charactersData.items.map(createCharactersCard).join('');
        charactersSection.innerHTML = charactersCards;
    }
    else
    {
        charactersSection.innerHTML = `<p>No se ha podido cargar el Json de los personajes</p>`;    
    }
}


displayCharacters();