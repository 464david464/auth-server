const form = document.querySelector("#f");
const inp = document.querySelectorAll('input');

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
        inp.forEach(inp => {
          inp.value = ''
        });
        document.querySelector("#res").innerHTML = res.msg + 'you can log in now <a href="/login">click here</a>';
        
      } else {
        document.querySelector("#res").style.color = '#c23636'

        setTimeout(() => {
          document.querySelector("#res").innerHTML = ''
        }, 1000);
      }

      
    });
});
