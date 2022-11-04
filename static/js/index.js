import {SCENE} from "./constants.js";
import Game from "./components/game/index.js";
import Item from "./components/item/index.js";

const scene = document.getElementById(SCENE);

const game = new Game({
	body: scene,
	width: 600,
	height: 400,
	color: "#6699e8",
	gravity: true
});


const ball1 = new Item({
	type: "ball",
	size: 50,
	color: "yellow",
	name: "ball1",
	fallSpeed: 5,
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
	fixed: false,
	fallSpeed: 10
});

const box2 = new Item({
	type: "box",
	size: {
		width: 70,
		height: 40
	},
	color: "black",
	name: "box2",
	fixed: true,
	fallSpeed: 5
});

game.addItem(ball1, {x: 150, y: 150});
game.addItem(box2, {x: 400, y: 150});
game.addItem(earth, {x: 0, y: 0});
game.addItem(box1, {x: 300, y: 200});
game.useKeyboard();

game.loop(()=>{
	ball1.useKeyboardForMove(5, game.state.pressedKeyboardButtons);
	if(ball1.state.collision.left && ball1.state.collision.right){
		ball1.changePos({x: 150, y: 150})
	}
	// box2.useKeyboardForMove(5, game.state.pressedKeyboardButtons);

},16)

