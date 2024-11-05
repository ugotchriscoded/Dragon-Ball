const requestURL = 'https://dragonball-api.com/api/planets?limit=20';

async function fetchPlanetsJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Fail to request Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Fail to obtain the planets in Api : ', error);
        return null;
    }
   
}

function createPlanetsCard ({ name, image}){
    return `
        <div class="card" style="width: 200px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
            </div>
        </div>
`;
}

async function displayPlanets() {
    const planetSection = document.getElementById('planetSection');
    const planetsData = await fetchPlanetsJson();

    if (planetsData && planetsData.items){
        const planetCards = planetsData.items.map(createPlanetsCard).join('');
        planetSection.innerHTML = planetCards;
    }
    else
    {
        planetSection.innerHTML = `<p>Fail to charge planets Json</p>`;    
    }
}


displayPlanets();