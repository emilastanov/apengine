
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

export const detectSideOfCircle = (
    circle,
    point
) => {
    const leftSideLine = circle.center.x - circle.radius/(2**0.5);
    const rightSideLine = circle.center.x + circle.radius/(2**0.5);
    const topSideLine = circle.center.y + circle.radius/(2**0.5);
    const bottomSideLine = circle.center.y - circle.radius/(2**0.5);

    const isPointInCircle = ({x,y}) => ((x-circle.center.x)**2 + (y-circle.center.y)**2 <= circle.radius**2);

    if (isPointInCircle(point) && point.x <= leftSideLine) {
        return 'left';
    } else if (isPointInCircle(point) && point.x >= rightSideLine) {
        return 'right';
    } else if (isPointInCircle(point) && point.y >= topSideLine) {
        return 'up';
    } else if (isPointInCircle(point) && point.y <= bottomSideLine) {
        return 'down';
    } else {
        return null;
    }
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
