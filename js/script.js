const apiKey = "d40b416deda94becae374726231904";

// Элементы на странице

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// Удаляем предыдущую карточку

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

// Отображаем карточку с ошибкой на странице

function showError(errorMessage) {
  const html = `<div class='card'>${data.error.message}</div>`; // создаем новую карточку
  header.insertAdjacentHTML("afterend", html); // отображаем html код
}

// Отображаем карточку с результатом на странице

function showCard({ name, country, temp, condition }) {
  const html = `<div class="card">
      <h2 class="card-city">${name} <span>${country}</span></h2>

      <div class="card-weather">
          <div class="card-value">${temp}<sup>°c</sup></div>
          <img class="card-image" src="img/wes.png" alt="Ooopss.." />
      </div>

      <div class="card-description">${condition}</div>
    </div>`;

  header.insertAdjacentHTML("afterend", html); // Отображаем новую карточку на странице
}

async function getWeather(city) {
  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// Слушаем отправку формы

form.onsubmit = async function (event) {
  // Отменяем отправку формы
  event.preventDefault();

  // Берем значения из инпута + обрезаем таб и пробел тримом
  let city = input.value.trim();

  const data = await getWeather(city); // получаем данные с сервера

  if (data.error) {
    // Проверка на ошибку (неправильное название города)
    removeCard();
    showError(data.error.message);
  } else {
    // Отображаем полученные данные в карточке

    //  removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };

    showCard(weatherData);
  }
};
