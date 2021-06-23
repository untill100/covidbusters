let select_monkey = 1;
let toggle_mizaru = true;
let toggle_iwazaru = false;
let toggle_kikazaru = false;
let toggle_float = true;

const MIZARUS = [];
const IWAZARUS = [];
const KIKAZARUS = [];

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_monkeys();
}

function init_monkeys() {
    const size = 200;

    MIZARUS.length = 0;
    IWAZARUS.length = 0;
    KIKAZARUS.length = 0;

    const _mizaru = new MIZARU({ x: width / 3 / 2, y: height / 2.4 }, size);
    MIZARUS.push(_mizaru);

    const _iwazaru = new IWAZARU({ x: width / 2, y: height / 2.4 }, size);
    IWAZARUS.push(_iwazaru);

    const _kikazaru = new KIKAZARU({ x: width - width / 3 / 2, y: height / 2.4 }, size);
    KIKAZARUS.push(_kikazaru);
}

function draw() {
    clear();
    draw_fields();
    draw_monkeys();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    init_monkeys();
}

function draw_fields() {
    background(30);

    if (toggle_mizaru) {
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, width / 3, height);
    }

    if (toggle_iwazaru) {
        noStroke();
        fill(255, 0, 0);
        rect(width / 3, 0, width / 3, height);
    }

    if (toggle_kikazaru) {
        noStroke();
        fill(255, 0, 0);
        rect(width / 3 * 2, 0, width / 3, height);
    }
}

function draw_monkeys() {
    draw_mizaru();
    draw_iwazaru();
    draw_kikazaru();
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

// keyboard event

window.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") {

        if (select_monkey === 1) {
            toggle_mizaru = false;
            toggle_iwazaru = true;
            toggle_kikazaru = false;
        }

        if (select_monkey === 2) {
            toggle_mizaru = false;
            toggle_iwazaru = false;
            toggle_kikazaru = true;
        }

        if (select_monkey === 3) {
            toggle_mizaru = true;
            toggle_iwazaru = false;
            toggle_kikazaru = false;

            select_monkey = 0;
        }

        select_monkey++;
    }

    if (e.key === "ArrowLeft") {

        if (select_monkey === 1) {
            toggle_mizaru = false;
            toggle_iwazaru = false;
            toggle_kikazaru = true;
        }

        if (select_monkey === 2) {
            toggle_mizaru = false;
            toggle_iwazaru = true;
            toggle_kikazaru = false;
        }

        if (select_monkey === 3) {
            toggle_mizaru = true;
            toggle_iwazaru = false;
            toggle_kikazaru = false;

            select_monkey = 0;
        }

        select_monkey++;
    }
});