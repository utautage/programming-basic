const txt = document.getElementById("txt_id");
const btn = document.getElementById("btn_id");
const lbl = document.getElementById("lbl_id");
const lbl2 = document.getElementById("lbl2_id");
const pgb = document.getElementById("pgb_id");
let worker = null;
btn.addEventListener("click", async () => {
    console.log("start");
    if (worker !== null) {
        worker.terminate();
        worker = null;
        console.log("calceled");
        pgb.value = 0;
        return;
    }
    let n = parseInt(txt.value);
    worker = new Worker("./fib.js");
    worker.postMessage({ n: n });
    lbl.innerHTML = "Start";
    pgb.max = 8;
    worker.addEventListener("message", (e) => {
        if (e.data.status === 1) {
            lbl.innerHTML = "step=" + e.data.step;
            pgb.value = e.data.step + 1;
        } else {
            lbl.innerHTML = "answer=" + e.data.answer;
            pgb.value = 0;
        }
    });
});
