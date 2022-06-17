const userNameSpan = document.querySelector("#usrName");

fetch("api/log")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
      userNameSpan.innerHTML = "welcome " + res.useNAme.name;
  });

