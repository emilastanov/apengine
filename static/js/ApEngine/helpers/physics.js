
import {G, g} from "../../constants.js";

export const calcBoostBetweenTwoItems = (item1, item2) => {
	return G*item2.weight/((item1.pos.x - item2.pos.x)**2 + (item1.pos.y - item2.pos.y)**2);
}

export const calcFallSpeed = (h) => {
	return (2*g*h)**.5/10;
}
