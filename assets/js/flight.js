let partners = document.getElementById("partners");
let topDestinations = document.getElementById("top-destinations");

window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/flight.json");
  let data = await res.json();
  partnersUI(data.partners);
  topDestinationsUI(data.topDestinations);
});

function partnersUI(data) {
  for (let i = 0; i < data.length; i++) {
    partners.innerHTML += `<li
          class="w-[300px] h-[100px] bg-[url(../images/${data[i].logo})] bg-no-repeat bg-center bg-contain my-5"
        ></li>`;
  }
}

function topDestinationsUI(data) {
  for (let i = 0; i < data.length; i++) {
    topDestinations.innerHTML += `
      <a href="./tour.html" class="w-[450px] max-w-[100%] shadow-md rounded-2xl flex flex-wrap items-center justify-center">
        <div
          class="w-1/2 max-sm:w-full h-[150px] bg-[url(../images/${data[i].image})] max-sm:bg-[url(../images/${data[i].image2})] bg-no-repeat bg-cover rounded-l-2xl max-sm:rounded-bl-none max-sm:rounded-t-2xl"
        ></div>
        <div class="p-2 w-1/2 max-sm:w-full  h-[150px] flex flex-col justify-between">
          <div>
            <h3 class="text-[25px] font-semibold">${data[i].city}</h3>
            <p class="text-[#6b7280]">${data[i].country}</p>
          </div>
          <div>
            <p class="text-[#6b7280]">Round-trip from</p>
            <p class="text-[#6b7280]">US$ ${data[i].cost}</p>
          </div>
        </div>
      </a>
    `;
  }
}

const from = document.getElementById("from");
const flightFromSetter = document.getElementById("flight-from-setter");
const setFlightFrom = document.getElementById("set-flight-from");
const to = document.getElementById("to");
const flightToSetter = document.getElementById("flight-to-setter");
const setFlightTo = document.getElementById("set-flight-to");
const flightClass = document.getElementById("class");
const flightClassSetter = document.getElementById("flight-class-setter");
const setFlightClass = document.getElementById("set-flight-class");
const flightSubmitRes = document.getElementById("flight-submit-res");
const flightSubmitSuccess = document.getElementById("flight-res-succ");
const flightSubmitFailed = document.getElementById("flight-res-failed");
const flightForm = document.getElementById("flight-form");


from.addEventListener("focus", () => {
  flightFromSetter.classList.remove("hidden");
})

// from.addEventListener("blur", () => {
//   const checkedFrom = document.querySelector("input[name='flight-from']:checked");
//   from.value = `${checkedFrom.value}`
//   flightFromSetter.classList.add("hidden");
// })

setFlightFrom.addEventListener("click", () => {
  const checkedFrom = document.querySelector("input[name='flight-from']:checked");
  from.value = `${checkedFrom.value}`
  flightFromSetter.classList.add("hidden");
})

to.addEventListener("focus", () => {
  flightToSetter.classList.remove("hidden");
})

// to.addEventListener("blur", () => {
//   const checkedTo = document.querySelector("input[name='flight-to']:checked");
//   to.value = `${checkedTo.value}`
//   flightToSetter.classList.add("hidden");
// })

setFlightTo.addEventListener("click", () => {
  const checkedTo = document.querySelector("input[name='flight-to']:checked");
  to.value = `${checkedTo.value}`
  flightToSetter.classList.add("hidden");
})

flightClass.addEventListener("focus", () => {
  flightClassSetter.classList.remove("hidden");
})

// flightClass.addEventListener("blur", () => {
//   const checkedClass = document.querySelector("input[name='flight-class']:checked");
//   flightClass.value = `${checkedClass.value}`
//   flightClassSetter.classList.add("hidden");
// })

setFlightClass.addEventListener("click", () => {
  const checkedClass = document.querySelector("input[name='flight-class']:checked");
  flightClass.value = `${checkedClass.value}`
  flightClassSetter.classList.add("hidden");
})

flightForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#flight-form input");
  let valid = true;
  let formData = new FormData(flightForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const val of Object.values(formObj)) {
    if (val === "") {
      valid = false;
      break;
    }
  }
  if (!valid) {
    flightSubmitRes.classList.remove("hidden");
    flightSubmitRes.classList.add("flex");
    flightSubmitFailed.classList.remove("hidden");
  } else {
    flightSubmitRes.classList.remove("hidden");
    flightSubmitRes.classList.add("flex");
    flightSubmitSuccess.classList.remove("hidden");
    for (const inp of formInputs) {
      if(inp.name === "flight-from" || inp.name === "flight-to") {
        if (inp.value === "cairo") {
          inp.checked = true;
        } else {
          inp.checked = false;
        }
      }else if(inp.name === "flight-class"){
        if (inp.value === "luxury") {
          inp.checked = true;
        } else {
          inp.checked = false;
        }
      }else {
        inp.value = ""
      }
    }
  }
})

flightSubmitRes.addEventListener("click", () => {
  flightSubmitRes.classList.remove("flex");
  flightSubmitRes.classList.add("hidden");
  flightSubmitFailed.classList.add("hidden");
  flightSubmitSuccess.classList.add("hidden");
})

let offerBtn = document.getElementById("offer-btn");

offerBtn.addEventListener("click", () => {
  location.href = "./index.html#pricing-section";
})