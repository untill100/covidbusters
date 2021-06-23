class VIRUS {
    constructor(center, size, color, life) {
        this.center = center;
        this.size = size;
        this.color = color;
        this.origin_life = life;
        this.life = life;
        this.attack = false;
        this.text = ["코", "로", "나", "죽", "인", "다"];
        this.set_text = this.text[Math.floor(Math.random() * this.text.length)];
        this.rotation_alpha = random(-360.0, 360.0);

        // dist
        this.dx = Math.abs(this.center.x - window.innerWidth / 2);
        this.dy = Math.abs(this.center.y - window.innerHeight / 2);
        this.speed = 1000.0;

        // awake
        this.awake_angle = 0.0;

        // virus-iwazaru-effect
        this.effect_particle = [];

        // collision
        this.toggle_collision = false;

        // wave
        this.WAVE = [];
    }

    draw() {
        if (this.life > 0) {
            this.draw_body();
            this.draw_life();
            if (this.toggle_collision) {
                this.rotation_alpha += 10.0;
                this.draw_collision_effect();
            } else {
                this.rotation_alpha += 1.0;
            }
        }
    }

    draw_body() {
        const X = this.center.x;
        const Y = this.center.y;

        noStroke();
        if (!this.toggle_collision) {
            fill(this.color.r, this.color.g, this.color.b);
        } else {
            fill(0);
        }
        ellipse(X, Y, this.size, this.size);

        for (let i = 0; i < 360; i += 45) {
            const X = this.center.x + cos(radians(i + this.rotation_alpha)) * this.size;
            const Y = this.center.y + sin(radians(i + this.rotation_alpha)) * this.size;

            noStroke();
            if (!this.toggle_collision) {
                fill(this.color.r, this.color.g, this.color.b);
            } else {
                fill(0);
            }
            ellipse(X, Y, this.size / 4, this.size / 4);

            noFill();
            strokeWeight(2);
            if (!this.toggle_collision) {
                stroke(this.color.r, this.color.g, this.color.b);
            } else {
                stroke(0);
            }
            line(this.center.x, this.center.y, X, Y);
        }

        fill(255);
        textSize(32);
        text(this.set_text, X, Y);
    }

    draw_life() {
        const X = this.center.x;
        const Y = this.center.y;

        stroke(50, 0, 0);
        strokeWeight(1);
        fill(255);

        rect(X - this.size, Y + this.size * 1.3, this.size * 2, this.size / 5);

        this.update_life();
    }

    update_center() {
        if (this.center.x < window.innerWidth / 2) {
            this.center.x += this.dx / this.speed;
        } else {
            this.center.x -= this.dx / this.speed;
        }

        if (this.center.y < window.innerHeight / 2) {
            this.center.y += this.dy / this.speed;
        } else {
            this.center.y -= this.dy / this.speed;
        }
    }

    update_attack() {
        const dx = Math.abs(this.center.x - window.innerWidth / 2);
        const dy = Math.abs(this.center.y - window.innerHeight / 2);

        if (dx <= 50 && dy <= 50) {
            this.attack = true;
        }
    }

    update_life() {
        const X = this.center.x;
        const Y = this.center.y;
        const value = this.convertRange(this.life, [0, this.origin_life], [0, this.size * 2]);

        noStroke();
        fill(this.color.r, this.color.g, this.color.b);

        rect(X - this.size, Y + this.size * 1.3, value, this.size / 5);
    }

    calc_life() {
        this.life -= 50 / 3;
    }

    draw_collision_effect() {
        if (this.WAVE.length < 10) {
            const _wave = { x: this.center.x, y: this.center.y };
            this.WAVE.push(_wave);
        } else {
            this.WAVE.splice(0, 1);
        }

        for (let i = 0; i < this.WAVE.length; i++) {
            noFill();
            stroke(0, this.convertRange(i, [0, this.WAVE.length], [255, 0]));
            strokeWeight(i / this.WAVE.length * 2.0);
            ellipse(this.WAVE[i].x, this.WAVE[i].y, i * 20.0, i * 20.0);
        }

        this.awake_angle += 30.0;
        this.center.x = this.center.x + sin(radians(this.awake_angle)) * 3.0;
    }

    maintain_toggle_collision() {
        this.toggle_collision = true;
        setTimeout(() => {
            this.toggle_collision = false;
        }, 1000);
    }

    pointCircle(px, py, cx, cy, r) {
        const distX = px - cx;
        const distY = py - cy;
        const distance = sqrt((distX * distX) + (distY * distY));

        if (distance <= r) {
            return true;
        }
        return false;
    }

    convertRange(value, r1, r2) {
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    }
}