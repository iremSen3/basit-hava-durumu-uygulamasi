import { fetchData, getLocation } from "./weatherAPI.js";
import { renderCities, deleteFavorite, favoriteCities } from "./favorites.js";
import { showLoader, hideLoader } from "./ui.js";

const container = document.querySelector('.display-fav');
const cityName = document.querySelector('.city-input');
const loader = document.querySelector(".loader");
let apiKey = "6af8be0ad064f249efeefa11efc96b1d";

document.querySelector('.search-button').addEventListener('click', () => {
  getLocation(cityName, apiKey, loader, container);
});


//tıklanan elementin sınıfına göre işlev görür
container.addEventListener("click", (event) => {
  if (event.target.classList.contains('delete-fav')) 
  //delete fav sınıfına sahipse,silinecek div seçilir,şehir adı alınır ve deletefavorite ile hem listeden hem de localstorage'tan silinir
  {
    const cityDiv = event.target.parentElement;
    const cityName = event.target.dataset.cityName;
    cityDiv.remove();
    deleteFavorite(cityName, container);
  } 

  else if (event.target.classList.contains('renderCityDetails'))
    //favorilerde tıklanılan şehrin hava durumu bilgisi dinamik alınır
    {
    const cityName = event.target.dataset.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetchData(url, loader, container);
  }
});



const favButton=document.querySelector('.favCities');

favButton.addEventListener("click",()=>{
//container gizliyse (hidden sınıfı varsa)
//renderCities ile içeriği güncelle ve hidden sınıfını kaldırarak görünür yap
//hidden yoksa
//hidden sınıfını ekleyerek container'ı gizle

if(container.classList.contains('hidden')){
  renderCities(container);
  container.classList.remove('hidden')
}
else{
  container.classList.add('hidden');
}

})