"use strict";
import {itemAlreadyExist} from "../../errors/errors.js";
import {dropUsedId} from "../../helpers/random.js";


export const itemMixin = {
    addItem (item, pos) {
        if (item.name in this.state.items){
            throw itemAlreadyExist(item.name);
        } else {
            this.setState('items', [...this.state.items, item])
            item.setState('game', this);
            item.setPos(pos);
            this.state.scene.body.appendChild(item.item);
        }
    },
    dropItem (item) {
        this.state.scene.body.removeChild(item.item);
        this.setState('items', [
            ...this.state.items.filter((existItem)=>(item.name !== existItem.name))
        ]);
        dropUsedId(item.id);
    }
};
