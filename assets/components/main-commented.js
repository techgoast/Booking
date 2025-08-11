// window.onload = async function getTopDestinations() {
//   let res = await fetch("/assets/apis/home-top-destination.json");
//   let data = await res.json();
//   topDestinationUI(data);
// };

// function topDestinationUI(data) {
//   for (let i = 0; i < data.length; i++) {
// let destContainer = document.createElement("a");
// destContainer.setAttribute("href", "/new.html");
//     let destContainer = document.createElement("div");
//     destContainer.classList.add(
//       "w-80",
//       "h-96",
//       "rounded-4xl",
//       "border",
//       "border-[#e5e7eb]"
//     );
//     let imageContainer = document.createElement("div");
//     imageContainer.classList.add(
//       "h-[80%]",
//       "rounded-t-4xl",
//       `bg-[url(${data[i].image})]`,
//       "bg-no-repeat",
//       "bg-cover"
//     );
//     destContainer.appendChild(imageContainer);
//     let destInfo = document.createElement("div");
//     destInfo.classList.add(
//       "py-1",
//       "px-3",
//       "text-black",
//       "flex",
//       "justify-between",
//       "items-center"
//     );
//     let destName = document.createElement("p");
//     let destNameText = document.createTextNode(`${data[i].destination}`);
//     destName.appendChild(destNameText);
//     destInfo.appendChild(destName);
//     let destCost = document.createElement("p");
//     let destCostText = document.createTextNode(`$${data[i].cost}`);
//     destCost.appendChild(destCostText);
//     destInfo.appendChild(destCost);
//     destContainer.appendChild(destInfo);
//     let destDuration = document.createElement("p");
//     destDuration.classList.add(
//       "border-t",
//       "border-[#e5e7eb]",
//       "px-3",
//       "text-black"
//     );
//     let destDurationText = document.createTextNode(`${data[i].duration}`);
//     destDuration.appendChild(destDurationText);
//     destContainer.appendChild(destDuration);
//     topDest.appendChild(destContainer);
//   }
// }
