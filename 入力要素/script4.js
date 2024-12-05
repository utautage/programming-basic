document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.getElementById("button");
    const result = document.getElementById("result");
    const name = document.getElementById("name");
    const departments = document.getElementsByName("department");
    const grades = document.getElementsByName("grade");
    const favoriteSubjects = document.getElementsByName("favoriteSubject");
    //----------
    const cities = {
        Fukui: {
            name: "福井県",
            cities: [
                { name: "福井市", value: "Fukui" },
                { name: "鯖江市", value: "Sabae" },
                { name: "坂井市", value: "Sakai" },
            ],
        },
        Ishikawa: {
            name: "石川県",
            cities: [
                { name: "金沢市", value: "Kanazawa" },
                { name: "加賀市", value: "Kaga" },
            ],
        },
    };
    const parent = document.getElementById("form");
    const keys = Object.keys(cities);
    parent.appendChild(document.createElement("br"));
    keys.forEach((element) => {
        const radio = document.createElement("input");
        const label = document.createElement("label");
        radio.setAttribute("type", "radio");
        radio.setAttribute("value", element);
        radio.setAttribute("name", "pref");
        label.innerHTML = cities[element].name;
        parent.appendChild(radio);
        parent.appendChild(label);
        parent.appendChild(document.createElement("br"));
    });
    const prefs = document.getElementsByName("pref");
    const sel_cities = document.createElement("select");
    sel_cities.setAttribute("id", "cities");
    parent.appendChild(sel_cities);
    parent.appendChild(document.createElement("br"));
    const button2 = document.createElement("input");
    button2.setAttribute("id", "btn_2");
    button2.setAttribute("type", "button");
    button2.setAttribute("value", "ボタン");
    parent.appendChild(button2);
    function setCities(prefName) {
        while (sel_cities.lastChild) {
            sel_cities.removeChild(sel_cities.lastChild);
        }
        cities[prefName].cities.forEach((element, index) => {
            let option = document.createElement("option");
            option.text = element.name;
            option.value = element.value;
            sel_cities.appendChild(option);
            option.selected = index === 0;
        });
    }
    for (let i = 0; i < prefs.length; i++) {
        prefs[i].addEventListener("change", function () {
            //this(=選択されたエレメント）を使いたいならfunction
            setCities(this.value);
        });
    }
    //----------
    button1.addEventListener("click", () => {
        let checkedDepartment = Array.from(departments).find((element) => element.checked);
        let checkedGrade = Array.from(grades).find((element) => element.checked);
        result.innerHTML =
            "あなたの名前は" +
            name.value +
            "<br>学科:" +
            (checkedDepartment === undefined ? "N/A" : checkedDepartment.value) +
            " 学年:" +
            (checkedGrade === undefined ? "N/A" : checkedGrade.value) +
            "<br>好きな科目は" +
            Array.from(favoriteSubjects)
                .filter((element) => element.checked)
                .map((element) => element.value)
                .join(",");
    });
    button2.addEventListener("click", () => {
        let p2 = document.getElementById("p2");
        if (p2 != null) {
            p2.remove();
        }
        p2 = document.createElement("p");
        p2.id = "p2";
        p2.innerHTML = "あなたの居住地は";
        for (let i = 0; i < prefs.length; i++) {
            if (prefs[i].checked == true) {
                p2.innerHTML += prefs[i].value + "県";
                break;
            }
        }
        for (let i = 0; i < sel_cities.options.length; i++) {
            if (sel_cities.options[i].selected == true) {
                p2.innerHTML += sel_cities.options[i].value + "市";
                break;
            }
        }
        document.getElementById("form").appendChild(p2);
    });
    setCities("Fukui");
    prefs.item(0).checked = true;
});
