import {Item} from "../item/index.js";

export const itemsMixin = {
    generateItem() {
        const items = [];
        this.state.beginPos.forEach(() => {
            items.push(new Item(this.itemOptions));
        });
        items.forEach((item, key) => {
            this.game.addItem(item, this.state.beginPos[key]);
        });
        this.setState('generatedItems', [...items, ...this.state.generatedItems]);
        this.setFluctuation();
    },
    moveItems() {
        this.state.generatedItems.forEach((item) => {
            item.move(this.state.move.speed, this.state.move.direction);
        });
    },
    removeInvisibleItems() {
        this.state.generatedItems.forEach((item) => {
            if (this.state.move.direction === 'left' && item.state.pos.x + item.state.size.width < 0) {
                this.game.dropItem(item);
                this.setState('generatedItems', [
                    ...this.state.generatedItems.filter((_item) => (_item.name !== item.name))
                ]);
            }
        });
    }
}
