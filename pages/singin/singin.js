const form = document.querySelector("#f");

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const jsonData = {};

  const data = new FormData(form);

  for (let [key, value] of data.entries()) {
    jsonData[key] = value;
  }

  fetch("/api/log", {
    method: "POST",
    body: JSON.stringify(jsonData),
  })
    .then((res) => res.json())
    .then((res) => {
      document.querySelector("#res").innerHTML = res.msg;
      if (res.ststus) {
        document.querySelector("#res").style.color = '#86ffc7'
      } else {
        document.querySelector("#res").style.color = '#c23636'
      }

      setTimeout(() => {
        document.querySelector("#res").innerHTML = ''
      }, 1000);
    });
});
