// Imports
import { isDestiny } from "./passenger.js";

// Global vars
let passengerData;
let countries;

function plotMap(port) {
  // Get container width and clear container
  const container = document.querySelector("#map");
  const width = container.offsetWidth;
  container.innerHTML = "";

  const plot = Plot.plot({
    projection: "equal-earth",
    width,
    marks: [
      Plot.geo(countries, {
        stroke: "#000000",
        fill: "white",
        fill: (country) => {
          const isFilled = passengerData.some((p) =>
            isDestiny(country.properties.name, p, port)
          );

          return isFilled ? "red" : "white";
        },
      }),
      Plot.graticule(),
      Plot.sphere(),
    ],
  });

  const div = document.querySelector("#map");
  div.append(plot);
}

function convertToGeojson(topoCountries) {
  var countries = topojson.feature(
    topoCountries,
    topoCountries.objects.countries
  );

  return countries;
}

async function main() {
  // Load passenger data
  passengerData = await fetch("./assets/titanic-completo-paises.json").then(
    (response) => response.json()
  );

  // Load countries topojson
  fetch("./assets/countries-50m.json")
    .then((response) => response.json())
    .then((json) => convertToGeojson(json))
    .then((result) => {
      countries = result;
      plotMap("all");
    });
}

main();

function updateMap(e) {
  plotMap(e.target.value);
}

// Listeners
const input = document.querySelector("#selectPort");
input.addEventListener("change", updateMap);
