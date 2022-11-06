import {getApexOfFigure} from "./apexes.js";
import {checkPointInAreaOfItem, getPointsOfCircleLyingOnSameLineWithOuterPoint} from "../../../helpers/geometry.js";
import {getPointsBySides} from "./sides.js";
// import {visualizePoints} from "../../../helpers/visualisers.js";


export const checkBallCollision = (ball, anotherItem, sides) => {

    let points = [];

    getApexOfFigure(anotherItem).forEach((corner) => {
        points.push(...getPointsOfCircleLyingOnSameLineWithOuterPoint({
            center: {
                x: ball.state.pos.x + ball.state.size.width / 2,
                y: ball.state.pos.y + ball.state.size.width / 2
            },
            radius: ball.state.size.width / 2
        }, corner));
    });

    // visualizePoints(points, ball);

    const pointsBySides = getPointsBySides(ball, points, ball.state.movementDirection);

    Object.keys(sides).forEach((side)=>{
        sides[side] = sides[side] || !!pointsBySides[side].filter((point)=>(
            checkPointInAreaOfItem(point, anotherItem)
        )).length;
    })

}