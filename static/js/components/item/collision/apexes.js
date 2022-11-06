export const getApexOfFigure = (figure) => {
    return figure.type === 'ball' ? [{
        x: figure.state.pos.x,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + figure.state.size.width / 2,
        y: figure.state.pos.y + figure.state.size.height / 2
    }] : [{
        x: figure.state.pos.x,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + figure.state.size.width / 2,
        y: figure.state.pos.y + figure.state.size.height / 2
    }, {
        x: figure.state.pos.x + figure.state.size.width / 4,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x + 3 * figure.state.size.width / 4,
        y: figure.state.pos.y
    }, {
        x: figure.state.pos.x + figure.state.size.width / 4,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + 3 * figure.state.size.width / 4,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x,
        y: figure.state.pos.y + figure.state.size.height / 4
    }, {
        x: figure.state.pos.x,
        y: figure.state.pos.y + 3 * figure.state.size.height / 4
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y + figure.state.size.height / 4
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y + 3 * figure.state.size.height / 4
    }]
};