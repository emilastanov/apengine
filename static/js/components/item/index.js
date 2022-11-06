"use strict";

import Component from "../component.js";
import {UNDEFINED_ITEM_TYPE} from "../../errors/errors.js";
import {movementMixin} from "./movement.js";
import {collisionMixin} from "./collision/index.js";
import {getRandomId} from "../../helpers/random.js";


class Item extends Component{

    constructor ({type, size, color, img=null, repeat=false, name, zIndex=1, fallSpeed=0, transparent=false, fixed=false}){
        super();
        this.item = document.createElement("div");
        this.item.style.position = 'absolute';
        this.item.id = name? name : getRandomId();
        this.name = name? name : getRandomId();
        this.type = type;

        this.useState({
            size: type === "box" ? size : {width: size, height: size},
            fallSpeed: fallSpeed,
            pos: null,
            transparent: !transparent,
            movementDirection: {},
            img: img,
            animation: typeof img === 'object',
            timer: 0,
            fixed: fixed,
            collision: {
                left: false,
                right: false,
                down: false,
                up: false
            }
        });


        if (type === "ball") {
            this.item.style.width = `${size}px`;
            this.item.style.height = `${size}px`;
            this.item.style.borderRadius = "50%";
        } else if (type === "box") {
            this.item.style.width = `${size.width}px`;
            this.item.style.height = `${size.height}px`;
        } else {
            throw UNDEFINED_ITEM_TYPE;
        }
        this.item.style.zIndex = zIndex;
        this.item.style.backgroundSize = `contain`;
        this.item.style.backgroundRepeat = repeat ? 'repeat':`no-repeat`;

        if (color) {
            this.item.style.backgroundColor = color;
        }

        if (img && typeof img !== 'object') {
            this.item.style.backgroundImage = `url(${img})`;
        } else if (img) {
            this.item.style.backgroundImage = `url(${img[0]})`;
        }
    }
    animate () {
        this.setState('timer', this.state.timer + 1);
        this.item.style.backgroundImage = `url(${this.state.img[this.state.timer % this.state.img.length]})`;
    }
}

Object.assign(Item.prototype, movementMixin);
Object.assign(Item.prototype, collisionMixin);

export default Item;
