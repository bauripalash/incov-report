// CONSTANTS
REPORT_URL = "https://bauripalash.github.io/ncov-19-india/data/report.json"; //Data Source
var smap; // The Map Leaflet Object
var gj; // The GeoJSON Layer
var infobox;

const zoomTo = e => {
  smap.fitBounds(e.target.getBounds());
  showInfo(e);
};

const showInfo = e => {
  // console.log(e);
  gj.resetStyle();
  let layer = e.target;

  layer.setStyle({
    weight: 1,
    opacity: 1,
    color: "blue",
    fillColor: "red",
    // dashArray: '',
    fillOpacity: 1
  });
  // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //     layer.bringToFront();
  // }
  infobox.update(layer.feature.properties);
  //   console.log(infobox);
};

const resetInfo = e => {
  gj.resetStyle(e.target);
};

const oef = (f, l) => {
  // console.log(f , l);
  l.on({
    mouseover: showInfo,
    mouseout: resetInfo,
    click: zoomTo
  });
};

const mapstyle = s => {
  let e = 0;
  if (eStateList.indexOf(s.properties["STATE"]) >= 0) {
    if (s.properties["STATE"] == "Union Territory of Jammu and Kashmir") {
      e =
        eCountList[eStateList.indexOf(s.properties["STATE"])] +
        eCountList[eStateList.indexOf("Union Territory of Ladakh")];
    } else {
      e = eCountList[eStateList.indexOf(s.properties["STATE"])];
    }
  }
  //   console.log(s.properties["STATE"]);

  return {
    weight: 1,
    opacity: 0.2,
    color: "black",
    fillOpacity: e / totalInfected,
    fillColor: "#cc0000"
  };
};

const buildMap = () => {
  smap = L.map("state_map").setView([22.5, 82], 3);

  L.tileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    {
      attribution:
        "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
      subdomains: ["a", "b", "c"],
      maxZoom: 6,
      minZoom: 4
      // tileSize: 512,
      // zoomOffset: -1
    }
  ).addTo(smap);

  infobox = L.control();

  infobox.onAdd = function(map) {
    this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infobox.update = function(props) {
    if (props) {
      if (eStateList.indexOf(props["STATE"]) >= 0) {
        sd = JSON.parse(localStorage.getItem("alldata"))[
          eStateList.indexOf(props["STATE"])
        ];
        // console.log(sd);
        e = sd["effected"];
        d = sd["death"];
        c = sd["recovered"];

        status = `<h4>${props["STATE"]}</h4>`;
        status += `<div class="infos"><strong>Effected: </strong><span style="color:red">${e}</span><br>`;
        status += `<strong>Deaths: </strong><span style="color:red">${d}</span><br>`;
        status += `<strong>Recovered: </strong><span style="color:green">${c}</span><br></div>`;
      } else {
        status = `<h4>${props["STATE"]}</h4><br>No Confirmed Cases!`;
      }
    } else {
      let status = "<h4>Statewise COVID-19 Data</h4>" + "Hover over a state";
    }
    this._div.innerHTML = status;
    // this._div.innerHTML = props
    //   ? `<h4>${props["STATE"]}</h4><hr><strong>Effected: </strong> <span style="color:red">${props["effected"]}</span>`
    //   : "<h4>Statewise COVID-19 Data</h4>" + "Hover over a state";
  };

  infobox.addTo(smap);
  gj = L.geoJson(statesData, {
    style: mapstyle,
    onEachFeature: oef
  }).addTo(smap);
};

let eStateList = Array();
let eCountList = Array();
let dList = Array();
let rList = Array();

fetch(REPORT_URL)
  .then(res => res.json())
  .then(res =>
    localStorage.setItem(
      "alldata",
      JSON.stringify(res),
      localStorage.setItem("arlen", res.length)
    )
  );

JSON.parse(localStorage.getItem("alldata"))
  .slice(0, localStorage.getItem("arlen") - 1)
  .forEach(e => {
    eStateList.push(e["state"]);
    eCountList.push(e["effected"]);
    dList.push(e["death"]);
    rList.push(e["recovered"]);
  });

let totalInfected = eCountList.reduce((a, b) => {
  return a + b;
}, 0);

buildMap();
// console.log(totalInfected);
// mapstyle(eStateList[0]);
// console.log(eStateList)
