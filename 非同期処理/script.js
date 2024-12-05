const txt = document.getElementById("txt_id");
const btn = document.getElementById("btn_id");
const lbl = document.getElementById("lbl_id");
const lbl2 = document.getElementById("lbl2_id");
const pgb = document.getElementById("pgb_id");
function fib(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
{
    let run_flag = 0;
    async function myfib(n) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        const a = [3, 4, 4, 5, 4, 5, 5, 6];
        pgb.max = a.length;
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            if (run_flag === 0) return -1;
            console.log("loop " + i);
            lbl.innerHTML = "loop=" + i;
            pgb.value = i + 1;
            await new Promise((resolve) => setTimeout(resolve, 1));
            result += fib(n - a[i]);
        }
        return result;
    }
    btn.addEventListener("click", async () => {
        if (run_flag === 1) {
            run_flag = 0;
            return;
        }
        run_flag = 1;
        console.log("start");
        lbl2.innerHTML = "";
        let n = parseInt(txt.value);
        lbl.innerHTML = "Hello";
        myfib(n).then(n => {
            lbl2.innerHTML = "result=" + n;
            run_flag = 0;
        });
        console.log("end");
    });
}
