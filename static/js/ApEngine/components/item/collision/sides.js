

export const getPointsBySides = (figure, points, directions) => {

    const _points = [...points,{
        x: figure.state.pos.x,
        y: figure.state.pos.y + figure.state.size.height / 2
    }, {
        x: figure.state.pos.x + figure.state.size.width,
        y: figure.state.pos.y + figure.state.size.height / 2
    }, {
        x: figure.state.pos.x + figure.state.size.width / 2,
        y: figure.state.pos.y + figure.state.size.height
    }, {
        x: figure.state.pos.x + figure.state.size.width / 2,
        y: figure.state.pos.y
    }];
    const centerOfFigure = {
        x: figure.state.pos.x + figure.state.size.width / 2,
        y: figure.state.pos.y + figure.state.size.height / 2
    };
    const pointsBySides = {left:[],right:[],up:[],down:[]};
    Object.keys(directions).forEach((direction)=>{
        if(directions[direction]){
            _points.filter((point)=>{
                if (direction === 'right' && point.x > centerOfFigure.x) {
                    return point
                }
                if (direction === 'left' && point.x < centerOfFigure.x) {
                    return point
                }
                if (direction === 'down' && point.y < centerOfFigure.y) {
                    return point
                }
                if (direction === 'up' && point.y > centerOfFigure.y) {
                    return point
                }
            }).forEach((point) => {
                pointsBySides[direction] = [point, ...pointsBySides[direction]]
            });
        }
    });


    return pointsBySides;
}
