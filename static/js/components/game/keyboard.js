
export const keyboardMixin = {
    keyDownListener (event){
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
            case 32:
                event.preventDefault();
                this.changeKeyboardButtonState("space", true);
                break;
            case 27:
                event.preventDefault();
                this.changeKeyboardButtonState("esc", true);
                break;
            default:
                break;
        }
    },
    keyUpListener (event){
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
            case 32:
                event.preventDefault();
                this.changeKeyboardButtonState("space", false);
                break;
            case 27:
                event.preventDefault();
                this.changeKeyboardButtonState("esc", false);
                break;
            default:
                // console.log(event.keyCode)
                break;
        }
    },
    useKeyboard () {
        document.addEventListener("keydown", this.keyDownListener.bind(this));
        document.addEventListener("keyup", this.keyUpListener.bind(this));
    },

    changeKeyboardButtonState (btn, state) {
        if(this.state.pressedKeyboardButtons[btn] !== state) {
            const pressedKeyboardButtons = {...this.state.pressedKeyboardButtons};
            pressedKeyboardButtons[btn] = state;
            this.setState('pressedKeyboardButtons',pressedKeyboardButtons);
        }
    }
}
