"use strict";

import {checkBallCollision} from "./ball.js";
import {checkBoxCollision} from "./box.js";

export const collisionMixin = {
    checkCollision() {

        const anotherItems = this.state.game.state.items.filter((item) => (
            item.name !== this.name &&
            item.state.transparent
        ));

        const sides = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        anotherItems.forEach((anotherItem) => {
            if (this.type === 'ball') {
                checkBallCollision(this, anotherItem, sides);
            } else if (this.type === 'box') {
                checkBoxCollision(this, anotherItem, sides);
            }
        });

        Object.keys(sides).forEach((side)=>{
            this.setCollision(side, sides[side]);
        });
    },
    setCollision(side, state) {
        const collision = {...this.state.collision};

        collision[side] = state;

        this.setState("collision", collision);
    }
}
