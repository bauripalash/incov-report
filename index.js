REPORT_URL = "https://bauripalash.github.io/ncov-19-india/data/report.json";

const parsePage = r => {
  // context = {
  var death=  r[r.length - 1]["total_death"];
  var effected= r[r.length - 1]["total_effected"];
  var cured= r[r.length - 1]["total_cured"];
  var states= r[r.length - 1]["total_states"];
  // };
  var table = "";
  r.slice(0, r.length - 1).forEach(e => {
    table += `<tr><td>${e["state"]}</td><td>${e["effected"]}</td><td>${e["recovered"]}</td><td>${e["death"]}</td></tr>`;
  });
  lup = r[r.length - 1]["last_update"];
  table = `<table><tr><th>States/UT</th><th>Effected</th><th>Recovered</th><th>Death</th></tr>${table}</table>`;
  // console.log(table);
  writePage(effected , cured , death , states , table, lup);
};

const writePage = (effected , cured , death , states , table, lup) => {
  document.getElementById("e_num").innerHTML = effected;
  document.getElementById("r_num").innerHTML = cured;
  document.getElementById("d_num").innerHTML = death;
  document.getElementById("s_num").innerHTML = states;
  document.getElementById("state_table").innerHTML = table;
  document.getElementById("lup").innerText = lup;
  // boxes = document.getElementById("boxes").innerHTML;
  // box_template = doT.template(boxes);
  // document.getElementById("boxes").innerHTML = box_template(context);

  // document.getElementById("state_table").innerHTML = table["t"];
  // document.getElementById("lup").innerHTML = lup;
};



fetch(REPORT_URL)
  .then(res => res.json())
  .then(res => parsePage(res));


