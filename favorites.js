export const favoriteCities = JSON.parse(localStorage.getItem("list")) || [];



export function renderCities(container) {
  if (!container) return; //container yoksa fonksiyon sonlanır
  let html = "";
  if (favoriteCities.length !== 0) 
    //liste boş değilse html içeriği oluşturur div elementine(container) yazar
    {
    favoriteCities.forEach((city) => {
      html += `<div class="fav-city">
        <button class="renderCityDetails" data-city-name="${city.name}">Şehir adı: ${city.name}</button>
        <button class="delete-fav" data-city-name="${city.name}">Şehri Favorilerden Kaldır</button>
      </div>`;
    });
  } else {
    html = "favori şehir ekle";
  }
  container.innerHTML = html;
}



//listeye yeni favori şehir ekler, parametre olarak aldığı data nesne bilgilerini alır,container'ı günceller
export function addFavorite(data, container) {
  favoriteCities.push({
    name: data.name,
    temp: (data.main.temp - 273).toFixed(0),
    feelsLike: (data.main.feels_like - 273).toFixed(0),
    humidity: data.main.humidity,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  });
  localStorage.setItem("list", JSON.stringify(favoriteCities));
  renderCities(container);
}



//belirtilen şehir adı ile eşleşen ilk elementin indexi döner, "splice" ile listeden çıkarılır,container güncellenir
export function deleteFavorite(cityName, container) {
  const index = favoriteCities.findIndex((city) => city.name === cityName); //"findIndex" ilk koşulu sağlayan elemanın indexini döndürür
  if (index !== -1) {
    //bulunmazsa -1 döner
    favoriteCities.splice(index, 1);
  }
  localStorage.setItem("list", JSON.stringify(favoriteCities));
  renderCities(container);
}

