class VIRUS {
    constructor(center, size, color, life) {
        this.center = center;
        this.size = size;
        this.color = color;
        this.text = [
            "코로나19에 감염되면 대부분 경증에서 중증 수준의 증상을 보이며 특별한 치료 없이도 질환으로부터 회복합니다.",
            "코로나바이러스감염증(코로나19)은 새롭게 발견된 코로나바이러스로 인해 발생하는 감염 질환입니다.",
            "코로나19를 유발하는 바이러스는 주로 감염자가 기침 또는 재채기를 하거나 숨을 내쉴 때 발생하는 비말을 통해 전염됩니다. 이 비말은 공기 중에 머물기에는 무겁기 때문에 바닥이나 표면으로 금방 떨어집니다."
        ];
        this.set_text = this.text[Math.floor(Math.random() * this.text.length)];
        console.log(this.set_text.replace(/ /g, ""));
        this.origin_life = this.set_text.replace(/ /g, "").length;
        this.life = this.set_text.replace(/ /g, "").length;
        this.attack = false;
        this.rotation_alpha = random(-360.0, 360.0);
        this.THUNDER = [];
        this.thunder_length = 200;

        // dist
        this.dx = Math.abs(this.center.x - window.innerWidth / 2);
        this.dy = Math.abs(this.center.y - window.innerHeight / 2);
        this.speed = 1000.0;

        // awake
        this.awake_angle = 0.0;

        // motion
        this.toggle_collision = false;
    }

    draw() {
        this.draw_body();
        this.draw_life();
        if (!this.toggle_collision) {
            this.rotation_alpha += 1.0;
            this.THUNDER.length = 0;
        } else {
            this.rotation_alpha += 10.0;

            if (this.THUNDER.length <= 20) {
                const _thunder = { x: this.center.x + random(-50.0, 50.0), y: this.center.y - this.thunder_length }
                this.THUNDER.push(_thunder);
            } else {
                this.THUNDER.splice(0, 1);
            }

            beginShape();
            noFill();
            for (let i = 0; i < this.THUNDER.length; i++) {
                stroke(0, this.convertRange(i, [0, this.THUNDER.length], [0, 255]));
                strokeWeight(5);
                vertex(this.THUNDER[i].x, this.THUNDER[i].y + this.thunder_length * 2 / this.THUNDER.length * i);
            }
            endShape();
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

        if (this.toggle_collision) {
            this.calc_life_motion();
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
        fill(this.color.r, this.color.g, this.color.b);

        rect(X - this.size, Y + this.size * 1.3, value, this.size / 5);
    }

    update_mouse(_mouseX, _mouseY, _center) {
        if (this.life > 0) {
            this.check_collision(_mouseX, _mouseY, _center);
        }
    }

    calc_life() {
        this.life--;
        this.awake_angle += 90.0;

        this.center.x = this.center.x + sin(radians(this.awake_angle)) * 3.0;
    }

    calc_life_motion() {
        this.awake_angle += 30.0;
        this.center.x = this.center.x + sin(radians(this.awake_angle)) * 3.0;

        setTimeout(() => {
            this.toggle_collision = false;
        }, 300);
    }

    check_collision(_mouseX, _mouseY, _center) {
        const value = this.pointCircle(_mouseX, _mouseY, this.center.x, this.center.y, this.size);

        if (value) {

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