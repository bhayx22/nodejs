console.log("script");

const Wform = document.querySelector("form");
const input = document.querySelector("input");
const errormsg = document.querySelector("#error");
console.log(Wform);
Wform.addEventListener("submit", (e) => {
  errormsg.textContent = "";
  const location = input.value;
  if (location == "") {
    errormsg.textContent = "Please Enter location!";
  } else {
    fetch("http://localhost:3000?location=" + location, {
      method: "post",
    })
      .then((resp) => {
        resp
          .json()
          .then((data) => {
            console.log(data);
            console.log(data.data.location);
            if (data.data.location.error)
              errormsg.textContent = data.data.location.error.message;
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => console.log(error));
  }
  console.log("submit");
  e.preventDefault();
});
