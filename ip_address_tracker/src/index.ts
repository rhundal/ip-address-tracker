/* this file communicates with the index.html */

// import function from fetch-api-details.ts

import { fetchIPDetails } from "./modules/fetch-ip-details.js";

type IPObject = {
  ip: string;
  location: LocationData;
  isp: string;
};

type LocationData = {
  country: string;
  region: string;
  city: string;
  postalCode?: string;
  timezone: string;
};

let searchField = document.getElementById("searchIpAddress");
let searchBtn = document.getElementById("submitBtn");
let fetchedDetails = null;

let ipDetailsField = document.querySelector("#displayIP");
let ipLocationField = document.getElementById("displayLocation");
let ipTimeZoneField = document.getElementById("displayTimezone");
let ipISPField = document.getElementById("displayIsp");

searchBtn?.addEventListener("click", async function (event) {
  event.preventDefault();
  let userInput = (searchField as HTMLInputElement)?.value;

  fetchedDetails = await fetchIPDetails(userInput); // then print this to ui
  renderIpDetails(fetchedDetails);
  // pass these details to render function
});

function renderIpDetails(ipDetails: IPObject) {
  if (ipDetailsField) {
    (ipDetailsField as HTMLInputElement).innerText = ipDetails.ip;
  }
  if (ipLocationField) {
    (ipLocationField as HTMLInputElement).innerText =
      ipDetails.location.city +
      " " +
      ipDetails.location.region +
      " " +
      ipDetails.location.postalCode;
  }
  if (ipTimeZoneField) {
    (ipTimeZoneField as HTMLInputElement).innerText =
      ipDetails.location.timezone;
  }
  if (ipISPField) {
    (ipISPField as HTMLInputElement).innerText = ipDetails.isp;
  }
}
