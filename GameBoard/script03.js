const storage = localStorage;
let name = storage.name;
const player = document.getElementById("player");
const change = document.getElementById("change");
if (name === undefined) {
    name = "Nobody";
    storage.setItem("name", name);
}
player.innerHTML = name;
function changeName() {
    while (true) {
        let result = prompt("新しいユーザ名を入れてください");
        if (result === undefined) break;
        if (result.length > 0 && result.length <= 16) {
            name = result;
            storage.setItem("name", name);
            player.innerHTML = name;
            break;
        }
    }
}
change.addEventListener("click", changeName);
function sendScore(score) {
    if (score > 0) fetch("https://www.olt.tokyo:8443/Score/set?pass=rank&name=" + name + "&score=" + score);
}
