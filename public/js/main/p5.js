let select_monkey = 1;
let toggle_mizaru = false;
let toggle_iwazaru = false;
let toggle_kikazaru = false;
let toggle_float = false;

const MIZARUS = [];
const IWAZARUS = [];
const KIKAZARUS = [];

function setup() {
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_monkeys();
}

function draw() {
    clear();
    draw_monkeys();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    init_monkeys();
}

function init_monkeys() {
    const size = 200;

    MIZARUS.length = 0;
    IWAZARUS.length = 0;
    KIKAZARUS.length = 0;

    const _mizaru = new MIZARU({ x: width / 2 - size * 1.5, y: height / 1.7 }, size);
    MIZARUS.push(_mizaru);

    const _iwazaru = new IWAZARU({ x: width / 2, y: height / 1.7 }, size);
    IWAZARUS.push(_iwazaru);

    const _kikazaru = new KIKAZARU({ x: width / 2 + size * 1.5, y: height / 1.7 }, size);
    KIKAZARUS.push(_kikazaru);
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

    if (toggle_float) {
        for (let i = 0; i < MIZARUS.length; i++) {
            MIZARUS[i].float = false;
        }
    } else {
        for (let i = 0; i < MIZARUS.length; i++) {
            MIZARUS[i].float = true;
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

    if (toggle_float) {
        for (let i = 0; i < IWAZARUS.length; i++) {
            IWAZARUS[i].float = false;
        }
    } else {
        for (let i = 0; i < IWAZARUS.length; i++) {
            IWAZARUS[i].float = true;
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

    if (toggle_float) {
        for (let i = 0; i < KIKAZARUS.length; i++) {
            KIKAZARUS[i].float = false;
        }
    } else {
        for (let i = 0; i < KIKAZARUS.length; i++) {
            KIKAZARUS[i].float = true;
        }
    }

    for (let i = 0; i < KIKAZARUS.length; i++) {
        KIKAZARUS[i].draw();
    }
}