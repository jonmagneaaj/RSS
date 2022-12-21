const days = document.querySelector('#3-day')

const url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lang={no}&appid=b6bf7c7278d021187d253f08549e9aa3'
const getWeather = async (lat, lon) =>{

    const api = `${url}&lat=${lat}&lon=${lon}`;

    const response = await fetch(api);
    const json = await response.json();

    //Lokasjon
    //const sted = json.city.name;
    //textSted.innerHTML = sted;
    //Bilde av været

    let i = 1;

    // Samler sammen dataen fra Json til hver sin array . Burde være 1 objekt men vet ikke hvordan
    const daysArray = [];
    const tempratures = [];
    const date = [];

    // Funksjon til å gå igjennom Json og putte dataen i hver sin array
    Catch();
    function Catch() {

        if (i < 3) {
            let bilde = json.list[i].weather[0].icon;
            let bildeURL = `http://openweathermap.org/img/wn/${bilde}@2x.png`;
            let temp = json.list[i].main.temp;
            let dt = json.list[i].dt;
            const mtemp = Math.trunc(temp);

            forcastArray.push(bildeURL)
            temprature.push(mtemp)
    
            i++
            Catch();
        };
    };

    //Printer ut arrayene
    for ( let i=0; i < forcastArray.length; i++) {
        if (temprature[i] < 0) {
            days.innerHTML += `
            <div id='day'>
                <img src=${forcastArray[i]} >
                <h3 class='coldFont'>${temprature[i]} </h3>
            </div>
        `
        } else {
            days.innerHTML += `
                <div id='day'>
                    <img src=${forcastArray[i]} >
                    <h3 class='varmFont'>${temprature[i]} </h3>
                </div>
            `
        }
    }
}

// 
const visPosisjon = (pos) =>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    getWeather(lat, lon);
}

// Henter din lokasjon
navigator.geolocation.getCurrentPosition(visPosisjon);