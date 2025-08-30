import { favoriteCities, addFavorite, renderCities } from "./favorites.js";


export function detailsData(data) {
  //parent divi seçilir
  const parentDiv = document.querySelector('.citys-details');
  let existingDetails = parentDiv.querySelector(`[data-city="${data.name}"]`);
  //css attribute selector [attribute="value"] ile sadece onu seçer, ilk bulduğu div'i
  //seçilen mevcutsa önceki detayı kaldırır
  if (existingDetails) {
    existingDetails.remove();
  }
  //yeni div oluşturur, dataset bilgisi ekler "appendChild" ile parent'a ekler
  const cityDiv = document.createElement('div');
  cityDiv.dataset.city = data.name;
  cityDiv.className = 'display-fav-details';
  cityDiv.innerHTML = `
    Şehir adı: ${data.name} <br>
    Sıcaklık: ${(data.main.temp - 273).toFixed(0)}°C<br>
    Hissedilen sıcaklık: ${(data.main.feels_like - 273).toFixed(0)}°C <br>
    Nem: %${data.main.humidity} <br>
    Hava Durumu simgesi: <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> <br>
  `;
  parentDiv.appendChild(cityDiv);
  return cityDiv;
  //daha sonra dinamik button ekleyeceğimiz divi döndürür
  
}




export function details(data, container) {
  const parentDiv = detailsData(data);
  //dönen divi alır
  let existingButton = parentDiv.querySelector(".add-fav");
  if (existingButton) return; //birden fazla buton eklemeden sonlandırır

  const button = document.createElement("button");
  button.className = "add-fav";
  const available = favoriteCities.find(item => item.name === data.name);
  // varsa true döner
  if (available) {
    button.disabled = true; //tıklanılamaz hale getirir
    button.textContent = "Zaten Favorilerde";
  } else {
    button.textContent = "Şehri Favorilerine Ekle";
    button.addEventListener("click", () => {
      addFavorite(data, container);
      button.disabled = true;
      button.textContent = "Zaten Favorilerde";
    });
  }

  parentDiv.appendChild(button);
}


//veri yüklenirken ekranda mesajı gösterir
export function showLoader(loader) {
  loader.textContent = "veri yükleniyor";
  loader.style.display = "block"; // göster
}

export function hideLoader(loader) {
  loader.style.display = "none";
}
