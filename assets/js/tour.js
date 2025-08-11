let filterForm = document.getElementById("filter-form");
let duration = document.getElementById("duration");
let durationVal = document.getElementById("duration-val");
let price = document.getElementById("price");
let priceVal = document.getElementById("price-val");
let trips = document.getElementById("trips");

durationVal.innerHTML = `${duration.value} Days`;
duration.addEventListener("change", () => {
  durationVal.innerHTML = `${duration.value} Days`;
});

priceVal.innerHTML = `${price.value} $`;
price.addEventListener("change", () => {
  priceVal.innerHTML = `${price.value} $`;
});

// filterForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let queryString = window.location.search;
//   let urlParams = new URLSearchParams(queryString);
//   console.log(queryString);
//   console.log(urlParams.getAll("dest"));
// });

let tripsData = [];
window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/tour.json");
  let data = await res.json();
  tripsData = [...data.trips];
  tripsUI(tripsData);
});

function tripsUI(data) {
  for (let i = 0; i < data.length; i++) {
    let trip = `
      <div class="w-[350px] max-w-[100%] shadow-md rounded-2xl">
        <div
          class="w-full h-[250px] bg-[url(${data[i].image})] bg-no-repeat bg-cover rounded-t-2xl"
        ></div>
        <div class="py-1 px-2">
          <div class="text-right text-[#fcd34d] py-5">
    `;
    for (let j = 0; j < data[i].stars; j++) {
      trip += `<i class="fa-solid fa-star"></i>`;
    }
    trip += `
          </div>
          <h3 class="text-[25px] font-semibold">${data[i].destination}</h3>
          <p class="text-[#6b7280]">
            <i class="${data[i].address.icon}"></i>
            <span class="mx-1">${data[i].address.city}</span>
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
      </div>
    `;
    trips.innerHTML += trip;
  }
}
