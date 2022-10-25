"use strict";

export const collisionMixin = {
    checkCollision () {
        const currentItemPosX = this.state.pos.x;
        const currentItemPosY = this.state.pos.y;
        const currentItemWidth = this.state.size.width;
        const currentItemHeight = this.state.size.height;
        const anotherItems = this.state.game.state.items.filter((item)=>(
            item.name !== this.name &&
                item.state.transparent
        ));

        let left = false;
        let right = false;
        let up = false;
        let down = false;

        const pointsOfItem = {
            leftSide: [],
            rightSide: [],
            upSide: [],
            downSide: []
        };


        anotherItems.forEach((anotherItem)=>{
            left = left || this.checkPointInAreaOfItem({
                x: currentItemPosX,
                y: currentItemPosY + 1
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX,
                y: currentItemPosY + (currentItemHeight / 2)
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX,
                y: currentItemPosY + currentItemHeight - 1
            }, anotherItem);

            right = right || this.checkPointInAreaOfItem({
                x: currentItemPosX + currentItemWidth,
                y: currentItemPosY + 1
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + currentItemWidth,
                y: currentItemPosY + (currentItemHeight / 2)
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + currentItemWidth,
                y: currentItemPosY + currentItemHeight - 1
            }, anotherItem);

            up = up || this.checkPointInAreaOfItem({
                x: currentItemPosX + 1,
                y: currentItemPosY + currentItemHeight
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + (currentItemWidth / 2),
                y: currentItemPosY + currentItemHeight
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + currentItemWidth - 1,
                y: currentItemPosY + currentItemHeight
            }, anotherItem);

            down = down || this.checkPointInAreaOfItem({
                x: currentItemPosX + 1,
                y: currentItemPosY
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + (currentItemWidth / 2),
                y: currentItemPosY
            }, anotherItem) || this.checkPointInAreaOfItem({
                x: currentItemPosX + currentItemWidth - 1,
                y: currentItemPosY
            }, anotherItem);
        });
        this.setCollision('left', left);
        this.setCollision('right', right);
        this.setCollision('up', up);
        this.setCollision('down', down);
    },
    setCollision (side, state) {
        const collision = {...this.state.collision};
        collision[side] = state;

        this.setState("collision", collision);
    },
    checkPointInAreaOfItem(point, item) {
        if (item.type === 'box') {
            return point.y >= item.state.pos.y &&
                point.y <= item.state.pos.y + item.state.size.height &&
                point.x >= item.state.pos.x &&
                point.x <= item.state.pos.x + item.state.size.width
        } else if (item.type === 'ball') {
            return (point.x - (item.state.pos.x + item.state.size.width/2))**2 +
                (point.y - (item.state.pos.y + item.state.size.height/2))**2 <= (item.state.size.width/2)**2;
        }
    }
}
