REPORT_URL =
  "https://raw.githubusercontent.com/bauripalash/ncov-19-india/master/data/report.json";

const parsePage = r => {
  var death = r[r.length - 1]["total_death"];
  var effected = r[r.length - 1]["total_effected"];
  var cured = r[r.length - 1]["total_cured"];
  var states = r[r.length - 1]["total_states"];
  var table = "";
  r.slice(0, r.length - 1).forEach(e => {
    table += `<tr><td>${e["state"]}</td><td>${e["effected"]}</td><td>${e["recovered"]}</td><td>${e["death"]}</td></tr>`;
  });
  lup = r[r.length - 1]["last_update"];
  table = `<table><tr><th>States/UT</th><th>Effected</th><th>Recovered</th><th>Death</th></tr>${table}</table>`;
  writePage(effected, cured, death, states, table, lup);
};

const writePage = (effected, cured, death, states, table, lup) => {
  localStorage.setItem("ce", effected);
  localStorage.setItem("cr", cured);
  localStorage.setItem("cd", death);
  document.getElementById("e_num").innerHTML = effected;
  document.getElementById("r_num").innerHTML = cured;
  document.getElementById("d_num").innerHTML = death;
  document.getElementById("s_num").innerHTML = states;
  document.getElementById("state_table").innerHTML = table;
  document.getElementById("lup").innerText = lup;
};

fetch(REPORT_URL)
  .then(res => res.json())
  .then(res => parsePage(res));
