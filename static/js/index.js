import {SCENE} from "./constants.js";
import Game from "./components/game/index.js";
import Item from "./components/item/index.js";
import Generator from "./components/generator/index.js";
import Visualizer from "./components/visualizer/index.js";
import {isSmartphone} from "./helpers/detectors.js";

const scene = document.getElementById(SCENE);

const state = {
    pause: false,
    prevEsc: false,
    collision: false,
    lastPipe: null,
    score: 0,
    isSmartphone: isSmartphone()
};

const game = new Game({
    body: scene,
    width: state.isSmartphone ? window.innerWidth : 600,
    height: state.isSmartphone ? window.innerHeight : 400,
    color: "#6699e8",
    gravity: true
});


const pipes = new Generator({
    game: game,
    itemOptions: {
        type: "box",
        size: {
            width: state.isSmartphone ? 300 : 100,
            height: state.isSmartphone ? window.innerHeight : 300
        },
        color: "#1c750b"
    },
    beginPos: [
        {
            x: state.isSmartphone ? window.innerWidth : 600,
            y: state.isSmartphone ? 0 - window.innerHeight / 2 - 175 : -150
        },
        {
            x: state.isSmartphone ? window.innerWidth : 600,
            y: state.isSmartphone ? window.innerHeight / 2 + 175 : 250
        },
    ],
    posFluctuation: {
        x: 0,
        y: 100,
        maxIter: 3
    },
    move: {
        speed: state.isSmartphone ? 6 : 2,
        direction: "left"
    },
    frequency: 100,
    removeIfOutside: true
});

const ball = new Item({
    type: "ball",
    size: state.isSmartphone ? 150 : 30,
    color: "yellow",
    name: "ball",
    fallSpeed: state.isSmartphone ? 15 : 5,
});

const earth = new Item({
    type: "box",
    size: {
        width: state.isSmartphone ? window.innerWidth : 600,
        height: state.isSmartphone ? 150 : 25
    },
    color: '#debb06',
    zIndex: 100,
    fixed: true
});

const visualizer = new Visualizer(game);

game.useKeyboard();
game.useTouchscreen();

game.addItem(ball, {x: state.isSmartphone ? 300 : 150, y: state.isSmartphone ? window.innerHeight / 2 : 100});
game.addItem(earth, {x: 0, y: 0});

visualizer.addLabel(
    'score',
    {x: state.isSmartphone ? window.innerWidth / 2 - 150 : 250, y: state.isSmartphone ? window.innerHeight - 300 : 300},
    {width: state.isSmartphone ? 300 : 100, height: state.isSmartphone ? 150 : 50},
    {
        background: '#f6dd55',
        borderRadius: '15px',
        border: '2px solid #bfbfbf',
        color: 'grey',
        text: '0'
    }
);

game.loop(() => {
    checkPause();
    if (!state.pause) {
        randomFluctuation();
        pipes.generate();
        checkCollision();
        updateScore(pipes);
        ball.useKeyboardForMove(state.isSmartphone ? 18 : 6, game.state.pressedKeyboardButtons, true, game.state.touchscreenState);
    }

}, 16);

const checkPause = () => {
    if (game.state.pressedKeyboardButtons.esc && !state.prevEsc) {
        state.pause = !state.pause;
        state.prevEsc = true;
    } else if (!game.state.pressedKeyboardButtons.esc) {
        state.prevEsc = false;
    }
};

const randomFluctuation = () => {
    let fl = Math.round(Math.random() * 150) + 50;
    pipes.setState('posFluctuation', {
        x: 0,
        y: fl,
        maxIter: 3
    },)
};

const checkCollision = () => {
    if (Object.keys(ball.state.collision).reduce((res, side) => (
        res || ball.state.collision[side]
    ), false)) {
        state.collision = true;
        state.pause = true;
    }
};

const updateScore = (pipes) => {
    const lastPipe = pipes.state.generatedItems.slice(-1)[0];
    if (lastPipe && lastPipe !== state.lastPipe && lastPipe.state.pos.x + lastPipe.state.size.width < (state.isSmartphone ? 300 : 150)) {
        state.score += 1;
        visualizer.updateParams('score', {text: state.score});
        state.lastPipe = lastPipe;
    }
};
