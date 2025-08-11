let partners = document.getElementById("partners");
let topDestinations = document.getElementById("top-destinations");

window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/flight.json");
  let data = await res.json();
  partnersUI(data.partners);
  topDestinationsUI(data.topDestinations);
});

function partnersUI(data) {
  for (let i = 0; i < data.length; i++) {
    partners.innerHTML += `<li
          class="w-[300px] h-[100px] bg-[url(${data[i].logo})] bg-no-repeat bg-center bg-contain my-5"
        ></li>`;
  }
}

function topDestinationsUI(data) {
  for (let i = 0; i < data.length; i++) {
    topDestinations.innerHTML += `
      <div class="w-[450px] max-w-[100%] shadow-md rounded-2xl flex flex-wrap items-center justify-center">
        <div
          class="w-1/2 max-sm:w-full h-[150px] bg-[url(${data[i].image})] bg-no-repeat bg-cover rounded-l-2xl max-sm:rounded-bl-none max-sm:rounded-t-2xl"
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
        </div>
      </div>
    `;
  }
}
