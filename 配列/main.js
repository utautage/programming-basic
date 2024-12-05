{
    let a = [1, 2];
    a[1] = 4; //上書き
    a[3] = 2; //追加
    for (let i = 0; i < a.length; i++) {
        document.write(a[i] + "<br>");
    }
}
{
    const a = [];
    for (let i = 0; i < 10; i++) {
        a.push(i * 10);
    }
    a[4] = -4;
    for (let i = 0; i < a.length; i++) {
        document.write(a[i], "<br>");
    }
}
{
    let a = [];
    a.push(1);
    a.push("Hello");
    a.push([1, 2, 3]);
    a.push(1.5);
    for (let i = 0; i < a.length; i++) {
        document.write(a[i], "<br>");
    }
}
{
    let a = [];
    a[0] = [];
    a[1] = [];
    a[0].push(11);
    a[0].push(12);
    a[0].push(13);
    a[1].push(21);
    a[1].push(22);
    a[1].push(33);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[i].length; j++) {
            document.write(a[i][j], " ");
        }
        document.write("<br>");
    }
    for (let i = 0; i < 10; i++) {
        a.push(i * 10);
    }
    for (let i = 0; i < a.length; i++) {
        document.write(a[i], "<br>");
    }
}
{
    let a = ["Fukui", "Sabae", "Echizen", "Sakai", "Ohno"];
    function disp1(n) {
        //1 種類目の関数の書き方（昔からある書き方）
        document.write("<h1>", n, "</h1>");
    }
    const disp = (n) => {
        //２種類目の関数の書き方（ラムダ式）
        document.write(n, "<br>");
    };
    disp(a.length);
    disp(Array.isArray(a));
    disp(a);
    disp(a[1]);
    const s = a.toString();
    disp(typeof s);
    disp(s);
    disp(s[1]);
    let b = a.slice(1);
    disp(b);
    disp(a);
    b = a.slice(1, 3);
    disp(b);
    disp("-------------");
    b = a.splice(1, 3); //slice ではないので注意
    disp(b);
    disp(a);
    a = a.concat(b);
    disp(a);
    disp("-------------");
    a.reverse();
    disp(a);
    a.sort();
    disp1(a);
    a.sort(function (a, b) {
        return b.length - a.length;
    });
    disp1(a);
    //ループカウンタ付きループ（復習）
    for (let i = 0; i < a.length; i++) {
        disp(a[i]);
    }
    disp("-------------");
    //ループカウンタ無しループ
    for (e of a) {
        disp(e);
    }
}
{
    const disp = function (n) {
        //3 種類目 代入
        document.write(n, "<br>");
    };
    let a = ["Fukui", "Sabae", "Echizen", "Sakai", "Ohno"];
    a.push("Mikuni");
    disp(a);
    let b = a.pop();
    disp(b);
    disp(a);
    b = a.shift();
    disp(b);
    b = a.shift();
    disp(b);
    disp(a);
    a.unshift("Obama");
    disp(a);
}
{
    const disp = (i, n) => {
        document.write("<h2>", i, ":", n, "</h2>");
    };
    const a = [80, 20, 40, 10, 60, 90, 75, 100];
    disp(a);
    let b = a.sort();
    disp(1, b);
    b = a.sort((n, m) => n - m);
    disp("1'", b); //何がよくない？
    b = b.reverse();
    disp(2, b);
    b = a.sort((n, m) => m - n);
    disp("2'", b);
    //ここ重要 8 行目と10 行目をひとまとめにできる
    b = a.sort((n, m) => n - m).reverse();
    disp("2''", b);
}
{
    const disp = (i, n) => {
        document.write("<h2>", i, ":", n, "</h2>");
    };
    const a = [80, 20, 40, 10, 60, 90, 75, 100];
    disp(
        1,
        a.filter((v) => v >= 60)
    );
    const gpa = (n) => {
        if (n >= 90) return 4;
        if (n >= 80) return 3;
        if (n >= 70) return 2;
        if (n >= 60) return 1;
        return 0;
    };
    disp(
        2,
        a.map((n) => gpa(n))
    );
    disp(3, a.map(gpa)); //これでもよい
}
{
    const a = [80, 20, 40, 10, 60, 90, 75, 100];
    document.write(a.filter((n) => n < 60).length);
}
{
    const a = [80, 20, 40, 10, 60, 90, 75, 100];
    const gpa = (n) => {
        if (n >= 90) return 4;
        if (n >= 80) return 3;
        if (n >= 70) return 2;
        if (n >= 60) return 1;
        return 0;
    };
    document.write(
        a
            .sort((m, n) => n - m)
            .slice(0, 3)
            .map(gpa)
    );
}