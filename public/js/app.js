fetch("http://puzzle.mead.io/puzzle").then((response) => {
  console.log(response);
  response.json().then((data) => {
    console.log(data);
  });
});

const fetchData = (co) => {
  fetch(
    `api.openweathermap.org/geo/1.0/reverse?lat=${co[1]}&lon=${co[0]}&limit=5&appid=1f397ae74104ce2c4edb862a779b2a21`
  ).then((response) => {
    response.json().then((data) => {
      if (data.message) {
        console.log(data.message);
        messageOne.textContent = "No city found, try another";
      }
      messageOne.textContent = data[0].name;
      messageTwo.textContent = data[0].state;
      console.log("city", data[0].name);
    });
  });
};
const weatherForm = document.querySelector("form");
const getData = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  const co = getData.value.split(" ");
  fetchData(co);
  console.log(co);
});
