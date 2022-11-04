import {getApexOfFigure} from "./apexes.js";
import {
    checkPointInAreaOfItem,
    getPointsOfRectLyingOnSameLineWithOuterPoint
} from "../../../helpers/geometry.js";
import {getPointsBySides} from "./sides.js";


export const checkBoxCollision = (box, anotherItem, sides) => {

    let points = [];

    getApexOfFigure(anotherItem).forEach((corner) => {
        points.push(...getPointsOfRectLyingOnSameLineWithOuterPoint({
            pos: {
                x: box.state.pos.x,
                y: box.state.pos.y
            },
            width: box.state.size.width,
            height: box.state.size.height
        }, corner));
    });

    // visualizePoints(points, box);
    const pointsBySides = getPointsBySides(box, points, box.state.movementDirection);

    Object.keys(sides).forEach((side)=>{
        sides[side] = sides[side] || !!pointsBySides[side].filter((point)=>(
            checkPointInAreaOfItem(point, anotherItem)
        )).length;
    })
}
