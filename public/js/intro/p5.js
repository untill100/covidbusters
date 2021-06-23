const STARS = [];
const MOUSES = [];

function setup() {
    angle = 1.0;
    const canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("#p5-background");

    init_stars();
}

function init_stars() {
    STARS.length = 0;

    for (let i = 0; i < 500; i++) {
        const _star = new Star({ x: Math.random() * width, y: Math.random() * height }, random(0.1, 2));
        STARS.push(_star);
    }
}

function draw() {
    background(0);

    update();
    draw_star();
    draw_mouse();
}

function update() {
    for (let i = 0; i < STARS.length; i++) {
        STARS[i].update();
    }

    update_mouse(mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    init_stars();
}

function draw_star() {
    for (let i = 0; i < STARS.length; i++) {
        STARS[i].draw();
    }
}

function draw_mouse() {
    if (MOUSES.length >= 31) {
        for (let i = 0; i < MOUSES.length; i++) {
            const converted_value = convertRange(i, [0, 50], [0, 255]);
            const X = MOUSES[i].x;
            const Y = MOUSES[i].y;
            push();
            translate(X, Y);
            rotate(angle * i * 0.1);
            fill(0, converted_value, 0);
            stroke(0, converted_value, 0);
            strokeWeight(0.5);
            beginShape();
            vertex(0, 0);
            vertex(i * -1.0, i * -1.0);
            vertex(i * 1.0, i * 1.0);
            endShape(CLOSE);
            pop();
        }
    }
}

function update_mouse(_X, _Y) {
    if (MOUSES.length <= 50) {
        MOUSES.push({ x: _X, y: _Y });
    } else {
        MOUSES.splice(0, 1);
    }
}

// Star
class Star {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }

    draw() {
        noFill();
        strokeWeight(this.size);
        stroke(255);
        point(this.pos.x, this.pos.y);
    }

    update() {
        this.size = random(0.1, 2);
    }
}

function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}