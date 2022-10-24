"use strict";

export const keyboardMixin = {
    useKeyboard () {
        document.addEventListener("keydown", (event)=>{
            switch (event.keyCode) {
                case 87:
                case 38:
                    event.preventDefault();
                    this.changeKeyboardButtonState("up", true);
                    break;
                case 65:
                case 37:
                    event.preventDefault();
                    this.changeKeyboardButtonState("left", true);
                    break;
                case 68:
                case 39:
                    event.preventDefault();
                    this.changeKeyboardButtonState("right", true);
                    break;
                case 83:
                case 40:
                    event.preventDefault();
                    this.changeKeyboardButtonState("down", true);
                    break;
                default:
                    // console.log(event.keyCode)
                    break;
            }
        });
        document.addEventListener("keyup", (event)=>{
            switch (event.keyCode) {
                case 87:
                case 38:
                    event.preventDefault();
                    this.changeKeyboardButtonState("up", false);
                    break;
                case 65:
                case 37:
                    event.preventDefault();
                    this.changeKeyboardButtonState("left", false);
                    break;
                case 68:
                case 39:
                    event.preventDefault();
                    this.changeKeyboardButtonState("right", false);
                    break;
                case 83:
                case 40:
                    event.preventDefault();
                    this.changeKeyboardButtonState("down", false);
                    break;
                default:
                    console.log(event.keyCode)
                    break;
            }
        });
    },

    changeKeyboardButtonState (btn, state) {
        if(this.state.pressedKeyboardButtons[btn] !== state) {
            const pressedKeyboardButtons = {...this.state.pressedKeyboardButtons};
            pressedKeyboardButtons[btn] = state;
            this.setState('pressedKeyboardButtons',pressedKeyboardButtons);
        }
    }
}
