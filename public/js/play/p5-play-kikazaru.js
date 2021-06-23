// SPEAK WORD
var synth = window.speechSynthesis;
var voiceSelect = document.querySelector('select');
var voices = [];

function populateVoiceList() {
    voices = synth.getVoices().sort(function(a, b) {
        const aname = a.name.toUpperCase(),
            bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for (let i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if (voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', "ko-KR" /* voices[i].lang */ );
        option.setAttribute('data-name', "ko-KR" /* voices[i].name */ );
        voiceSelect.appendChild(option);
    }
    voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(_word) {
    // console.log(_word);

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    var utterThis = new SpeechSynthesisUtterance(_word);
    utterThis.onend = function(event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function(event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
            break;
        }
    }

    utterThis.pitch = 1; // pitch.value;
    utterThis.rate = 1; // rate.value;
    synth.speak(utterThis);
}

// BEFORE START
let select_monkey = 1;
let toggle_kikazaru = false;
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
    toggle_kikazaru = true;
    toggle_timeout = true;
}, 3000);


// P5
const KIKAZARUS = [];
const VIRUSES = [];
const VIRUSES_MAX = 1;

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_kikazaru();
}

function init_kikazaru() {
    KIKAZARUS.length = 0;
    const _kikazaru = new KIKAZARU({ x: width / 2, y: height / 2 }, 200, VIRUSES);
    KIKAZARUS.push(_kikazaru);
}

function draw() {
    clear();
    draw_fields();
    draw_monkeys();

    if (toggle_kikazaru) {
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

        const _virus = new VIRUS({ x: center_x, y: center_y }, random(100.0, 200.0), { r: random(0, 255), g: random(0, 255), b: random(0, 255) }, 50.0);
        speak(_virus.set_text);
        VIRUSES.push(_virus);
    } else {

    }

    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].update_center();

        if (VIRUSES[i].life <= 0) {
            const score = document.querySelector("#score");
            var value = Number(score.innerHTML);
            value += 10;

            score.innerHTML = value;

            VIRUSES.splice(i, 1);
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
    init_kikazaru();
}

function draw_fields() {
    background(30);

    if (toggle_kikazaru) {
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, width, height);
    }
}

function draw_monkeys() {
    draw_kikazaru();
}


function draw_viruses() {
    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].draw();
    }
}

function draw_kikazaru() {
    if (toggle_kikazaru) {
        for (let i = 0; i < KIKAZARUS.length; i++) {
            KIKAZARUS[i].mode = false;
        }
    } else {
        for (let i = 0; i < KIKAZARUS.length; i++) {
            KIKAZARUS[i].mode = true;
        }
    }

    for (let i = 0; i < KIKAZARUS.length; i++) {
        KIKAZARUS[i].draw();
    }
}