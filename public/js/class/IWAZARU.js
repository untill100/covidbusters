class IWAZARU {
    constructor(center, size, viruses) {
        this.center = center;
        this.size = size;
        this.mode = false;
        this.o_color = { r: 0, g: 255, b: 0 };
        this.b_color = { r: 100, g: 100, b: 100 };
        this.center_angle = 0.0;
        this.float = false;

        // hand
        this.left_hand = { x: this.center.x - this.size / 1.5, y: this.center.y + this.size / 2 };
        this.left_hand_angle = 0.0;

        this.right_hand = { x: this.center.x + this.size / 1.5, y: this.center.y + this.size / 2 };
        this.right_hand_angle = 180.0;

        // effect
        this.effects = [];
        this.gravity = { x: 0.0, y: 0.0 };

        // play
        this.laser = false;

        // viruses
        this.viruses = viruses;
    }

    setup_effect() {
        const eX1 = this.center.x;
        const eY1 = this.center.y + this.size / 3.5;

        if (this.effects.length < 30) {
            var _center = { x: eX1, y: eY1 };
            var _vel = { x: random(-2.0, 2.0), y: random(-2.0, 2.0) };
            var _size = random(2.0, 60.0);
            var _random = Math.floor(Math.random() * 2);
            var _shape = null;;
            if (_random === 0) {
                _shape = "ellipse";
            } else {
                _shape = "rect";
            }
            var effect_particle = ({ center: _center, vel: _vel, size: _size, shape: _shape });
            this.effects.push(effect_particle);
        } else {
            this.effects.splice(0, 1);
        }
    }

    draw() {
        this.update();

        noFill();
        noStroke();
        strokeWeight(0);
        point(this.center.x, this.center.y);

        // ears
        if (!this.mode) {
            fill(255, 190, 150);
        } else {
            fill(0);
        }
        ellipse(this.center.x - this.size / 2, this.center.y, this.size / 3, this.size / 3);
        ellipse(this.center.x + this.size / 2, this.center.y, this.size / 3, this.size / 3);

        // head
        ellipse(this.center.x, this.center.y, this.size, this.size);
        for (let i = 0; i < 62; i++) {
            if (!this.mode) {
                fill(i + 200, 190, 150);
            } else {
                fill(i * 0.75);
            }
            ellipse(this.center.x, this.center.y, this.size - i * 2.0, this.size - i * 2.0);
        }

        // hair
        this.draw_hair();

        // eyes
        this.draw_eyes();

        // nose
        this.draw_nose();

        // mouth
        this.draw_mouth();

        // hand
        this.draw_hand();

        // effect
        this.draw_effect();
    }

    draw_hair() {
        if (!this.mode) {
            for (let i = 0; i < 80; i++) {
                var x1 = this.center.x - this.size / 2;
                var y1 = this.center.y;
                var x2 = this.center.x - this.size / 2;
                var y2 = this.center.y - this.size / 2.9 - i;
                var x3 = this.center.x + this.size / 2;
                var y3 = this.center.y - this.size / 2.9 - i;
                var x4 = this.center.x + this.size / 2;
                var y4 = this.center.y;

                noFill();
                stroke(0, 0, 255 - i * 4);
                strokeWeight(1);
                beginShape();
                vertex(x1, y1);
                bezierVertex(x2, y2, x3, y3, x4, y4);
                endShape();
            }
        } else {
            for (let i = 0; i < 80; i++) {
                var x1 = this.center.x - this.size / 2;
                var y1 = this.center.y;
                var x2 = this.center.x - this.size / 2;
                var y2 = this.center.y - this.size / 2.9 - i;
                var x3 = this.center.x + this.size / 2;
                var y3 = this.center.y - this.size / 2.9 - i;
                var x4 = this.center.x + this.size / 2;
                var y4 = this.center.y;

                noFill();
                stroke(255 - i * 4, 255 - i * 4, 255 - i * 4);
                strokeWeight(1);
                beginShape();
                vertex(x1, y1);
                bezierVertex(x2, y2, x3, y3, x4, y4);
                endShape();
            }
        }
    }

    draw_eyes() {
        if (!this.mode) {
            noStroke();
            fill(255);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 5, this.size / 5);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 5, this.size / 5);
            fill(0, 100, 255);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 6.5, this.size / 6.5);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 6.5, this.size / 6.5);
            fill(0, 50, 150);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 15, this.size / 15);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 15, this.size / 15);
        } else {
            noStroke();
            fill(255);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 5, this.size / 5);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 5, this.size / 5);
            fill(150);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 6.5, this.size / 6.5);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 6.5, this.size / 6.5);
            fill(100);
            ellipse(this.center.x - this.size / 5, this.center.y, this.size / 15, this.size / 15);
            ellipse(this.center.x + this.size / 5, this.center.y, this.size / 15, this.size / 15);
        }
    }

    draw_nose() {
        if (!this.mode) {
            fill(200, 190, 150);
            ellipse(this.center.x, this.center.y + this.size / 8 + this.size / 30, this.size / 15, this.size / 15);

            fill(255, 100, 200);
            ellipse(this.center.x, this.center.y + this.size / 8, this.size / 20, this.size / 20);
        } else {
            fill(30);
            ellipse(this.center.x, this.center.y + this.size / 8 + this.size / 30, this.size / 15, this.size / 15);

            fill(100, 100, 100);
            ellipse(this.center.x, this.center.y + this.size / 8, this.size / 20, this.size / 20);
        }
    }

    draw_mouth() {
        if (!this.mode) {
            beginShape();
            var x1 = this.center.x - this.size / 4;
            var y1 = this.center.y + this.size / 4.5;
            var x2 = this.center.x - this.size / 8;
            var y2 = this.center.y + this.size / 2.5;
            var x3 = this.center.x + this.size / 8;
            var y3 = this.center.y + this.size / 2.5;
            var x4 = this.center.x + this.size / 4;
            var y4 = this.center.y + this.size / 4.5;

            fill(80, 0, 0);
            vertex(x1, y1);
            bezierVertex(x2, y2, x3, y3, x4, y4);
            endShape(CLOSE);

            // teeth
            beginShape();
            var x1 = this.center.x - this.size / 5;
            var y1 = this.center.y + this.size / 4.5;
            var x2 = this.center.x - this.size / 8;
            var y2 = this.center.y + this.size / 3.6;
            var x3 = this.center.x + this.size / 8;
            var y3 = this.center.y + this.size / 3.6;
            var x4 = this.center.x + this.size / 5;
            var y4 = this.center.y + this.size / 4.5;

            fill(255);
            vertex(x1, y1);
            bezierVertex(x2, y2, x3, y3, x4, y4);
            endShape(CLOSE);
        } else {
            beginShape();
            var x1 = this.center.x - this.size / 4;
            var y1 = this.center.y + this.size / 4.5;
            var x2 = this.center.x - this.size / 8;
            var y2 = this.center.y + this.size / 2.5;
            var x3 = this.center.x + this.size / 8;
            var y3 = this.center.y + this.size / 2.5;
            var x4 = this.center.x + this.size / 4;
            var y4 = this.center.y + this.size / 4.5;

            fill(0, 0, 0);
            vertex(x1, y1);
            bezierVertex(x2, y2, x3, y3, x4, y4);
            endShape(CLOSE);

            // teeth
            beginShape();
            var x1 = this.center.x - this.size / 5;
            var y1 = this.center.y + this.size / 4.5;
            var x2 = this.center.x - this.size / 8;
            var y2 = this.center.y + this.size / 3.6;
            var x3 = this.center.x + this.size / 8;
            var y3 = this.center.y + this.size / 3.6;
            var x4 = this.center.x + this.size / 5;
            var y4 = this.center.y + this.size / 4.5;

            fill(100);
            vertex(x1, y1);
            bezierVertex(x2, y2, x3, y3, x4, y4);
            endShape(CLOSE);
        }
    }

    draw_hand() {
        if (!this.mode) {
            // left
            const lhx = this.left_hand.x + cos(radians(this.left_hand_angle)) * this.size / 20.0;
            const lhy = this.left_hand.y + sin(radians(this.left_hand_angle)) * this.size / 20.0;

            fill(255, 190, 150);
            ellipse(lhx, lhy, this.size / 3, this.size / 3);
            ellipse(lhx, lhy - this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(lhx, lhy + this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(lhx + this.size / 3 / 2 + this.size / 7 / 2, lhy, this.size / 7, this.size / 7);
            rect(lhx - this.size / 6, lhy - this.size / 14, this.size / 3, this.size / 7);

            // right
            const rhx = this.right_hand.x + cos(radians(this.right_hand_angle)) * this.size / 20.0;
            const rhy = this.right_hand.y + sin(radians(this.right_hand_angle)) * this.size / 20.0;

            fill(255, 190, 150);
            ellipse(rhx, rhy, this.size / 3, this.size / 3);
            ellipse(rhx, rhy - this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(rhx, rhy + this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(rhx - this.size / 3 / 2 - this.size / 7 / 2, rhy, this.size / 7, this.size / 7);
            rect(rhx - this.size / 6, rhy - this.size / 14, this.size / 3, this.size / 7);
        } else {
            // left
            fill(43);
            push();
            translate(this.center.x - this.size / 6, this.center.y + this.size / 3);
            rotate(QUARTER_PI);
            ellipse(0, 0, this.size / 3, this.size / 3);
            ellipse(0, 0 - this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(0, 0 + this.size / 3 / 6, this.size / 3, this.size / 3);
            rect(-this.size / 6, -this.size / 14, this.size / 3, this.size / 7);
            pop();

            // right
            fill(50);
            push();
            translate(this.center.x + this.size / 6, this.center.y + this.size / 3);
            rotate(-QUARTER_PI);
            ellipse(0, 0, this.size / 3, this.size / 3);
            ellipse(0, 0 - this.size / 3 / 6, this.size / 3, this.size / 3);
            ellipse(0, 0 + this.size / 3 / 6, this.size / 3, this.size / 3);
            rect(-this.size / 6, -this.size / 14, this.size / 3, this.size / 7);
            pop();
        }
    }

    draw_effect() {
        if (!this.mode) {
            this.setup_effect();

            noFill();
            for (let i = 0; i < this.effects.length; i++) {
                const X = this.effects[i].center.x;
                const Y = this.effects[i].center.y;
                const size = this.effects[i].size;
                const shape = this.effects[i].shape;

                strokeWeight(i * 0.05);
                stroke(0, 100 - i, 255 - i);

                if (shape === 'ellipse') {
                    ellipse(X, Y, size, size);
                } else {
                    rect(X - size / 2, Y - size / 2, size, size);
                }
            }
        } else {
            this.effects.length = 0;
        }
    }

    // update
    update() {
        this.update_angle();
        this.update_effect();
    }

    update_angle() {
        this.center_angle += 4.0;
        this.left_hand_angle += 4.0;
        this.right_hand_angle -= 4.0;

        if (!this.float) {
            this.center.y = this.center.y + sin(radians(this.center_angle)) * this.size / 150.0;
        }
    }

    update_effect() {
        // vel
        for (let i = 0; i < this.effects.length; i++) {
            this.effects[i].center.x += this.effects[i].vel.x;
            this.effects[i].center.y += this.effects[i].vel.y;
        }

        // gravity
        for (let i = 0; i < this.effects.length; i++) {
            this.effects[i].center.x += this.gravity.x;
            this.effects[i].center.y += this.gravity.y;
        }
    }

    update_mouse(_mouseX, _mouseY) {
        noFill();
        stroke(0, 100, 255);
        strokeWeight(1);
        ellipse(_mouseX, _mouseY, 50, 50);

        // viruses
        if (this.viruses.length > 0) {
            for (let i = 0; i < this.viruses.length; i++) {
                this.viruses[i].update_mouse(_mouseX, _mouseY, this.center);
            }
        }
    }
}