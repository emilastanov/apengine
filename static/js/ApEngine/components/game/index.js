import {
    SCENE_NOT_FOUND
} from "../../errors/errors.js";
import {Component} from "../component.js";
import {itemMixin} from "./items.js";
import {gravityMixin} from "./gravity.js";
import {keyboardMixin} from "./keyboard.js";
import {touchscreenMixin} from "./touchscreen.js";


// Game instance
export class Game extends Component{

    constructor (scene) {
        super();
        this.useState({
            scene: scene,
            gravity: scene.gravity,
            items: [],
            pressedKeyboardButtons: {},
            touchscreenState: {}
        });
        this.loopId = null;

        if (scene){
            this.state.width = scene.width;
            this.state.height = scene.height;
            scene.body.style.backgroundColor = scene.color;
            scene.body.style.height = `${scene.height}px`;
            scene.body.style.width = `${scene.width}px`;
            scene.body.style.position = 'relative';
            scene.body.style.overflow = 'hidden';
            scene.body.style.backgroundSize = 'cover';
            if(scene.img) {
                scene.body.style.backgroundImage = `url(${scene.img})`
            }
        }
        else { throw SCENE_NOT_FOUND; }
    }

    loop (func, interval=10) {
        this.loopId = setInterval(
            ()=>{
                if(this.state.gravity) {this.useGravity();}
                func();
            },
            interval
        );
    }

    stop () {
        clearInterval(this.loopId);
        document.removeEventListener('keyup', this.keyUpListener);
        document.removeEventListener('keydown', this.keyDownListener);
        document.removeEventListener('touchstart', this.touchStartListener);
        document.removeEventListener('touchend', this.touchEndListener);
    }
}

Object.assign(Game.prototype, keyboardMixin);
Object.assign(Game.prototype, gravityMixin);
Object.assign(Game.prototype, itemMixin);
Object.assign(Game.prototype, touchscreenMixin);
