// BEFORE START
let select_monkey = 1;
let toggle_iwazaru = false;
let toggle_timeout = false;

const count = document.querySelector("#count");
count.innerHTML = 3;
count.style.animation = "blockbuster 0.1s linear";

setTimeout(() => {
    count.style.animation = "none";
}, 100);

setTimeout(() => {
    count.innerHTML = 2;
    count.style.animation = "blockbuster 0.1s linear";
}, 1000);

setTimeout(() => {
    count.style.animation = "none";
}, 1100);

setTimeout(() => {
    count.innerHTML = 1;
    count.style.animation = "blockbuster 0.1s linear";
}, 2000);

setTimeout(() => {
    count.style.animation = "none";
}, 2100);

setTimeout(() => {
    count.style.opacity = 0;
}, 3000);

setTimeout(() => {
    toggle_iwazaru = true;
    toggle_timeout = true;
}, 3000);


// P5
const IWAZARUS = [];
const VIRUSES = [];
const VIRUSES_MAX = 5;

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_iwazaru();
}

function init_iwazaru() {
    IWAZARUS.length = 0;
    const _iwazaru = new IWAZARU({ x: width / 2, y: height / 2 }, 200, VIRUSES);
    IWAZARUS.push(_iwazaru);
}

function draw() {
    clear();
    draw_fields();
    draw_monkeys();

    if (toggle_iwazaru) {
        draw_viruses();
    }

    if (toggle_timeout) {
        update_viruses();
    }
}

function update_viruses() {
    if (VIRUSES.length < VIRUSES_MAX) {
        let center_x, center_y;

        const _random = Math.floor(Math.random() * 4);
        if (_random === 0) {
            center_x = random(0.0, width);
            center_y = 0.0;
        }

        if (_random === 1) {
            center_x = 0.0
            center_y = random(0.0, height);
        }

        if (_random === 2) {
            center_x = window.innerWidth
            center_y = random(0.0, height);
        }

        if (_random === 3) {
            center_x = random(0.0, width);
            center_y = window.innerHeight;
        }

        const _virus = new VIRUS({ x: center_x, y: center_y }, random(20.0, 40.0), { r: random(0, 255), g: random(0, 255), b: random(0, 255) }, 50.0);
        VIRUSES.push(_virus);
    }

    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].update_center();

        if (VIRUSES[i].life <= 0) {
            VIRUSES.splice(i, 1);

            const score = document.querySelector("#score");
            var value = Number(score.innerHTML);
            value += 10;

            score.innerHTML = value;
        } else if (VIRUSES[i].attack === true) {
            VIRUSES.splice(i, 1);
            const life = document.querySelector("#life");
            var value = Number(life.innerHTML);
            value--;

            life.innerHTML = value;

            const damaged = document.querySelector("#damaged");
            damaged.style.opacity = 0.5;

            const p5_background = document.querySelector("#p5-background");
            p5_background.classList.add("awake");

            this.attack = true;

            setTimeout(() => {
                damaged.style.opacity = 0;
            }, 100);

            setTimeout(() => {
                p5_background.classList.remove("awake");
            }, 400);

            var value = Number(life.innerHTML);
            console.log(value);
            if (value === 0) {
                const app = document.querySelector("#app");
                app.style.opacity = 0;

                const score = document.querySelector("#score").innerText;
                sessionStorage.setItem("score", score );

                setTimeout(() => {
                    const message_gameover = document.querySelector("#message-gameover");
                    message_gameover.style.opacity = 1;
                }, 500);

                setTimeout(() => {
                    window.location.href = "score.html";
                }, 3500);
            }
        }
    }

    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].update_attack();
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    init_iwazaru();
}

function draw_fields() {
    background(30);

    if (toggle_iwazaru) {
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, width, height);
    }
}

function draw_monkeys() {
    draw_iwazaru();
}


function draw_viruses() {
    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].draw();
    }
}

function draw_iwazaru() {
    if (toggle_iwazaru) {
        for (let i = 0; i < IWAZARUS.length; i++) {
            IWAZARUS[i].mode = false;
        }
    } else {
        for (let i = 0; i < IWAZARUS.length; i++) {
            IWAZARUS[i].mode = true;
        }
    }

    for (let i = 0; i < IWAZARUS.length; i++) {
        IWAZARUS[i].draw();
    }
}


// speech
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// 인스턴스 생성
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "ko-KR";
recognition.continuous = true;
recognition.maxAlternatives = 10000;

let speechToText = "";
recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;
    console.log(transcript);
    for (let i = 0; i < VIRUSES.length; i++) {
        const text = VIRUSES[i].set_text;
        if (transcript.indexOf(text) > -1) {
            if (VIRUSES[i].life > 0) {
                VIRUSES[i].calc_life();
                VIRUSES[i].maintain_toggle_collision();
            }
        }
    }
    if (e.results[i].isFinal) {
      speechToText += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
});

recognition.addEventListener("end", recognition.start);
recognition.start();