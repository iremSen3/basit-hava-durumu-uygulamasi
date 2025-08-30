import { details, showLoader, hideLoader } from "./ui.js";

export async function fetchData(url, loader, container) {

  //veri çekildiği bilgisini verir
  showLoader(loader);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error'u! Durum: ${response.status}`); //response.ok başarı durumunu gösterir, başarısız olduğu durumda hata nesnesi fırlatır
    const data = await response.json(); //response mesajın işlenmiş hali veriyi açmak için .json().text()
    details(data, container);
  } catch (error) {
    console.log(`Hata oluştu`, error);
  } finally {
    hideLoader(loader); //veri çekme tamamlandı
  }
}

export function getLocation(cityName, apiKey, loader, container) {
  const city = cityName.value;
  if (city !== "") {
    container.innerHTML = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetchData(url, loader, container);
    //url oluşturur, veriyi çekip dösterir
    cityName.value = "";
  } else {
    //şehir adı boşsa konumdan bulur
    if (navigator.geolocation) {
      container.innerHTML = "";
      //getCurrentPosition anlık konumu alır,tek seferlik değilse watchPosition daha uygun
      navigator.geolocation.getCurrentPosition(
        (position) => {
          showPosition(position, apiKey, loader, container);
        },
        (error) => {
          errorPosition(error);
          //hata olursa,hataya göre mesajlar yazdırır
        }
      );
    }
  }
}

export function showPosition(position, apiKey, loader, container) {
  //enlem ve boylam bilgisini alır
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
 //operweathermap apı url'si oluşturulur
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetchData(url, loader, container);
}



//hata nesnesine göre,hata mesajı yazar
export function errorPosition(error) {
  const display = document.querySelector('.display-position');
  switch (error.code) {
    case error.PERMISSION_DENIED:
      display.innerHTML = 'Kullanıcı konum isteğini reddetti';
      break;
    case error.POSITION_UNAVAILABLE:
      display.innerHTML = 'Konum bulunamadı';
      break;
    case error.TIMEOUT:
      display.innerHTML = 'İstek zaman aşımına uğradı';
      break;
    case error.UNKNOWN_ERROR:
      display.innerHTML = 'Bilinmeyen bir hata meydana geldi';
      break;
  }
}
