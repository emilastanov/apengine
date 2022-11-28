import {SCENE} from "./constants.js"; // ID of HTML object.
import {
    Game, //  The main object of the game. It contains all the properties of the game.
    Item, //  The subject of the game. It can be a game character or any other game object.
    Generator, //  Game object generator.
    Visualizer, //  Game parameters visualizer. Shows any information for the player.
    isSmartphone //  Property showing the player's platform [true/false].
} from "./ApEngine/ApEngine.js";


// Below is a description of the objects of the game:
// 1. The object contains game state properties.
const state = {
    gameEnd: false,
    prevEsc: false,
    collision: false,
    lastPipe: null,
    score: 0,
    isMenuShowed: false,
    isSmartphone: isSmartphone(),
    timer: 0,
};

// 2. Game menu window.
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
};

// 3. Menu button.
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
};

// 4. All required properties of the game scene.
const scene = {
    body: document.getElementById(SCENE),
    width: state.isSmartphone ? window.innerWidth : 600,
    height: state.isSmartphone ? window.innerHeight : 400,
    img: 'static/imgs/fon.png',
    color: "#6699e8",
    gravity: true
};

// 5. Game object generator properties.
const generatorProperties = {
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
};

// 6. Game character properties.
const birdProperties = {
    type: "ball",
    size: state.isSmartphone ? 120 : 30,
    img: "static/imgs/golub1.png",
    name: "bird",
    fallSpeed: state.isSmartphone ? 15 : 5,
};

// 7. The game earth properties.
const earthProperties = {
    type: "box",
    size: {
        width: state.isSmartphone ? window.innerWidth : 600,
        height: state.isSmartphone ? 50 : 10
    },
    color: 'grey',
    zIndex: 100,
    fixed: true
};

// 8. The label of game score.
const scoreLabel = {
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
};

// 9. Background color for smartphone.
if (state.isSmartphone) {
    document.body.style.backgroundColor = "black";
}
// End of description of the objects.




// Descriptions of the business logic of the game.
// Declaration of the game object.
const game = new Game(scene);
// Adding a game object to the generator properties.
generatorProperties.game = game;
// Declaration of the object generator.
const pipes = new Generator(generatorProperties);
// Declaration of the game character.
const bird = new Item(birdProperties);
// Declaration of the game earth.
const earth = new Item(earthProperties);
// Declaration of the visualizer object.
const visualizer = new Visualizer(game);

// Activating use keyboard and touch screen.
game.useKeyboard();
game.useTouchscreen();

// Adding game objects to the game.
game.addItem(bird, {
    x: state.isSmartphone ? 300 : 150,
    y: state.isSmartphone ? window.innerHeight / 2 : 200
});
game.addItem(earth, {
    x: 0,
    y: 0
});
visualizer.addLabel(scoreLabel);

// The game loop. Is a sequence of actions that is performed every frame.
game.loop(() => {

    if (!state.gameEnd) {
        randomFluctuation();
        pipes.generate();
        checkCollision();
        updateScore(pipes);

        bird.useKeyboardForMove({
            speed: state.isSmartphone ? 18 : 6,
            jumpOnly: true
        });
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

const randomFluctuation = () => {
    let fl = Math.round(Math.random() * 150) + 50;
    pipes.setState('posFluctuation', {
        x: 0,
        y: fl,
        maxIter: 3
    },)
};

const checkCollision = () => {
    if (Object.keys(bird.state.collision).reduce((res, side) => (
        res || bird.state.collision[side]
    ), false)) {
        state.collision = true;
        state.gameEnd = true;
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
