JSON_URL = "https://bauripalash.github.io/ncov-19-india/data/trend.json";
REPORT_URL =
  "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/report.json";
// window.onload = function() {
const buildChart = json_data => {
  cdata = json_data["CONFIRMED"];
  rdata = json_data["RECOVERED"];

  ddata = json_data["DEATHS"];

  today = new Date();

  if (
    localStorage.getItem("cr") != undefined &&
    localStorage.getItem("ce") != undefined &&
    localStorage.getItem("cd") != undefined
  ) {
    cdata[
      `${today.getMonth() + 1}/${today.getDate()}/${today
        .getFullYear()
        .toString()
        .slice(2, 4)}`
    ] = localStorage.getItem("ce");
    rdata[
      `${today.getMonth() + 1}/${today.getDate()}/${today
        .getFullYear()
        .toString()
        .slice(2, 4)}`
    ] = localStorage.getItem("cr");
    ddata[
      `${today.getMonth() + 1}/${today.getDate()}/${today
        .getFullYear()
        .toString()
        .slice(2, 4)}`
    ] = localStorage.getItem("cd");
  }
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
      animation: {
        duration: 2000,
        onProgress: function(animation) {
          progress.value = animation.currentStep / animation.numSteps;
        },
        onComplete: function() {
          progress.style.display = "none";
          document.getElementById('download_chart').innerText = "Download Graph";
        }
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
  var progress = document.getElementById('animationProgress');
  window.myLine = new Chart(ctx, config);
  // document.getElementById("lup").innerHTML = Object.keys(cdata)[
  //   Object.keys(cdata).length - 1
  // ];
  // };
};

var download_chart = function(el) {
  const canvas = document.getElementById("crd");
  var image = canvas.toDataURL("image/jpg");
  el.href = image;
};

fetch(REPORT_URL)
  .then(res => res.json())
  .then(r => {
    var death = r[r.length - 1]["total_death"];
    var effected = r[r.length - 1]["total_effected"];
    var cured = r[r.length - 1]["total_cured"];
    localStorage.setItem("ce", effected);
    localStorage.setItem("cr", cured);
    localStorage.setItem("cd", death);
    fetch(JSON_URL)
      .then(res => res.json())
      .then(res => buildChart(res));
  });
