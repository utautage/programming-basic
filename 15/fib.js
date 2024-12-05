function fib(n) {
    if (n <= 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
function myfib(n) {
    const a = [3, 4, 4, 5, 4, 5, 5, 6];
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        console.log("Step=" + i);
        self.postMessage({ status: 1, step: i });
        result += fib(n - a[i]);
    }
    self.postMessage({ status: 2, answer: result });
}
self.addEventListener("message", (e) => myfib(e.data.n));
