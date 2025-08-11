const catSearch = document.getElementById("cat-search");
const catSearchList = document.querySelectorAll("#cat-search li");
const topDest = document.getElementById("dest-UI");
const pricing = document.getElementById("pricing");

catSearchList.forEach((item) => {
  item.addEventListener("click", (e) => {
    catSearchList.forEach((item) => item.removeAttribute("data-selected"));
    item.setAttribute("data-selected", "true");
    catSearch.setAttribute("category", item.getAttribute("category"));
  });
});

window.addEventListener("load", async () => {
  let res = await fetch("/assets/apis/home.json");
  let data = await res.json();
  topDestinationUI(data.topDestinations);
  pricingUI(data.pricing);
});

function topDestinationUI(data) {
  for (let i = 0; i < data.length; i++) {
    topDest.innerHTML += `
      <div class="w-80 h-96 rounded-4xl border border-[#e5e7eb]">
        <div
          class="h-[80%] rounded-t-4xl bg-[url(${data[i].image})] bg-no-repeat bg-cover"
        ></div>
        <div class="py-1 px-3 text-black flex justify-between items-center">
          <p>${data[i].destination}</p>
          <p>&dollar;${data[i].cost}</p>
        </div>
        <p class="border-t border-[#e5e7eb] px-3 text-black">${data[i].duration}</p>
      </div>
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
          class="w-[55%] h-[80px] bg-[url(${data[i].image1})] bg-no-repeat bg-cover rounded-full"
        ></div>
        <div
          class="w-[40%] h-[80px] bg-[url(${data[i].image2})] bg-no-repeat bg-cover rounded-full"
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
  location.href = "/tour.html";
}
