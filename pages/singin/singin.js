const form = document.querySelector("#f");

document.addEventListener("submit", (e) => {
  e.preventDefault();

  const jsonData = {};

  const data = new FormData(form);

  for (let [key, value] of data.entries()) {
    console.log(key, value);
    jsonData[key] = value;
  }

  fetch("/api/log", {
    method: "POST",
    body: JSON.stringify(jsonData),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
});
