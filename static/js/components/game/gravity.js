"use strict";

export const gravityMixin = {
    useGravity () {
        const items = this.state.items.filter((item)=>(!item.state.fixed));
        items.forEach((item)=>{
            const speed = item.state.fallSpeed;
            item.setMovementDirection('down', true);
            item.move(speed,'down');
        });
    }
}
