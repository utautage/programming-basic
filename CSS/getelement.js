window.addEventListener("DOMContentLoaded", () => {
    const tag_elements = document.getElementsByTagName("div");
    const class_elements = document.getElementsByClassName("zenhan");
    const bottom_element = document.getElementById("bottom");
    const tag_elementsArray = Array.from(tag_elements);
    tag_elementsArray.forEach(element => {
        element.style = "color:blue";
    });
    const class_elementsArray = Array.from(class_elements);
    class_elementsArray.forEach(element => {
        element.style = "background-color:beige;color:black";
    });
    bottom_element.innerText = "2年生";
    const top_element = document.getElementById("top");
    top_element.addEventListener("mouseover", () => {
        top_element.style = "background-color:pink";
    });
    top_element.addEventListener("mouseout", () => {
        top_element.style = "background-color:beige";
    });
    top_element.addEventListener("click", () => {
        window.open("https://www.fukui-nct.ac.jp/");
    });
});