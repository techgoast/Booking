let partners = document.getElementById("partners");
let bestRooms = document.getElementById("best-rooms");
let viewMore = document.getElementById("view-more");
let viewLess = document.getElementById("view-less");

let bestRomsData = [];
window.addEventListener("load", async () => {
  let res = await fetch("./assets/apis/hotel.json");
  let data = await res.json();
  bestRomsData = [...data.bestRooms];
  partnersUI(data.partners);
  bestRoomsUI(bestRomsData.slice(0, 6));
});

function partnersUI(data) {
  for (let i = 0; i < data.length; i++) {
    partners.innerHTML += `<li
          class="w-[300px] h-[100px] bg-[url(../images/${data[i].logo})] bg-no-repeat bg-center bg-contain my-5"
        ></li>`;
  }
}

function bestRoomsUI(data) {
  for (let i = 0; i < data.length; i++) {
    bestRooms.innerHTML += `
      <a href="./tour.html" class="w-[450px] max-w-[100%] shadow-md rounded-2xl">
        <div
          class="w-full h-[250px] bg-[url(../images/${
            data[i].image
          })] bg-no-repeat bg-cover rounded-t-2xl"
        ></div>
        <div class="py-1 px-2">
          <h3 class="text-[25px] font-semibold">${data[i].type}</h3>
          <p class="text-[#6b7280]">
            <i class="${data[i].location.icon}"></i>
            <span class="mx-1">${data[i].location.address}</span>
          </p>
          <div class="mt-5 text-[#6b7280]">
            <div class="flex justify-between items-center">
              ${
                data[i].bed.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].bed.icon}"></i>
                  <span class="mx-1">${data[i].bed.text}</span>
                </p>`
                  : ""
              }
              ${
                data[i].parking.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].parking.icon}"></i>
                  <span class="mx-1">${data[i].parking.text}</span>
                </p>`
                  : ""
              }
              ${
                data[i].breakfast.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].breakfast.icon}"></i>
                  <span class="mx-1">${data[i].breakfast.text}</span>
                </p>`
                  : ""
              }
            </div>
            <div class="flex justify-between items-center">
              ${
                data[i].ac.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].ac.icon}"></i>
                  <span class="mx-1">${data[i].ac.text}</span>
                </p>`
                  : ""
              }
              ${
                data[i].wifi.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].wifi.icon}"></i>
                  <span class="mx-1">${data[i].wifi.text}</span>
                </p>`
                  : ""
              }
              ${
                data[i].laundry.available
                  ? `
                <p class="w-[100px]">
                  <i class="${data[i].laundry.icon}"></i>
                  <span class="mx-1">${data[i].laundry.text}</span>
                </p>`
                  : ""
              }
            </div>
          </div>
        </div>
      </a>
    `;
  }
}

viewMore.addEventListener("click", (e) => {
  bestRooms.innerHTML = "";
  bestRoomsUI(bestRomsData);
  e.target.toggleAttribute("data-display");
  viewLess.toggleAttribute("data-display");
});

viewLess.addEventListener("click", (e) => {
  bestRooms.innerHTML = "";
  bestRoomsUI(bestRomsData.slice(0, 6));
  e.target.toggleAttribute("data-display");
  viewMore.toggleAttribute("data-display");
});

const room = document.getElementById("room");
const guestSetter = document.getElementById("guest-setter");
const setGuest = document.getElementById("set-guest");
const adults = document.getElementById("adults");
const childs = document.getElementById("childs");
const rooms = document.getElementById("rooms");
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