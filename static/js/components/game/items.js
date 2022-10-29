"use strict";
import {itemAlreadyExist} from "../../errors/errors.js";


export const itemMixin = {
    addItem (item, pos) {
        // console.log(item);
        if (item.name in this.state.items){
            throw itemAlreadyExist(item.name);
        } else {
            this.setState('items', [...this.state.items, item])
            item.setState('game', this);
            item.setPos(pos);
            this.state.scene.body.appendChild(item.item);
        }
    }
};
