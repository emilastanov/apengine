
export const touchscreenMixin = {
    touchStartListener (event){
        event.preventDefault();
        this.setState('touchscreenState', {touched: true});
    },
    touchEndListener (event){
        event.preventDefault();
        this.setState('touchscreenState', {touched: false});

        this.prevPos = null;
        this.changeKeyboardButtonState("right", false);
        this.changeKeyboardButtonState("left", false);
        this.changeKeyboardButtonState("up", false);
        this.changeKeyboardButtonState("down", false);
    },

    moveDetected: false,
    prevPos: null,
    moveListener (event){
        event.preventDefault();
        if (!this.moveDetected){
            this.moveDetected = true;

            let pos = {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY
            };

            if (this.prevPos) {
                console.log("x",this.prevPos.x-pos.x)
                if (this.prevPos.x - pos.x < -30){
                    this.changeKeyboardButtonState("right", true);
                } else if (this.prevPos.x - pos.x > 30) {
                    this.changeKeyboardButtonState("left", true);
                }
                console.log("y",this.prevPos.y-pos.y)
                if (this.prevPos.y - pos.y > 30){
                    this.changeKeyboardButtonState("up", true);
                } else if (this.prevPos.y - pos.y < -30) {
                    this.changeKeyboardButtonState("down", true);
                }
            }

            this.prevPos = pos;

            setTimeout(()=>{
                this.moveDetected = false;
            },100);
        }
    },

    useTouchscreen(){
        document.addEventListener('touchstart', this.touchStartListener.bind(this));
        document.addEventListener('touchend', this.touchEndListener.bind(this));
        document.addEventListener('touchmove',this.moveListener.bind(this));
    }
}
