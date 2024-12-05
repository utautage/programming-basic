document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("button");
    const result = document.getElementById("result");
    const txt = document.getElementById("name");
    const deps = document.getElementsByName("department");
    const grads = document.getElementsByName("grade");
    const subjs = document.getElementsByName("favoriteSubject");
    btn.addEventListener("click", () => {
        result.innerHTML = "あなたの名前は" + txt.value + "<br>";
        let mydep = "N/A";
        for (let i = 0; len = deps.length; i++) {
            if (deps[i].checked == true) {
                mydep = deps[i].value;
                break;
            }
        }
        let mygrad = "N/A";
        for (let i = 0; len = grads.length; i++) {
            if (grads[i].checked == true) {
                mygrad = grads[i].value;
                break;
            }
        }
        result.innerHTML = "あなたの名前は" + txt.value + "<br>";
        result.innerHTML += "学科:" + mydep;
        result.innerHTML += " 学年:" + mygrad + "<br>";
        result.innerHTML += " 好きな科目は:";
        for (let i = 0; i < subjs.length; i++) {
            if (subjs[i].checked == true) {
                result.innerHTML += subjs[i].value;
            }
        }
    });
    txt.value = "仮の名前";
    deps[0].checked = true;
    grads[0].checked = true;
    //----------------------------------------------------
    const cityList = {
        "Fukui": { "name": "福井県", "cities": [{ "name": "福井市", "value": "Fukui" }, { "name": "鯖江市", "value": "Sabae" }, { "name": "坂井市", "value": "Sakai" }] },
        "Ishikawa": { "name": "石川県", "cities": [{ "name": "金沢市", "value": "Kanazawa" }, { "name": "加賀市", "value": "Kaga" }] },
        "Shiga": { "name": "滋賀県", "cities": [{ "name": "大津市", "value": "Kanazawa" }, { "name": "彦根市", "value": "Kaga" }, { "name": "近江八幡市", "value": "Omihachiman" }] },
    };
    const parent = document.getElementById("form");
    const keys = Object.keys(cityList);
    parent.appendChild(document.createElement('br'));
    for (let i = 0; i < keys.length; i++) {
        const radio = document.createElement("input");
        const label = document.createElement('label');
        radio.setAttribute("type", "radio");
        radio.setAttribute("value", keys[i]);
        radio.setAttribute("name", "pref");
        label.innerHTML = cityList[keys[i]].name;
        parent.appendChild(radio);
        parent.appendChild(label);
        parent.appendChild(document.createElement('br'));
    };
    const prefs = document.getElementsByName("pref");
    const sel_cities = document.createElement("select");
    sel_cities.setAttribute("id", "cities");
    parent.appendChild(sel_cities);
    parent.appendChild(document.createElement('br'));
    const btn2 = document.createElement("input");
    btn2.setAttribute("id", "btn_2");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("value", "ボタン");
    parent.appendChild(btn2);
    const setCities = (prefName) => {
        while (sel_cities.lastChild) {
            sel_cities.removeChild(sel_cities.lastChild);
        }
        for (let i = 0; i < cityList[prefName].cities.length; i++) {
            let opt = document.createElement("option");
            opt.text = cityList[prefName].cities[i].name;
            opt.value = cityList[prefName].cities[i].value;
            sel_cities.appendChild(opt);
            if (i == 0) {
                opt.selected = true;
            }
        }
    };
    for (let i = 0; i < prefs.length; i++) {
        prefs[i].addEventListener("change", function () {//this(=選択されたエレメント）を使いたいならfunction
            setCities(this.value);
        });
    }
    btn2.addEventListener("click", () => {
        let p2 = document.getElementById("p2");
        if (p2 != null) {
            p2.remove();
        }
        p2 = document.createElement("p");
        p2.id = "p2";
        p2.innerHTML = "あなたの居住地は";
        for (let i = 0; i < prefs.length; i++) {
            if (prefs[i].checked == true) {
                p2.innerHTML += (prefs[i].value + "県");
                break;
            }
        }
        for (let i = 0; i < sel_cities.options.length; i++) {
            if (sel_cities.options[i].selected == true) {
                p2.innerHTML += (sel_cities.options[i].value + "市");
                break;
            }
        }
        document.getElementById("form").appendChild(p2);
    });
    setCities("Fukui");
    prefs.item(0).checked = true;

});
