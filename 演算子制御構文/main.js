// const a = 0b1100;
// document.write(a, "<br>");
// const b = 0xc;
// document.write(b, "<br>");
// const c = 12;
// document.write(c, "<br>");

// const x = 30; //xの値を書き換えで制御の分岐先が異なることを確認してください。
// if (x <= 10) {
//     document.write("x<=10<br>");
// } else if (x >= 20) {
//     document.write("x<=20<br>");
// } else {
//     document.write("else<br>");
// }

// const s = "Test"; //s の値を書き換えで制御の分岐先が異なることを確認してください。
// switch (s) {
//     case "Test":
//         document.write("s is Test<br>");
//         break;
//     case "Hello":
//         document.write("s is Hello<br>");
//     case "Thank you":
//         document.write("s is Thank you<br>");
//         break;
//     default:
//         document.write("s is default<br>");
// }

// const animals = ["パンダ", "キリン", "熊", "犬"];
// document.write(animals[0], "<br>");
// document.write(animals[1], "<br>");
// document.write(animals[2], "<br>");
// document.write(animals[3], "<br>");
// document.write(animals[4], "<br>");

// const animals = ["パンダ", "キリン", "熊", "犬"];
// for (let i = 0; i < 4; i++) {
//     document.write(i + ":" + animals[i], "<br>");
// }
// document.write("i=", i, "<br>");

// const animals = ["パンダ", "キリン", "熊", "犬"];
// let i = 0;
// while (i < 4) {
//     document.write(animals[i++], "<br>");
// }
// document.write("i=", i, "<br>");

// const animals = ["パンダ", "キリン", "熊", "犬"];
// let i = 0;
// do {
//     document.write(animals[i++], "<br>");
// } while (i < 4);

// const animals = ["パンダ", "キリン", "熊", "犬"];
// for (a of animals) document.write(a, "<br>");

// const animals = ["パンダ", "キリン", "熊", "犬"];
// animals.forEach((a) => {document.write(a, "<br>");});

// for (let i = 0; i < 10; i++) {
//     if (i == 5) {
//         break;
//     }
//     document.write(i, "<br>");
// }

// for (let i = 0; i < 10; i++) {
//     if (i == 5) {
//         continue;
//     }
//     document.write(i, "<br>");
// }

// for (let i = 0; i < 10; i++) {
//     for (let k = 0; k < 10; k++) {
//         document.write(i * k + " ");
//     }
//     document.write("<br>");
// }

// for (let i = 0; i < 10; i++) {
//     for (let k = 0; k < 10; k++) {
//         if (i * k > 30) break;
//         document.write(i * k + " ");
//     }
//     document.write("<br>");
// }

// kuku: for (let i = 0; i < 10; i++) {
//     for (let k = 0; k < 10; k++) {
//         if (i * k > 30) break kuku;
//         document.write(i * k + " ");
//     }
//     document.write("<br>");
// }

// let i;
// let j;
// let line;
// for (i = 1; i < 10; i++) {
//     line = "";
//     for (j = 1; j < 10; j++) {
//         line += ("  " + i * j).slice(-3);
//     }
//     console.log(line);
// }

let prime = []; //配列の初期化
const MAX = 100;
for (let i = 0; i < MAX; i++) {
    prime.push(true); //boolean型のtrueを値に持つ100個の要素を追加
}
//prime[n]がtrueなら、nは素数であるとします
prime[0] = false; //0は素数ではない
prime[1] = false; //1は素数ではない
//ここから素数でないnについてprime[n]=falseを代入してゆきます
for (let i = 0; i < MAX; i++) {
    if (prime[i] === false) {
        continue; //iが素数ならcontinue
    }
    //iは素数です。Iの倍数にfalseを代入してください。
    //ここから自力開発してください
    for (let I = 2; i * I < MAX; I++) {
        prime[i * I] = false;
    }
    //ここまで
}
for (let i = 0; i < MAX; i++) {
    if (prime[i] === true) document.write(i, "<br>");
}