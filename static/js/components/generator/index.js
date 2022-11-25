import {Component} from "../component.js";
import {getRandomId} from "../../helpers/random.js";
import {visualizerMixin} from "./visualizer.js";
import {fluctuationsMixin} from "./fluctuations.js";
import {itemsMixin} from "./items.js";


export class Generator extends Component {

    constructor({
                    itemOptions,
                    frequency,
                    game,
                    beginPos,
                    move,
                    posFluctuation = null,
                    removeIfOutside = false,
                    showTime = false
                }) {
        super();
        this.itemOptions = itemOptions;
        this.timer = 0;
        this.game = game;
        this.id = getRandomId();
        this.useState({
            frequency: frequency,
            showTime: showTime,
            beginPos: beginPos,
            removeOutSide: removeIfOutside,
            posFluctuation: posFluctuation,
            generatedItems: [],
            move: move
        });
        this.iter = 0;
    }

    generate() {
        if (this.state.showTime) {
            this.showTime();
        }

        if (Math.round(this.timer / this.state.frequency) !== this.iter) {
            this.generateItem();
            this.iter += 1;
        }

        this.moveItems();
        this.removeInvisibleItems();

        this.timer += 1;
    }

}

Object.assign(Generator.prototype, visualizerMixin);
Object.assign(Generator.prototype, fluctuationsMixin);
Object.assign(Generator.prototype, itemsMixin);
