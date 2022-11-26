import {Component} from "../component.js";
import {itemAlreadyExist} from "../../errors/errors.js";


export class Visualizer extends Component {
    constructor(game) {
        super();
        this.game = game;
        this.useState({
            objects: {}
        });
    }

    addLabel({name, pos, size, params}){
        if (name in Object.keys(this.state.objects)) {
            throw itemAlreadyExist(name);
        } else {
            const label = document.createElement('h1');
            label.id = `visualizer_${name}`;
            label.style.position = 'absolute';
            label.style.left = `${pos.x}px`;
            label.style.bottom = `${pos.y}px`;
            label.style.zIndex = '1000';
            label.style.display = 'block';
            label.style.width = `${size.width}px`;
            label.style.height = `${size.height}px`;
            label.style.textAlign = 'center';
            label.innerText = params.text ?? "";

            const object = {};
            object[name] = label;

            this.setState('objects', {...object, ...this.state.objects});

            this.updateParams(name, params);

            this.game.state.scene.body.appendChild(label);

            return label;
        }
    }

    removeLabel(object_name){
        this.state.objects[object_name].remove()
        delete this.state.objects[object_name];
    }

    updateParams(object_name, params){
        const object = this.state.objects[object_name];
        if (params.text) {
            object.innerText = params.text;
        }
        Object.keys(params).filter(
            param => (
                param !== 'text'
            )
        ).forEach((param)=>{
            object.style[param] = params[param];
        })
    }
}
