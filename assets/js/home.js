const topDest = document.getElementById("dest-UI");
const pricing = document.getElementById("pricing");

window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/home.json");
  let data = await res.json();
  topDestinationUI(data.topDestinations);
  pricingUI(data.pricing);
});

function topDestinationUI(data) {
  for (let i = 0; i < data.length; i++) {
    topDest.innerHTML += `
      <a href="./tour.html" class="w-80 h-96 rounded-4xl border border-[#e5e7eb]">
        <div
          class="h-[80%] rounded-t-4xl bg-[url(../images/${data[i].image})] bg-no-repeat bg-cover"
        ></div>
        <div class="py-1 px-3 text-black flex justify-between items-center">
          <p>${data[i].destination}</p>
          <p>&dollar;${data[i].cost}</p>
        </div>
        <p class="border-t border-[#e5e7eb] px-3 text-black">${data[i].duration}</p>
      </a>
    `;
  }
}

function pricingUI(data) {
  for (let i = 0; i < data.length; i++) {
    let offer = `
    <div class="w-[350px] bg-white shadow-md rounded-4xl p-10 mt-10">
      <p class="text-[20px] font-bold"><sup>&dollar;</sup>${data[i].price}<sub>/mo</sub></p>
      <div class="flex items-center justify-between my-5">
        <div
          class="w-[55%] h-[80px] bg-[url(../images/${data[i].image1})] bg-no-repeat bg-cover rounded-full"
        ></div>
        <div
          class="w-[40%] h-[80px] bg-[url(../images/${data[i].image2})] bg-no-repeat bg-cover rounded-full"
        ></div>
      </div>
      <h3 class="text-[30px] font-bold">${data[i].tour}</h3>
      <p class="my-5">
        ${data[i].desc}
      </p>
      <hr />
      <ul>`;
    for (let j = 0; j < data[i].features.length; j++) {
      offer += `
        <li class="py-2 my-3">
          <i class="fa-solid fa-circle-check text-[#7c3aed]"></i>
          <span class="mx-1">${data[i].features[j]}</span>
        </li>
      `;
    }
    offer += `</ul>
      <button
        class="w-full cursor-pointer bg-black text-white p-3 mt-5 border-none rounded-full"
        onclick="getStarted()"
      >
        Get Started
      </button>
    </div>
    `;
    pricing.innerHTML += offer;
  }
}

function getStarted() {
  location.href = "./tour.html";
}

const catSearch = document.getElementById("cat-search");
const catSearchList = document.querySelectorAll("#cat-search li");

catSearchList.forEach((item) => {
  item.addEventListener("click", (e) => {
    catSearchList.forEach((item) => item.removeAttribute("data-selected"));
    item.setAttribute("data-selected", "true");
    catSearch.setAttribute("category", item.getAttribute("category"));
  });
});

const room = document.getElementById("room");
const guestSetter = document.getElementById("guest-setter");
const setGuest = document.getElementById("set-guest");
const adults = document.getElementById("adults");
const childs = document.getElementById("childs");
const rooms = document.getElementById("rooms");
const hotelDest = document.getElementById("hotel-dest");
const hotelDestSetter = document.getElementById("hotel-destination-setter");
const setHotelDest = document.getElementById("set-hotel-dest");
const hotelSubmitRes = document.getElementById("hotel-submit-res");
const hotelSubmitSuccess = document.getElementById("hotel-res-succ");
const hotelSubmitFailed = document.getElementById("hotel-res-failed");
const hotelForm = document.getElementById("hotel-form");

room.addEventListener("focus", () => {
  guestSetter.classList.remove("hidden");
});

// room.addEventListener("blur", () => {
//   room.value = `${adults.value} Adults ${childs.value} Childs ${rooms.value} Rooms`
//   guestSetter.classList.add("hidden");
// });

setGuest.addEventListener("click", () => {
  room.value = `${adults.value} Adults ${childs.value} Childs ${rooms.value} Rooms`
  guestSetter.classList.add("hidden");
})

hotelDest.addEventListener("focus", () => {
  hotelDestSetter.classList.remove("hidden");
})

// hotelDest.addEventListener("blur", () => {
//   const checkedDest = document.querySelector("input[name='dest']:checked");
//   hotelDest.value = `${checkedDest.value}`
//   hotelDestSetter.classList.add("hidden");
// })

setHotelDest.addEventListener("click", () => {
  const checkedDest = document.querySelector("input[name='dest']:checked");
  hotelDest.value = `${checkedDest.value}`
  hotelDestSetter.classList.add("hidden");
})

hotelForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#hotel-form input");
  let valid = true;
  let formData = new FormData(hotelForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const val of Object.values(formObj)) {
    if (val === "") {
      valid = false;
      break;
    }
  }
  if (!valid) {
    hotelSubmitRes.classList.remove("hidden");
    hotelSubmitRes.classList.add("flex");
    hotelSubmitFailed.classList.remove("hidden");
  } else {
    hotelSubmitRes.classList.remove("hidden");
    hotelSubmitRes.classList.add("flex");
    hotelSubmitSuccess.classList.remove("hidden");
    for (const inp of formInputs) {
      if(inp.name === "adults" || inp.name === "childs" || inp.name === "rooms") {
        inp.value = "1";
      }else if(inp.name === "dest") {
        if (inp.value === "cairo") {
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

hotelSubmitRes.addEventListener("click", () => {
  hotelSubmitRes.classList.remove("flex");
  hotelSubmitRes.classList.add("hidden");
  hotelSubmitFailed.classList.add("hidden");
  hotelSubmitSuccess.classList.add("hidden");
})


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

const tourDestination = document.getElementById("tour-desti");
const tourDestSetter = document.getElementById("tour-dest-setter");
const setTourDest = document.getElementById("set-tour-dest");
const tourSubmitRes = document.getElementById("tour-submit-res");
const tourSubmitSuccess = document.getElementById("tour-res-succ");
const tourSubmitFailed = document.getElementById("tour-res-failed");
const tourForm = document.getElementById("tour-form");



tourDestination.addEventListener("focus", () => {
  tourDestSetter.classList.remove("hidden");
})

// tourDestination.addEventListener("blur", () => {
//   const checkedDest = document.querySelector("input[name='tour-dest']:checked");
//   tourDestination.value = `${checkedDest.value}`
//   tourDestSetter.classList.add("hidden");
// })

setTourDest.addEventListener("click", () => {
  const checkedDest = document.querySelector("input[name='tour-dest']:checked");
  tourDestination.value = `${checkedDest.value}`
  tourDestSetter.classList.add("hidden");
})

tourForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#tour-form input");
  let valid = true;
  let formData = new FormData(tourForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const val of Object.values(formObj)) {
    if (val === "") {
      valid = false;
      break;
    }
  }
  if (!valid) {
    tourSubmitRes.classList.remove("hidden");
    tourSubmitRes.classList.add("flex");
    tourSubmitFailed.classList.remove("hidden");
  } else {
    tourSubmitRes.classList.remove("hidden");
    tourSubmitRes.classList.add("flex");
    tourSubmitSuccess.classList.remove("hidden");
    for (const inp of formInputs) {
      if(inp.name === "tour-dest") {
        if (inp.value === "cairo") {
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

tourSubmitRes.addEventListener("click", () => {
  tourSubmitRes.classList.remove("flex");
  tourSubmitRes.classList.add("hidden");
  tourSubmitFailed.classList.add("hidden");
  tourSubmitSuccess.classList.add("hidden");
})

const picupLocation = document.getElementById("pickup-location");
const pickupSetter = document.getElementById("pick-up-setter");
const setPickup = document.getElementById("set-pick-up");
const dropoffLocation = document.getElementById("dropoff-location");
const dropoffSetter = document.getElementById("drop-off-setter");
const setDropoff = document.getElementById("set-drop-off");
const carSubmitRes = document.getElementById("car-submit-res");
const carSubmitSuccess = document.getElementById("car-res-succ");
const carSubmitFailed = document.getElementById("car-res-failed");
const carForm = document.getElementById("car-form");



picupLocation.addEventListener("focus", () => {
  pickupSetter.classList.remove("hidden");
})

// picupLocation.addEventListener("blur", () => {
//   const checkedPickup = document.querySelector("input[name='pick-up']:checked");
//   picupLocation.value = `${checkedPickup.value}`
//   tourDestSetter.classList.add("hidden");
// })

setPickup.addEventListener("click", () => {
  const checkedPickup = document.querySelector("input[name='pick-up']:checked");
  picupLocation.value = `${checkedPickup.value}`
  pickupSetter.classList.add("hidden");
})

dropoffLocation.addEventListener("focus", () => {
  dropoffSetter.classList.remove("hidden");
})

// dropoffLocation.addEventListener("blur", () => {
//   const checkedDropoff = document.querySelector("input[name='drop-off']:checked");
//   dropoffLocation.value = `${checkedDropoff.value}`
//   dropoffSetter.classList.add("hidden");
// })

setDropoff.addEventListener("click", () => {
  const checkedDropoff = document.querySelector("input[name='drop-off']:checked");
  dropoffLocation.value = `${checkedDropoff.value}`
  dropoffSetter.classList.add("hidden");
})

carForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInputs = document.querySelectorAll("#car-form input");
  let valid = true;
  let formData = new FormData(carForm);
  let formObj = Object.fromEntries(formData.entries());
  for (const val of Object.values(formObj)) {
    if (val === "") {
      valid = false;
      break;
    }
  }
  if (!valid) {
    carSubmitRes.classList.remove("hidden");
    carSubmitRes.classList.add("flex");
    carSubmitFailed.classList.remove("hidden");
  } else {
    carSubmitRes.classList.remove("hidden");
    carSubmitRes.classList.add("flex");
    carSubmitSuccess.classList.remove("hidden");
    for (const inp of formInputs) {
      if(inp.name === "pick-up" || inp.name === "drop-off") {
        if (inp.value === "store1") {
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

carSubmitRes.addEventListener("click", () => {
  carSubmitRes.classList.remove("flex");
  carSubmitRes.classList.add("hidden");
  carSubmitFailed.classList.add("hidden");
  carSubmitSuccess.classList.add("hidden");
})
