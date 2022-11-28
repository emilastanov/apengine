import {SCENE} from "./constants.js";
import {Game} from "./ApEngine/components/game/index.js";
import {isSmartphone, Item} from "./ApEngine/ApEngine.js"; // ID of HTML object.

const state = {
    isSmartphone: isSmartphone()
};

const scene = {
    body: document.getElementById(SCENE),
    width: state.isSmartphone ? window.innerWidth : 600,
    height: state.isSmartphone ? window.innerHeight : 400,
    color: "#6699e8",
    gravity: false
};

const ballProperties = {
    type: "ball",
    size: state.isSmartphone ? 120 : 30,
    color: "darkred",
    name: "bird",
    fallSpeed: state.isSmartphone ? 15 : 5,
}

const game = new Game(scene);

const ball = new Item(ballProperties);

game.addItem(ball, {x: 100, y: 100});

game.useKeyboard();
game.useTouchscreen();

game.loop(()=>{
    ball.useKeyboardForMove({
        speed: state.isSmartphone ? 18 : 6,
        isJumpOn: false
    });
})



