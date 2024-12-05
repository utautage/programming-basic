// {
//     const MyClass = class {
//         constructor(x, y) {
//             /* コンストラクタ */
//             this.x = x;
//             this.y = y;
//         }
//         calc() {
//             /* メソッド */
//             return this.x + this.y; /* x と y を足した値を返却する */
//         }
//     };
//     let class1 = new MyClass(5, 6);
//     console.log(class1.calc());
// }
const suits = [String.fromCharCode(0x2663), String.fromCharCode(0x2660), String.fromCharCode(0x2666), String.fromCharCode(0x2665)];
class PlayingCard {
    constructor(st, num) {
        this.suit = st;
        this.number = num;
        this.faceup = true;
    }
    toString() {
        if (!this.faceup) return "* ";
        let num;
        switch (this.number) {
            case 1:
                num = "A";
                break;
            case 10:
                num = "T";
                break;
            case 11:
                num = "J";
                break;
            case 12:
                num = "Q";
                break;
            case 13:
                num = "K";
                break;
            default:
                num = this.number;
        }
        return this.suit + num;
    }
}
class Deck {
    constructor(joker = true) {
        this.cards = [];
        for (let suit = 0; suit < suits.length; suit++) for (let num = 1; num <= 13; num++) this.cards.push(new PlayingCard(suits[suit], num));
        if (joker) this.cards.push(new PlayingCard("X", 0)); //Joker
    }
    show() {
        let mesg = "",
            i = 0;
        for (; i < this.cards.length; i++) mesg += this.cards[i] + " ";
        console.log(i + "枚 " + mesg);
    }
    shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            //0からすべてのカードを順にみてゆく
            //0以上53未満の整数をランダムに発生させる
            let a = Math.floor(Math.random() * this.cards.length),
                card = this.cards[i]; //クラス内プロパティを参照する場合thisを付加
            //i番目とa番目のカードを入れ替える
            this.cards[i] = this.cards[a];
            this.cards[a] = card;
        }
    }
    draw() {
        return this.cards.shift();
    }
    back(card) {
        this.cards.push(card);
    }
}
class Hand {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }
    add(card) {
        this.cards.push(card);
    }
    length() {
        return this.cards.length;
    }
    draw() {
        return this.length() === 0 ? null : this.cards.shift();
    }
    show() {
        let mesg = "",
            i = 0;
        for (; i < this.length(); i++) mesg += this.cards[i].toString() + " ";
        console.log("Name:" + this.name + " " + i + "枚 " + mesg);
    }
    draw(n) {
        if (n >= this.length()) return null;
        let cut = this.cards.splice(n, 1); //cutは要素を1つだけ含む配列
        return cut[0]; //cut 要素である切り取ったカードを返す bug fix;
    }
}
class GameOldLady {
    constructor(persons) {
        this.persons = persons;
        this.deck = new Deck();
        this.hands = [];
        this.rank = [];
        for (let i = 0; i < persons; i++) this.hands.push(new Hand("player" + i)); //for
    } //constructor
    setup() {
        this.deck.shuffle();
        for (let i = 0; ; i++) {
            let card = this.deck.draw();
            if (card === undefined) break;
            card.faceup = false;
            i %= this.persons;
            this.hands[i].add(card);
        }
    }
    cleanup() {
        for (let i = 0; i < this.persons; i++) {
            for (;;) {
                let card = this.hands[i].draw(0);
                if (card === null) break;
                this.deck.back(card);
            }
        }
    }
    check(n) {
        //手札の中で重複する数字があればその2枚をdeckに戻す
        if (this.persons <= n) return -1; //パラメータチェック
        //記述を簡易にするために対象の手札を指す変数myを宣言する
        let my = this.hands[n];
        let length = my.length();
        for (let i = 0; i < length; ) {
            //i番目とj番目の札の数値を比較する
            let j = i + 1;
            for (; j < length; j++) {
                if (my.cards[i].number === my.cards[j].number) {
                    //一致
                    this.deck.back(my.draw(j)); //iを先に引いてはならない
                    this.deck.back(my.draw(i)); //それはなぜか？
                    break;
                }
            }
            if (j === length) i++; //jが端まで走り切った。breakしなかった、i番目と一致するカードはなかった。その時に限りiを進める
            else length = my.length(); //breakしたのでカードは減っているはず,length更新。iは据え置き
        }
        return length;
    }
    game() {
        this.setup();
        for (let i = 0; i < this.persons; i++) {
            this.hands[i].show();
            this.check(i);
            this.hands[i].show();
        }
        //console.log("START");
        let j;
        for (let i = 0; ; i++) {
            i %= this.persons;
            if (this.hands[i].length() === 0) continue; //iは上がっている
            for (j = i + 1; i !== j; j++) {
                //引く相手を決める
                j %= this.persons;
                //jは残りカードあり
                if (this.hands[j].length() > 0) break;
            }
            //次プレイヤーはj
            if (i === j) {
                //自分自身ならゲーム終了
                //console.log("The last player is player" + i);
                this.rank.push(i);
                break;
            }
            let a; //これを忘れないように注意
            if (i === 0) {
                for (let k = 0; k < this.hands[0].length(); k++) this.hands[0].cards[k].faceup = true;
                for (let k = 0; k < this.persons; k++) this.hands[k].show();
                for (let k = 0; k < this.hands[0].length(); k++) this.hands[0].cards[k].faceup = false;
                let input = prompt("player" + j + " から１枚引きます 0-" + (this.hands[j].length() - 1));
                a = parseInt(input, 10);
                if (isNaN(a) || a > this.hands[j].length() - 1) a = 0;
                console.log(a + "枚目のカードを引きます");
            } else {
                //console.log("draw from " + j + " to " + i);
                //jの枚数の乱数を発生する
                a = Math.floor(Math.random() * this.hands[j].length());
            }
            //jのランダム位置から一枚引く
            let card = this.hands[j].draw(a);
            //console.log("card=" + card); //for debug
            //jの枚数を更新
            if (this.hands[j].length() === 0) {
                //console.log("player" + j + " went out"); //あがり
                this.rank.push(j);
            }
            this.hands[j].show(); //for debug
            //iに加える
            this.hands[i].add(card);
            //iのチェックと枚数更新
            this.hands[i].show();
            this.check(i);
            if (this.hands[i].length() === 0) {
                //console.log("player" + i + " went out"); //あがり
                this.rank.push(i);
            }
            this.hands[i].show();
        } //ここまで(44)
        console.log(this.rank);
        console.log("END");
        game.cleanup();
    }
} //class
//=====================================BlackJack
const BlackJack = class {
    constructor() {
        this.deck = new Deck(false);
        this.hands = [];
        this.hands[0] = new Hand("Player");
        this.hands[1] = new Hand("Dealer");
    }
    cleanup() {
        for (let i = 0; i < 2; i++) {
            for (;;) {
                let card = this.hands[i].draw(0);
                if (card === null) break;
                card.faceup = true;
                this.deck.back(card);
            }
        }
    }
    setup() {
        this.deck.shuffle();
        //Player
        let card = this.deck.draw();
        this.hands[0].add(card);
        card = this.deck.draw();
        this.hands[0].add(card);
        //Dealer
        card = this.deck.draw();
        this.hands[1].add(card);
        card = this.deck.draw();
        this.hands[1].add(card);
        card.faceup = false;
    }
    getScore(n) {
        let score = 0,
            ace = 0;
        for (let k = 0; k < this.hands[n].length(); k++) {
            if (this.hands[n].cards[k].number > 10) score += 10;
            else if (this.hands[n].cards[k].number === 1) {
                ace++;
                score++;
            } else score += this.hands[n].cards[k].number;
        }
        if (ace != 0 && score < 12) score += 10;
        return score;
    }
    test() {
        this.cleanup();
        this.setup();
        this.hands[0].add(this.deck.draw());
        this.showScore(0);
    }
    showScore(n) {
        let mesg = "",
            i;
        for (i = 0; i < this.hands[n].length(); i++) mesg += this.hands[n].cards[i].toString() + " ";
        console.log("Name:" + this.hands[n].name + " " + this.hands[n].length() + "枚 " + mesg + "(" + this.getScore(n) + ")");
    }
    oneGame() {
        this.cleanup();
        this.setup();
        this.hands[1].show();
        for (;;) {
            this.showScore(0);
            if (this.getScore(0) > 21) return -1; //Loose
            let input = prompt("hit, Stay or quit?");
            if (input === null || input.startsWith("q")) return 2;
            else if (input.startsWith("h")) {
                let card = this.deck.draw();
                card.faceup = true;
                this.hands[0].add(card);
                continue;
            } else break;
        } //Playerターンの無限ループ終了
        this.hands[1].cards[1].faceup = true;
        for (;;) {
            this.showScore(1);
            if (this.getScore(1) > 21) return 1; //WIN
            else if (this.getScore(0) < this.getScore(1)) return -1; //Loose
            else if (this.getScore(0) === this.getScore(1)) return 0; //Even
            const startTime = Date.now();
            while (Date.now() - startTime < 1500);
            let card = this.deck.draw();
            card.faceup = true;
            this.hands[1].add(card);
        }
    } //oneGame()の終了括弧
    game(initCoins) {
        let coins = initCoins;
        for (;;) {
            let input = prompt("Bet, you have " + coins + " coins");
            if (input === null || input.startsWith("q")) return coins;
            let bet = parseInt(input, 10);
            if (isNaN(bet) || bet < 0) bet = 1;
            if (bet > coins) continue;
            switch (this.oneGame()) {
                case 1:
                    console.log("WIN");
                    coins += bet;
                    break;
                case -1:
                    console.log("Loose");
                    coins -= bet;
                    break;
                case 0:
                    console.log("Even");
                    break;
                default:
                    console.log("Quit");
                    return coins;
            }
        }
    }
};
// let deck = new Deck();
// deck.show();
// deck.shuffle();
// deck.show();
// let card = deck.draw();
// console.log(card.toString());
// deck.show();
// deck.back(card);
// deck.show();
// let hands = [];
// for (let k = 0; k < 5; k++) {
//     hands.push(deck.draw());
// }
// for (let k = 0; k < 5; k++) {
//     console.log(hands[k].toString());
// }
// deck.show();
// for (k = 4; k >= 0; k--) {
//     deck.back(hands.pop());
// }
// deck.show();
// let hand = new Hand("you");
// hand.add(new PlayingCard(suits[0], 1));
// hand.add(new PlayingCard(suits[1], 2));
// hand.add(new PlayingCard(suits[2], 10));
// hand.add(new PlayingCard(suits[3], 11));
// hand.show();
// let card = hand.draw(2);
// console.log(card.toString());
// hand.show();
// for (let i = 0; i < players; i++) {
//     hands[i].show();
// }
// deck.show();
// game.deck.show();
// game.cleanup();
// game.deck.show();
let game = new GameOldLady(5);
game.game();
// let game = new BlackJack(),
//     coins = 10;
// console.log("Welcome, You have " + coins + " coins");
// coins=game.game(coins);
// console.log("Byebye, You have " + coins + " coins");