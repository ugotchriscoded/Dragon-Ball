const requestURL = 'https://dragonball-api.com/api/characters?limit=58';

async function fetchCharactersJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Fail to request Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Fail to obtain the characters in Api : ', error);
        return null;
    }
   
}

function createCharacterCard ({name, gender, ki, maxKi, race, image, affiliation}){
    return `
        <div class="cards">
            <img src="${image}" class="cardImgTop" alt="Dragon Ball Character">
            <div class="card-body, cardBody">
                <h5 class="cardTitle">${name}</h5>
                <p class="cardText">${race} - ${gender}</p>
            </div>
            <ul class="listGroup">
                <li class="listGroupItem"><p>Base Ki: ${ki}</p></li>
                <li class="listGroupItem"><p>Max Ki: ${maxKi}</p></li>
                <li class="listGroupItem"><p>Affiliation: ${affiliation}</p></li>
            </ul>
        </div>
`;
}

async function displayCharacters() {
    const charactersSection = document.getElementById('charactersSection');
    const charactersData = await fetchCharactersJson();

    if (charactersData && charactersData.items){
        const characterCards = charactersData.items.map(createCharacterCard).join('');
        charactersSection.innerHTML = characterCards;
    }
    else
    {
        charactersSection.innerHTML = `<p>Fail to charge characters Json</p>`;    
    }
}


displayCharacters();