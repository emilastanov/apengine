import Item from "../components/item/index.js";

export const visualizePoints = (points, item) => {
    let resVisual;

    if (!!item.state.resVisual) {
        resVisual = item.state.resVisual;
    } else {
        resVisual = Array.from(Array(points.length)).map(
            (_, key) => {
                const it = new Item({
                        type: 'ball',
                        size: 5,
                        color: 'red',
                        name: `dot${key}`,
                        transparent: true
                    }
                )
                item.state.game.addItem(it, {x:0,y:0})
                return it
            }
        )
        item.setState('resVisual', resVisual)
    }
    resVisual.forEach((item,key)=>{
        item.changePos({
            x: points[key].x - 2.5,
            y: points[key].y - 2.5
        });
    })
}
