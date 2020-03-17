JSON_URL = "https://bauripalash.github.io/ncov-19-india/data/trend.json";

fetch(JSON_URL)
  .then(res => res.json())
  .then(res => localStorage.setItem("trend", JSON.stringify(res)));

cdata = JSON.parse(localStorage.getItem("trend"))["CONFIRMED"];
rdata = JSON.parse(localStorage.getItem("trend"))["RECOVERED"];
ddata = JSON.parse(localStorage.getItem("trend"))["DEATHS"];

console.log(cdata , rdata , ddata);
// crd = document.getElementById("crd");
// console.log(Object.values(cdata));

var config = {
  type: "line",
  data: {
    labels: Object.keys(cdata),
    datasets: [
      {
        label: "CONFIRMED",
        backgroundColor: window.chartColors.red,
        borderColor: window.chartColors.red,
        data: Object.values(cdata),
        fill: false
      },
      {
        label: "RECOVERED",
        fill: false,
        backgroundColor: window.chartColors.green,
        borderColor: window.chartColors.green,
        data: Object.values(rdata)
      }
      ,
      {
        label: "DEATHS",
        fill: false,
        backgroundColor: window.chartColors.orange,
        borderColor: window.chartColors.orange,
        data: Object.values(ddata)
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "India's COVID-19 Report (covid19.palashbauri.in)"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Date"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "People"
          }
        }
      ]
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById("crd").getContext("2d");
  window.myLine = new Chart(ctx, config);
  document.getElementById("lup").innerHTML = Object.keys(cdata)[Object.keys(cdata).length-1];
};
