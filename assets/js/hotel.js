let partners = document.getElementById("partners");
let bestRooms = document.getElementById("best-rooms");
let viewMore = document.getElementById("view-more");
let viewLess = document.getElementById("view-less");

let bestRomsData = [];
window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/hotel.json");
  let data = await res.json();
  bestRomsData = [...data.bestRooms];
  partnersUI(data.partners);
  bestRoomsUI(bestRomsData.slice(0, 6));
});

function partnersUI(data) {
  for (let i = 0; i < data.length; i++) {
    partners.innerHTML += `<li
          class="w-[300px] h-[100px] bg-[url(${data[i].logo})] bg-no-repeat bg-center bg-contain my-5"
        ></li>`;
  }
}

function bestRoomsUI(data) {
  for (let i = 0; i < data.length; i++) {
    bestRooms.innerHTML += `
      <div class="w-[450px] max-w-[100%] shadow-md rounded-2xl">
        <div
          class="w-full h-[250px] bg-[url(${
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
      </div>
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
