const form = document.querySelector("#f");
const result = document.querySelector('#res');

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const jsonData = {};

  const data = new FormData(form);

  for (let [key, value] of data.entries()) {
    jsonData[key] = value;
  }

  fetch("/api/log", { method: "PUT", body: JSON.stringify(jsonData) })
    .then((res) => res.json())
    .then((res) => {
      if(res.isToken) {
        window.location = '/'
      }
      if(!res.ststus) {
        result.innerHTML = res.msg
        setTimeout(() => {
          document.querySelector("#res").innerHTML = ''
        }, 1000);
      }
    });
});
