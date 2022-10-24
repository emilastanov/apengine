"use strict";
import {STATE_IS_NOT_USE} from "../errors/errors.js";

export default class Component {

	useState(state) {
		this.state = state;
		this.prevState = null;
	}

	setState(state, value) {
		if (this.state !== null) {
			if (this.prevState == null) {
				this.prevState = {...this.state};
			}

			this.prevState[state] = this.state[state];
			this.state[state] = value;
		} else {
			throw STATE_IS_NOT_USE;
		}
	}
};