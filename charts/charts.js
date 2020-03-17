JSON_URL = "https://bauripalash.github.io/ncov-19-india/data/trend.json";

// window.onload = function() {
const buildChart = (json_data) => {
  cdata = json_data["CONFIRMED"];
  rdata = json_data["RECOVERED"];
  ddata = json_data["DEATHS"];
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
        },
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
  var ctx = document.getElementById("crd").getContext("2d");
  window.myLine = new Chart(ctx, config);
  document.getElementById("lup").innerHTML = Object.keys(cdata)[
    Object.keys(cdata).length - 1
  ];
  // };
};

fetch(JSON_URL)
  .then(res => res.json())
  .then(res => buildChart(res));

// console.log(cdata , rdata , ddata);
// crd = document.getElementById("crd");
// console.log(Object.values(cdata));
var download_chart = function(){
    var link = document.createElement('a');
    link.download = 'covid19-india-chart.jpg';
    link.href = document.getElementById('crd').toDataURL('image/jpeg')
    link.click();
  }