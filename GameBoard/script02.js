const table = document.getElementById("ranking");
let previous = null;
function clearColor() {
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) rows[i].style.backgroundColor = "";
}

function reloadRankTable(data) {
    while (table.firstChild) table.removeChild(table.firstChild);
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = "Ranking";
    cell2.innerHTML = "Name";
    cell3.innerHTML = "Score";
    if (previous === null) previous = data;
    for (let i = 0; i < data.length; i++) {
        row = table.insertRow(-1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data[i].name;
        cell3.innerHTML = data[i].score;
        if (data[i].name !== previous[i].name || data[i].score !== previous[i].score) row.style.backgroundColor = "red";
    }
    previous = data;
    setTimeout(clearColor, 1000);
}
function updateRank() {
    fetch("https://www.olt.tokyo:8443/Score/get?pass=rank")
        .then((res) => res.json())
        .then((data) => reloadRankTable(data));
}
updateRank();
setInterval(updateRank, 5000);
