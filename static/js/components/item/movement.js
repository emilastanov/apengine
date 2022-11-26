
export const movementMixin = {
    setPos(pos) {
        this.setState('pos', pos);
        this.item.style.bottom = `${pos.y}px`;
        this.item.style.left = `${pos.x}px`;
    },
    changePos(pos) {
        let posX = this.state.pos.x;
        let posY = this.state.pos.y;

        if (pos.x !== posX) {
            posX = pos.x
        }
        if (pos.y !== posY) {
            posY = pos.y
        }
        this.setPos({
            x: posX,
            y: posY
        });
    },
    move(speed, direction) {
        this.checkCollision();

        let speedX = 0;
        let speedY = 0;

        if (direction === "up" && !this.state.collision.up) {
            speedY = speed;
        }
        if (direction === "down" && !this.state.collision.down) {
            speedY = -speed;
        }
        if (direction === "left" && !this.state.collision.left) {
            speedX = -speed;
        }
        if (direction === "right" && !this.state.collision.right) {
            speedX = speed;
        }
        this.changePos({
            x: this.state.pos.x + speedX,
            y: this.state.pos.y + speedY
        })
    },
    useKeyboardForMove(speed, keyboardState, jumpOnly=false, touchscreenState=null) {
        if(!jumpOnly){
            ['up', 'down', 'left', 'right'].forEach((direction) => {
                if (keyboardState[direction]) {
                    this.setMovementDirection(direction, true);
                    this.move(speed + (this.state.game.state.gravity ? this.state.fallSpeed : 0), direction);
                } else {
                    this.setMovementDirection(direction, false);
                }
            });
        }
        this.jump(speed, keyboardState['space'], touchscreenState?.['touched']);
    },
    setMovementDirection(direction, state) {
        const directions = {...this.state.movementDirection};
        directions[direction] = state;

        this.setState("movementDirection", directions);
    },
    jump (speed, keyboardState, touchscreenState) {
        const state = keyboardState || touchscreenState;
        if (state && !this.state.inJump){
            for (let i = 0; i < 10;i++){
                this.move(speed, 'up');
            }
            this.setState('inJump', true);
        } else if (!state) {
            this.setState('inJump', false);
        }
    }
}
