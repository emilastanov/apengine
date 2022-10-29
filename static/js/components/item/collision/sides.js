import {detectSideOfCircle} from "../../../helpers/geometry.js";

export const getPointsBySides = (figure, points, direction) => {
    const pointsBySides = {
        left: [{
            x: figure.state.pos.x,
            y: figure.state.pos.y + figure.state.size.height/2
        }],
        right: [{
            x: figure.state.pos.x + figure.state.size.width,
            y: figure.state.pos.y + figure.state.size.height/2
        }],
        up: [{
            x: figure.state.pos.x + figure.state.size.width/2,
            y: figure.state.pos.y + figure.state.size.height
        }],
        down: [{
            x: figure.state.pos.x + figure.state.size.width/2,
            y: figure.state.pos.y
        }]
    };

    points.forEach((point)=>{
        const side = detectSideOfCircle({
            center: {
                x: figure.state.pos.x + figure.state.size.width / 2,
                y: figure.state.pos.y + figure.state.size.height / 2
            },
            radius: figure.state.size.width / 2
        },point)

        if (side === 'left'){
            pointsBySides.left = [point, ...pointsBySides.left]
        } else if (side === 'right') {
            pointsBySides.right = [point, ...pointsBySides.right]
        } else if (side === 'up') {
            pointsBySides.up = [point, ...pointsBySides.up]
        } else if (side === 'down') {
            pointsBySides.down = [point, ...pointsBySides.down]
        }
    });

    return pointsBySides;
}
