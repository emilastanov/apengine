
export const getPointsOfCircleLyingOnSameLineWithOuterPoint = (
    circle,
    point
) => {
    const k = (point.y-circle.center.y)/(point.x-circle.center.x)

    const x1 = circle.center.x + (circle.radius**2 / (k**2+1))**0.5
    const x2 = circle.center.x - (circle.radius**2 / (k**2+1))**0.5
    const y1 = k*(x1 - circle.center.x) + circle.center.y
    const y2 = k*(x2 - circle.center.x) + circle.center.y

    return [{x: x1, y: y1}, {x: x2, y: y2}]
};

export const getPointsOfRectLyingOnSameLineWithOuterPoint = (
    rect,
    point
) => {
    const center = {
        x: rect.pos.x + rect.width/2,
        y: rect.pos.y + rect.height/2
    }
    const k = (point.y-center.y)/(point.x-center.x);
    const b = center.y - k*center.x;

    const isYInRect = (y) => (rect.pos.y <= y && y <= rect.pos.y + rect.height);
    const isXInRect = (x) => (rect.pos.x <= x && x <= rect.pos.x + rect.width);

    let res = [];
    if ( isYInRect((rect.pos.x + rect.width)*k + b)) {
        res.push({x: rect.pos.x + rect.width, y: (rect.pos.x + rect.width)*k + b});
    } else if (isXInRect((rect.pos.y + rect.height - b)/k)) {
        res.push({x: (rect.pos.y + rect.height - b)/k, y: rect.pos.y + rect.height});
    }
    if ( isYInRect(rect.pos.x*k + b)) {
        res.push({x: rect.pos.x, y: rect.pos.x*k + b});
    } else if (isXInRect((rect.pos.y - b)/k)) {
        res.push({x: (rect.pos.y - b)/k, y: rect.pos.y});
    }
    if (point.x === center.x){
        res.push({x: center.x, y: rect.pos.y + rect.height});
        res.push({x: center.x, y: rect.pos.y});
    }

    return res;
};

export const checkPointInAreaOfItem = (point, item) => {
    if (item.type === 'box') {
        return point.y >= item.state.pos.y &&
            point.y <= item.state.pos.y + item.state.size.height &&
            point.x >= item.state.pos.x &&
            point.x <= item.state.pos.x + item.state.size.width
    } else if (item.type === 'ball') {
        return (point.x - (item.state.pos.x + item.state.size.width / 2)) ** 2 +
            (point.y - (item.state.pos.y + item.state.size.height / 2)) ** 2 <= (item.state.size.width / 2) ** 2;
    }
};
