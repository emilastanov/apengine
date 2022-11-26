import {SCENE} from "./constants.js";
import {
    Game,
    Item,
    Generator,
    Visualizer,
    isSmartphone
} from "./ApEngine.js";


const scene = document.getElementById(SCENE);

const state = {
    pause: false,
    prevEsc: false,
    collision: false,
    lastPipe: null,
    score: 0,
    isMenuShowed: false,
    isSmartphone: isSmartphone(),
    timer: 0,
};

const menuWrapper = {
    name: 'menu_wrapper',
    pos: {
        x: state.isSmartphone? 200:225,
        y: state.isSmartphone? 500:125
    },
    size: {
        width: state.isSmartphone? 600:150,
        height: state.isSmartphone? 400:100
    },
    params: {
        background: '#383838',
        borderRadius: '15px',
        border: '2px solid #bfbfbf',
        color: 'white'
    }
}

const restartButton = {
    name: 'restart_menu_button',
    size: {
        width: state.isSmartphone? 400:100,
        height: state.isSmartphone? 200:50
    },
    pos: {
        x: state.isSmartphone? 300:252,
        y: state.isSmartphone? 580:160
    },
    params: {
        background: '#bfbfbf',
        borderRadius: '15px',
        border: '2px solid #bfbfbf',
        color: 'white',
        text: 'Try again.',
        fontSize: `${state.isSmartphone ? 75:20}px`,
        padding: `${state.isSmartphone ? 45:10}px 0`,
        boxSizing: "border-box",
        cursor: "pointer"
    }
}


if (state.isSmartphone) {
    document.body.style.backgroundColor = "black";
}

const game = new Game({
    body: scene,
    width: state.isSmartphone ? window.innerWidth : 600,
    height: state.isSmartphone ? window.innerHeight : 400,
    img: 'static/imgs/fon.png',
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
        color: "#797979",
        img: 'static/imgs/dom.png',
        repeat: true,
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
    size: state.isSmartphone ? 120 : 30,
    // color: "yellow",
    img: "static/imgs/golub1.png",
    name: "bird",
    fallSpeed: state.isSmartphone ? 15 : 5,
});

const earth = new Item({
    type: "box",
    size: {
        width: state.isSmartphone ? window.innerWidth : 600,
        height: state.isSmartphone ? 50 : 10
    },
    color: 'grey',
    zIndex: 100,
    fixed: true
});

const visualizer = new Visualizer(game);

game.useKeyboard();
game.useTouchscreen();

game.addItem(ball, {x: state.isSmartphone ? 300 : 150, y: state.isSmartphone ? window.innerHeight / 2 : 200});
game.addItem(earth, {x: 0, y: 0});


visualizer.addLabel({
    name:'score',
    pos:{x: state.isSmartphone ? window.innerWidth / 2 - 150 : 250, y: state.isSmartphone ? window.innerHeight - 300 : 300},
    size:{width: state.isSmartphone ? 300 : 100, height: state.isSmartphone ? 150 : 50},
    params:{
        background: '#383838',
        borderRadius: '15px',
        border: '2px solid #bfbfbf',
        color: 'white',
        text: '0',
        fontSize: `${state.isSmartphone? 120 : 45}px`
    }
});
game.loop(() => {
    checkPause();

    if (!state.pause) {
        randomFluctuation();
        pipes.generate();
        checkCollision();
        updateScore(pipes);

        ball.useKeyboardForMove(
            state.isSmartphone ? 18 : 6,
            game.state.pressedKeyboardButtons,
            true,
            game.state.touchscreenState
        );
    } else {
        if (!state.isMenuShowed){
            visualizer.addLabel(menuWrapper);
            const button = visualizer.addLabel(restartButton);
            button.onclick = (event)=>{
                location.reload();
            };
            button.ontouchend = (event)=>{
                location.reload();
            };
            state.isMenuShowed = true;
        }
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

