/* this file communicates with the index.html */

// import function from fetch-api-details.ts

import { fetchIPDetails } from "./modules/fetch-ip-details.js";
import { Map, TileLayer, Marker, Circle, Polygon, Popup } from "leaflet";

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
  lat: number;
  lng: number;
};

let searchField = document.getElementById("searchIpAddress");
let searchBtn = document.getElementById("submitBtn");
let fetchedDetails = null;

let ipDetailsField = document.querySelector("#displayIP");
let ipLocationField = document.getElementById("displayLocation");
let ipTimeZoneField = document.getElementById("displayTimezone");
let ipISPField = document.getElementById("displayIsp");

let mapAreaDiv = document.getElementById("mapArea");

let latitude: number = 0.0;
let longitude: number = 0.0;
let countryVar: string = "";
let regionVar: string = "";
let cityVar: string = "";
let zipVar: string = "";
let ipVar: string = "";

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

  ipVar = ipDetails.ip;
  latitude = ipDetails.location.lat;
  longitude = ipDetails.location.lng;
  countryVar = ipDetails.location.country;
  regionVar = ipDetails.location.region;
  cityVar = ipDetails.location.city;
  zipVar = ipDetails.location.postalCode ?? "N/A";

  new Marker([latitude, longitude])
    .addTo(myMap)
    .bindPopup(
      `City:${cityVar}, Region:${regionVar}, Country: ${countryVar}, IPAddress:${ipVar}`,
    )
    .openPopup();
}

const myMap = new Map(mapAreaDiv as HTMLElement).setView(
  [latitude, longitude],
  13,
);

new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
}).addTo(myMap);
