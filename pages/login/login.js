const form = document.querySelector("#f");

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const jsonData = {};

  const data = new FormData(form);

  for (let [key, value] of data.entries()) {
    console.log(key, value);
    jsonData[key] = value;
  }
  console.log(jsonData);

  fetch("/api/log", { method: "PUT", body: JSON.stringify(jsonData) })
    .then((res) => res.json())
    .then((res) => {
      if(res.isToken) {
        window.location = '/'
      }
      console.log(res);
    });
});
