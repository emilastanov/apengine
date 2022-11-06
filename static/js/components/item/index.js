"use strict";

import Component from "../component.js";
import {UNDEFINED_ITEM_TYPE} from "../../errors/errors.js";
import {movementMixin} from "./movement.js";
import {collisionMixin} from "./collision/index.js";
import {getRandomId} from "../../helpers/random.js";


class Item extends Component{

    constructor ({type, size, color, name, zIndex=1, fallSpeed=0, transparent=false, fixed=false}){
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

        if (color) {
            this.item.style.backgroundColor = color;
        }

    }
}

Object.assign(Item.prototype, movementMixin);
Object.assign(Item.prototype, collisionMixin);

export default Item;
