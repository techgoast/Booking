let topOffers = document.getElementById("top-rental-offers");
let viewMore = document.getElementById("view-more");
let viewLess = document.getElementById("view-less");
let sanitizeSafety = document.getElementById("sanitize-safety");

let topOffersData = [];
window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/car.json");
  let data = await res.json();
  topOffersData = [...data.cars];
  topOffersUI(topOffersData.slice(0, 3));
  sanitizeSafetyUI(data.safetyPractices);
});

function topOffersUI(data) {
  for (let i = 0; i < data.length; i++) {
    topOffers.innerHTML += `
      <div class="w-[450px] max-w-[100%]  rounded-2xl">
        <div
          class="w-full h-[250px] bg-[url(../images/${data[i].image})] bg-no-repeat bg-cover rounded-t-2xl"
        ></div>
        <div class="py-1 px-2 flex justify-between items-center pt-5">
          <div>
            <h3 class="text-[20px] font-semibold">${data[i].class}</h3>
            <p class="text-[#6b7280]">
              from $${data[i].cost}
            </p>
          </div>
          <button
          class="py-2 px-3 bg-[#7c3aed] text-white cursor-pointer rounded-full"
          data-display
        >
          Book Now
        </button>
        </div>
      </div>
    `;
  }
}

viewMore.addEventListener("click", (e) => {
  topOffers.innerHTML = "";
  topOffersUI(topOffersData);
  e.target.toggleAttribute("data-display");
  viewLess.toggleAttribute("data-display");
});

viewLess.addEventListener("click", (e) => {
  topOffers.innerHTML = "";
  topOffersUI(topOffersData.slice(0, 3));
  e.target.toggleAttribute("data-display");
  viewMore.toggleAttribute("data-display");
});

function sanitizeSafetyUI(data) {
  for (let i = 0; i < data.length; i++) {
    sanitizeSafety.innerHTML += `<li
          class="w-[300px] p-10 relative border border-[#7c3aed] font-semibold flex justify-center items-center text-center rounded-2xl"
        >
          <div class="absolute top-0 left-1/2 -translate-1/2  bg-[#f3f4f6] rounded-full p-3">
            <img src="./assets/images/${data[i].iconImage}" alt="icon image" class="w-[30px] h-[30px]"/>
          </div>
          ${data[i].desc}
        </li>`;
  }
}

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