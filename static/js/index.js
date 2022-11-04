import {SCENE} from "./constants.js";
import Game from "./components/game/index.js";
import Item from "./components/item/index.js";
import Generator from "./components/generator/index.js";

const scene = document.getElementById(SCENE);

const game = new Game({
	body: scene,
	width: 600,
	height: 400,
	color: "#6699e8",
	gravity: true
});


const pipes = new Generator({
	game: game,
	itemOptions: {
		type: "box",
		size: {
			width: 100,
			height: 300
		},
		color: "#2f8a2f"
	},
	beginPos: [
		{x: 600, y: -150},
		{x: 600, y: 250},
	],
	posFluctuation: {
		x: 0,
		y: 50,
		maxIter: 3
	},
	move: {
		speed: 2,
		direction: "left"
	},
	frequency: 100,
	removeIfOutside: true,
	showTime: true
});

const ball = new Item({
	type: "ball",
	size: 30,
	color: "yellow",
	name: "ball",
	fallSpeed: 5,
});

game.useKeyboard();

game.addItem(ball, {x: 50, y: 200})

game.loop(()=>{

	pipes.generate();
	ball.useKeyboardForMove(5, game.state.pressedKeyboardButtons, true);

},16)

