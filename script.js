import jsonDATA from "./data.json" with { type: "json" };

const tbody1 = document.getElementById("tbody1");
const tbody2 = document.getElementById("tbody2");
const table2 = document.getElementById("table2");

function display(filteredData, table) {
  table.replaceChildren();

  filteredData.forEach((data) => {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = data.id;

    const td2 = document.createElement("td");
    const img = document.createElement("img");
    img.src = data.img_src;
    img.alt = `${data.first_name[0]} ${data.last_name[0]}`;

    const fullname = `${data.first_name} ${data.last_name}`;
    td2.append(img, fullname);

    const td3 = document.createElement("td");
    td3.textContent = data.gender;

    const td4 = document.createElement("td");
    td4.textContent = data.class;

    const td5 = document.createElement("td");
    td5.textContent = data.marks;

    const td6 = document.createElement("td");
    td6.textContent = data.passing ? "passing" : "failed";

    const td7 = document.createElement("td");
    td7.textContent = data.email;

    tr.append(td1, td2, td3, td4, td5, td6, td7);
    table.append(tr);
  });
}

const input = document.querySelector("#input");

document.querySelector("#search_btn").addEventListener("click", function () {
  table2.style.display = "none";
  const query = input.value.trim().toLowerCase();
  if (query === "") {
    display(jsonDATA, tbody1);
    return;
  }
  const filteredData = jsonDATA.filter(
    (person) =>
      person.first_name.toLowerCase().includes(query) ||
      person.last_name.toLowerCase().includes(query) ||
      person.email.toLowerCase().includes(query),
  );
  display(filteredData, tbody1);
});


input.addEventListener("input", function () {
  table2.style.display = "none";
  const query = this.value.trim().toLowerCase();

  const filteredData = jsonDATA.filter(
    (person) =>
      person.first_name.toLowerCase().includes(query) ||
      person.last_name.toLowerCase().includes(query) ||
      person.email.toLowerCase().includes(query),
  );
  display(filteredData, tbody1);
});

document.querySelector("#sort_AZ").addEventListener("click", function () {
  table2.style.display = "none";
  const sortedData = [...jsonDATA].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`;
    const nameB = `${b.first_name} ${b.last_name}`;

    return nameA.localeCompare(nameB, undefined, {
      sensitivity: "base",
    });
  });
  display(sortedData, tbody1);
});

document.querySelector("#sort_ZA").addEventListener("click", function () {
  table2.style.display = "none";
  const sortedData = [...jsonDATA].sort((a, b) => {
    const nameA = `${a.first_name} ${a.last_name}`;
    const nameB = `${b.first_name} ${b.last_name}`;

    return nameB.localeCompare(nameA, undefined, {
      sensitivity: "base",
    });
  });
  display(sortedData, tbody1);
});

document.querySelector("#sort_byMarks").addEventListener("click", function () {
  table2.style.display = "none";
  const sortedData = [...jsonDATA].sort((a, b) => a.marks - b.marks);
  display(sortedData, tbody1);
});

document.querySelector("#sort_byPass").addEventListener("click", function () {
  table2.style.display = "none";
  const filteredData = jsonDATA.filter((value) => value.passing === true);
  display(filteredData, tbody1);
});

document.querySelector("#sort_byClass").addEventListener("click", function () {
  table2.style.display = "none";
  const sortedData = [...jsonDATA].sort((a, b) => a.class - b.class);
  display(sortedData, tbody1);
});

document.querySelector("#sort_byGender").addEventListener("click", function () {
  const maleData = jsonDATA.filter(
    (value) => value.gender.toLowerCase() === "male",
  );
  
  const femaleData = [...jsonDATA].filter(
    (value) => value.gender.toLowerCase() === "female",
  );

  table2.style.display = "table";
  display(maleData, tbody1);
  display(femaleData, tbody2);
});

display(jsonDATA, tbody1);
