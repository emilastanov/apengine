import {SCENE} from "./constants.js";
import Game from "./components/game/index.js";
import Item from "./components/item/index.js";
import {getPointsOfCircleLyingOnSameLineWithOuterPoint} from "./helpers/geometry.js";

const scene = document.getElementById(SCENE);

const game = new Game({
	body: scene,
	width: 600,
	height: 400,
	color: "#6699e8",
	gravity: false
});


const ball1 = new Item({
	type: "ball",
	size: 50,
	color: "yellow",
	name: "ball1",
	fallSpeed: 5	
});


const earth = new Item({
	type: "box",
	size: {
		width: 600,
		height: 50
	},
	color: "#916330",
	name: "earth",
	fixed: true
});

const box1 = new Item({
	type: "box",
	size: {
		width: 70,
		height: 70
	},
	color: "black",
	name: "box1",
	fallSpeed: 5
});

const box2 = new Item({
	type: "box",
	size: {
		width: 75,
		height: 50
	},
	color: "gray",
	name: "box2",
	fallSpeed: 5
});
const point1 = new Item({
	type: "ball",
	size: 5,
	color: "red",
	name: "point1",
})
const point2 = new Item({
	type: "ball",
	size: 5,
	color: "red",
	name: "point2",
})

game.addItem(ball1, {x: 150, y: 150});
// game.addItem(earth, {x: 0, y: 0});
game.addItem(box1, {x: 300, y: 200});
// game.addItem(box2, {x: 400, y: 200});
game.useKeyboard();
let counter = 0;
game.loop(()=>{
	ball1.useKeyboardForMove(1, game.state.pressedKeyboardButtons);
	if (counter === 0) {
		counter =1
	}
},15)

