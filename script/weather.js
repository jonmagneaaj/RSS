const forcast = document.querySelector('#forcast')
const days = document.querySelector('#days')

const url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lang={no}&appid=b6bf7c7278d021187d253f08549e9aa3'
const getWeather = async (lat, lon) =>{

    //const api = `${url}&lat=${lat}&lon=${lon}`;
    const api = `${url}&lat=59.911491&lon=10.757933`;
   

    const response = await fetch(api);
    const json = await response.json();

    //Lokasjon
    //const sted = json.city.name;
    //textSted.innerHTML = sted;
    console.log(json);
    //Bilde av været

    let i = 0;

    // Samler sammen dataen fra Json til hver sin array . Burde være 1 objekt men vet ikke hvordan
    const forcastArray = [];
    const temprature = [];
    const date = [];

    console.log("Lengde: "+ json.list.length)

    // Funksjon til å gå igjennom Json og putte dataen i hver sin array
    Catch();
    function Catch() {
        days.innerHTML = ``;
        forcast.innerHTML = ``;
    
        for (let i = 0; i < json.list.length; i++) {
            let bilde = json.list[i].weather[0].icon;
            let bildeURL = `http://openweathermap.org/img/wn/${bilde}@2x.png`;
            let temp = json.list[i].main.temp;
            let dt = json.list[i].dt;
            const mtemp = Math.trunc(temp);
    
            forcastArray.push(bildeURL)
            temprature.push(mtemp)
        }
    }
    

    //Printer nåtid på værmelding
    for ( let i=0; i < 1; i++) {
        if (temprature[i] < 1) {
            forcast.innerHTML += `
                <img src=${forcastArray[i]} >
                <h1 class='coldFont'>${temprature[i]} </h1>
        `
        } else {
            forcast.innerHTML += `
                    <img src=${forcastArray[i]} >
                    <h1 class='varmFont'>${temprature[i]} </h1>
            `
        }
    }

    // Henter timen
    var datoen = new Date();
    var hour = Math.round(datoen.getHours()/6)*6;
    var day = datoen.getDay(); // get the current day of the week

    // Printer neste 2 værmeldinger
    for ( let i=1; i < 3; i++) {
    hour = hour + 6; // update the value of hour
    if (hour > 23) {
        hour = hour - 24;
        day++; // increment the value of day by 1
    }
    if (day > 6) {
        day = day - 7; // reset the value of day to 0 if it exceeds 6
    }

    // add a leading zero to the value of hour if it is a single digit
    if (hour < 10) {
        hour = hour.toString().padStart(2, '0');
    }
    if (temprature[i] < 1) {
        days.innerHTML += `
        <div class='day'>
            <h4>${hour}:00</h4>
            <img src=${forcastArray[i]} >
            <h3 class='coldFont'>${temprature[i]} </h3>
        </div>
        `
    } else {
        days.innerHTML += `
        <div class='day'>
            <h4>${hour}:00</h4>
            <img src=${forcastArray[i]} >
            <h3 class='varmFont'>${temprature[i]} </h3>
        </div>
    `
    }


 }
}  

// Refresher været hvert 5 min
setInterval(getWeather, 5 * 60 * 1000);

// Lager posisjonen
const visPosisjon = (pos) =>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    getWeather(lat, lon);
}

// Henter din lokasjon
navigator.geolocation.getCurrentPosition(visPosisjon);