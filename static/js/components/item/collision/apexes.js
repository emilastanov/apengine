

export const getApexOfFigure = (figure) => {
    return [{
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
        x: figure.state.pos.x + figure.state.size.width/2,
        y: figure.state.pos.y + figure.state.size.height/2
    }]
};