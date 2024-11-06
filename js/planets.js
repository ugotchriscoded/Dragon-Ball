const requestURL = "https://dragonball-api.com/api/planets?limit=20";

async function fetchPlanetsJson(){
    const response = await fetch(requestURL);
    try{
        if (!response.ok) {
            throw new Error(`Error en la petición al Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error al obtener los planetas de la Api : ', error);
        return null;
    }
   
}

function createPlanetsCard ({name, image}){
    return `
        <div class="card" style="width: 550px;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
            </div>
        </div>
`;
}

async function displayPlanets() {
    const planetsSection = document.getElementById('planetsSection');
    const planetsData = await fetchPlanetsJson();

    if (planetsData && planetsData.items){
        const planetsCards = planetsData.items.map(createPlanetsCard).join('');
        planetsSection.innerHTML = planetsCards;
    }
    else
    {
        planetsSection.innerHTML = `<p>No se ha podido cargar el Json de los planetas</p>`;    
    }
}


displayPlanets();