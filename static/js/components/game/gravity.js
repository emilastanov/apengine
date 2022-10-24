"use strict";

export const gravityMixin = {
    useGravity () {
        const items = this.state.items.filter((item)=>(!item.state.fixed));
        items.forEach((item)=>{
            const speed = item.state.fallSpeed;

            item.move(speed,'down');
        });
    }
}
