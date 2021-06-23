class VIRUS {
    constructor(center, size, color, life) {
        this.center = center;
        this.size = size;
        this.origin_color = color;
        this.color = color;
        this.origin_life = life;
        this.life = life;
        this.attack = false;
        this.rotation_alpha = random(-360.0, 360.0);

        // dist
        this.dx = Math.abs(this.center.x - window.innerWidth / 2);
        this.dy = Math.abs(this.center.y - window.innerHeight / 2);
        this.speed = 1000.0;

        // awake
        this.awake_angle = 0.0;

        // collision
        this.toggle_collision = false;

        // kemuri
        this.KEMURI = [];
        this.kemuri_gravity = { x: 0.0, y: -5.0 };
    }

    draw() {
        if (this.life > 0) {
            this.draw_body();
            this.draw_life();
            if (this.toggle_collision) {
                this.draw_kemuri();
                this.rotation_alpha += 10.0;
            } else {
                this.KEMURI.length = 0;
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

    draw_kemuri() {
        if (this.KEMURI.length <= 30) {
            const kemuri = { x: this.center.x, y: this.center.y, vel: { x: random(-2.0, 2.0), y: random(-2.0, 2.0) }, size: random(5.0, 20.0) };
            this.KEMURI.push(kemuri);
        } else {
            this.KEMURI.splice(0, 1);
        }

        for (let i = 0; i < this.KEMURI.length; i++) {
            const kemuri = this.KEMURI[i];
            noStroke();
            fill(0, this.convertRange(i, [0, this.KEMURI.length], [0, 255]));
            ellipse(kemuri.x, kemuri.y, kemuri.size, kemuri.size);
        }

        for (let i = 0; i < this.KEMURI.length; i++) {
            const kemuri = this.KEMURI[i];
            kemuri.x += kemuri.vel.x;
            kemuri.y += kemuri.vel.y;
            kemuri.x += this.kemuri_gravity.x;
            kemuri.y += this.kemuri_gravity.y;
        }
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
        if (!this.toggle_collision) {
            fill(this.color.r, this.color.g, this.color.b);
        } else {
            fill(0);
        }

        rect(X - this.size, Y + this.size * 1.3, value, this.size / 5);
    }

    update_mouse(_mouseX, _mouseY, _center) {
        if (this.life > 0) {
            this.check_collision(_mouseX, _mouseY, _center);
        }
    }

    calc_life() {
        this.life--;
        this.awake_angle += 60.0;

        this.calc_life_motion();
    }

    calc_life_motion() {
        this.center.x = this.center.x + sin(radians(this.awake_angle)) * 3.0;
    }

    check_collision(_mouseX, _mouseY, _center) {
        const value = this.pointCircle(_mouseX, _mouseY, this.center.x, this.center.y, this.size);

        // MIZARU'S EYES
        this.ex1 = _center.x - width / 3 / 3 / 5.0;
        this.ey1 = _center.y;
        this.ex2 = _center.x + width / 3 / 3 / 5.0;
        this.ey2 = _center.y;

        if (value) {
            // const laser = document.querySelector("#laser");
            // laser.play();

            this.toggle_collision = true;

            noFill();
            strokeWeight(1)
            stroke(0, 255, 0);
            line(this.ex1, this.ey1, this.center.x, this.center.y);
            line(this.ex2, this.ey2, this.center.x, this.center.y);

            this.calc_life();
        } else {
            this.toggle_collision = false;
        }
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