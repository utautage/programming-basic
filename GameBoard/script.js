document.addEventListener("DOMContentLoaded", () => {
    const timer = document.getElementById("timer");
    const button = document.getElementById("btn");
    const message = document.getElementById("msg");
    let cards;
    let intervalId = -1;
    let remainingMillisec;
    function endGame(text) {
        clearInterval(intervalId);
        intervalId = -1;
        message.innerHTML = text;
        button.removeAttribute("disabled");
        timer.innerHTML = "0msec";
    }
    function updateMessage() {
        remainingMillisec -= 11;
        if (remainingMillisec <= 0) {
            endGame("Timer Expired");
            return;
        }
        timer.innerHTML = `${remainingMillisec}msec`;
    }
    function startGame() {
        if (intervalId !== -1) return;
        cards = [];
        for (let index = 0; index < 5; index++) {
            let suit = Math.floor(4 * Math.random());
            let number;
            do {
                number = Math.floor(13 * Math.random()) + 1;
            } while (cards.includes(number));
            cards.push(number);
            const element = document.getElementById(`card${index}`);
            element.removeChild(element.firstChild);
            const image = document.createElement("img");
            image.setAttribute("src", `cards/${"123456789tjqk".charAt(number - 1)}${"dchs".charAt(suit)}.gif`);
            element.appendChild(image);
        }
        button.setAttribute("disabled", "true");
        remainingMillisec = 4000;
        intervalId = setInterval(updateMessage, 11);
    }
    function hasFlipped(index) {
        if (intervalId === -1 || cards === undefined || cards[index] === 0) return false;
        let min = 14;
        cards.forEach((number) => {
            if (number !== 0 && min > number) min = number;
        });
        if (min !== cards[index]) return false;
        cards[index] = 0;
        return true;
    }
    function clickedCard(_) {
        const element = _.currentTarget;
        const index = parseInt(element.id.charAt(4));
        if (hasFlipped(index)) {
            element.removeChild(element.firstChild);
            const image = document.createElement("img");
            image.setAttribute("src", "cards/xx.gif");
            element.appendChild(image);
            if (cards.every((number) => number === 0) && remainingMillisec > 0) {
                endGame(`Clear Score=${remainingMillisec}`);
                sendScore(remainingMillisec);
            }
        }
    }
    button.addEventListener("click", startGame);
    for (let index = 0; index < 5; index++) document.getElementById(`card${index}`).addEventListener("click", clickedCard);
});
