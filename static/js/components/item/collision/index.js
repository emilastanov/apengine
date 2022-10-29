"use strict";

import {
    checkPointInAreaOfItem,
    getPointsOfCircleLyingOnSameLineWithOuterPoint
} from "../../../helpers/geometry.js";

import {getApexOfFigure} from "./apexes.js";
import {visualizePoints} from "../../../helpers/visualisers.js";
import {getPointsBySides} from "./sides.js";

export const collisionMixin = {
    checkCollision() {
        const currentItemPosX = this.state.pos.x;
        const currentItemPosY = this.state.pos.y;
        const currentItemWidth = this.state.size.width;
        const currentItemHeight = this.state.size.height;
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

                let points = [];
                getApexOfFigure(anotherItem).forEach((corner) => {
                    points.push(...getPointsOfCircleLyingOnSameLineWithOuterPoint({
                        center: {
                            x: currentItemPosX + currentItemWidth / 2,
                            y: currentItemPosY + currentItemHeight / 2
                        },
                        radius: currentItemWidth / 2
                    }, corner));
                });

                visualizePoints(points, this);

                const pointsBySides = getPointsBySides(this, points, '');

                Object.keys(sides).forEach((side)=>{
                    sides[side] = sides[side] || !!pointsBySides[side].filter((point)=>(
                        checkPointInAreaOfItem(point, anotherItem)
                    )).length;
                })
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
