const apiKey = "d40b416deda94becae374726231904";

// Элементы на странице

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// Слушаем отправку формы

form.onsubmit = function (event) {
  // Отменяем отправку формы
  event.preventDefault();

  // Берем значения из инпута + обрезаем таб и пробел тримом
  let city = input.value.trim();

  // Адрес запроса

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  // Выполняем запрос

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Проверка на ошибку (неправильное название города)

      if (data.error) {
        // Если есть ошибка - выводим
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();
        const html = `<div class='card'>${data.error.message}</div>`; // Отображение карточки с ошибкой
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Отображаем полученные данные в карточке

        // Удаляем предыдущую карточку

        //   const prevCard = document.querySelector(".card");
        //   if (prevCard) prevCard.remove();

        // Разметка для карточки

        const html = `<div class="card">
      <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

      <div class="card-weather">
          <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
          <img class="card-image" src="img/wes.png" alt="Ooopss.." />
      </div>

      <div class="card-description">${data.current.condition.text}</div>
    </div>`;

        // Отображаем карточку на странице

        header.insertAdjacentHTML("afterend", html);
      }
    });
};
