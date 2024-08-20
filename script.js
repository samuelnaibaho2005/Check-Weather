const apiKey = '8340dc4d546d9244b6267b79ced0af09';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const iconCuaca = document.querySelector(".icon_cuaca");

// membuat fungsi kota
async function cekCuaca(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    // menampilkan hasil saat menginputkan kota
    document.querySelector(".cuaca").style.display = 'block';
    
    // memasukkan data dari API ke HTML
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = data.wind.speed + `km/h`;
    document.querySelector(".location").innerHTML = data.sys.country;
    document.querySelector(".pressure").innerHTML = data.main.pressure + `Pa`;

    // mengubah icon cuaca berdasarkan suhu kota
    if(data.weather[0].main == 'Clouds'){
        iconCuaca.src = 'image/clouds.png';
    } else if(data.weather[0].main == 'Sun'){
        iconCuaca.src = 'image/sun.png';
    }else if(data.weather[0].main == 'Rain'){
        iconCuaca.src = 'image/rain.png';
    }else if(data.weather[0].main == 'Drizzle'){
        iconCuaca.src = 'image/drizzle.png';
    }else if(data.weather[0].main == 'Mist'){
        iconCuaca.src = 'image/mist.png';
    }

}

// membuat tombol search berfungsi saat diklik
searchBtn.addEventListener('click', () =>{
    cekCuaca(searchInput.value);
});

// membuat animasi placeholder input
const placeholderText = "Enter name city.....";
const inputText = document.querySelector(".search input");

let index = 0;

function typePlaceholder(){
    if(index < placeholderText.length){
        inputText.setAttribute("placeholder", placeholderText.substring(0, index +1));
    index++;
    setTimeout(typePlaceholder, 150);
    } else{
        setTimeout(resetAnimation, 200);
    }
}
//membuat animasi berulang ulang
function resetAnimation(){
    index = 0;
    inputText.setAttribute("placeholder", "");
    setTimeout(typePlaceholder, 50);
}
window.onload = typePlaceholder;