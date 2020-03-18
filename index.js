REPORT_URL = "https://bauripalash.github.io/ncov-19-india/data/report.json";

const parsePage = r => {
  context = {
    death: r[r.length - 1]["total_death"],
    effected: r[r.length - 1]["total_effected"],
    cured: r[r.length - 1]["total_cured"],
    states: r[r.length - 1]["total_states"]
  };
  table = {
    t: ""
  };
  r.slice(0, r.length - 1).forEach(e => {
    table[
      "t"
    ] += `<tr><td>${e["state"]}</td><td>${e["effected"]}</td><td>${e["recovered"]}</td><td>${e["death"]}</td></tr>`;
  });
  lup = r[r.length - 1]["last_update"];
  table[
    "t"
  ] = `<table><tr><th>States/UT</th><th>Effected</th><th>Recovered</th><th>Death</th></tr>${table["t"]}</table>`;
  writePage(context, table, lup);
};

const writePage = (context, table, lup) => {
  document.getElementById("e_num").innerText = context["effected"];
  document.getElementById("r_num").innerText = context["cured"];
  document.getElementById("d_num").innerText = context["death"];
  document.getElementById("s_num").innerText = context["states"];
  document.getElementById("state_table").innerHTML = table["t"];
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


