// BEFORE START
let select_monkey = 1;
let toggle_mizaru = false;
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
    toggle_mizaru = true;
    toggle_timeout = true;
}, 3000);

// INTERACTION COORDS
let USER_X, USER_Y;

// P5
const MIZARUS = [];
const VIRUSES = [];
const VIRUSES_MAX = 5;

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_mizaru();
}

function init_mizaru() {
    MIZARUS.length = 0;
    const _mizaru = new MIZARU({ x: width / 2, y: height / 2 }, 200, VIRUSES);
    MIZARUS.push(_mizaru);
}

function draw() {
    clear();
    draw_fields();
    draw_monkeys();

    if (toggle_mizaru) {
        draw_viruses();
    }

    if (toggle_timeout) {
        update_viruses();
    }

    draw_user_eyses();
}

function draw_user_eyses() {
    fill(255, 10);
    stroke(0);
    strokeWeight(5);
    rect(50, 50, 300, 300);

    const C_ULX = convertRange(640 - USER_LX, [0, 640], [50, 350]) + 10;
    const C_ULY = convertRange(USER_LY, [0, 480], [50, 350]);
    const C_URX = convertRange(640 - USER_RX, [0, 640], [50, 350]) - 10;
    const C_URY = convertRange(USER_RY, [0, 480], [50, 350]);

    strokeWeight(1);
    ellipse(C_ULX, C_ULY, 40, 40);
    ellipse(C_URX, C_URY, 40, 40);
    fill(200, 0, 0);
    ellipse(C_ULX, C_ULY, 30, 30);
    ellipse(C_URX, C_URY, 30, 30);
    fill(100, 0, 0);
    ellipse(C_ULX, C_ULY, 15, 15);
    ellipse(C_URX, C_URY, 15, 15);

    USER_X = convertRange(640 - USER_CX, [0, 640], [0, window.innerWidth]);
    USER_Y = convertRange(USER_CY, [0, 480], [0, window.innerHeight]);
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

    for (let i = 0; i < MIZARUS.length; i++) {
        MIZARUS[i].update_mouse(USER_X, USER_Y);
    }

    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].update_center();

        if (VIRUSES[i].life === 0) {
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

            if (value <= 0) {
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
    init_mizaru();
}

function draw_fields() {
    if (toggle_mizaru) {
        background(255, 0, 0);
    } else {
        background(30);
    }
}

function draw_monkeys() {
    draw_mizaru();
}


function draw_viruses() {
    for (let i = 0; i < VIRUSES.length; i++) {
        VIRUSES[i].draw();
    }
}

function draw_mizaru() {
    if (toggle_mizaru) {
        for (let i = 0; i < MIZARUS.length; i++) {
            MIZARUS[i].mode = false;
        }
    } else {
        for (let i = 0; i < MIZARUS.length; i++) {
            MIZARUS[i].mode = true;
        }
    }

    for (let i = 0; i < MIZARUS.length; i++) {
        MIZARUS[i].draw();
    }
}

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}