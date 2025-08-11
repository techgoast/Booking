let topOffers = document.getElementById("top-rental-offers");
let viewMore = document.getElementById("view-more");
let viewLess = document.getElementById("view-less");
let sanitizeSafety = document.getElementById("sanitize-safety");

let topOffersData = [];
window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/car.json");
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
          class="w-full h-[250px] bg-[url(${data[i].image})] bg-no-repeat bg-cover rounded-t-2xl"
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
            <img src="${data[i].iconImage}" alt="icon image" class="w-[30px]" width="30"/>
          </div>
          ${data[i].desc}
        </li>`;
  }
}
