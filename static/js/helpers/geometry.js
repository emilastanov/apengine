
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
}