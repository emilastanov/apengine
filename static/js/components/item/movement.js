
export const movementMixin = {
    setPos (pos) {
        this.setState('pos', pos);
        this.item.style.bottom = `${pos.y}px`;
        this.item.style.left = `${pos.x}px`;
    },
    changePos (pos){
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
    move (speed, direction){
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
    useKeyboardForMove(speed, keyboardState) {
        if(keyboardState['up']) {
            this.move(speed + (this.state.game.state.gravity? this.state.fallSpeed : 0), 'up')
        }
        if(keyboardState['down']) {
            this.move(speed, 'down')
        }
        if(keyboardState['left']) {
            this.move(speed, 'left')
        }
        if(keyboardState['right']) {
            this.move(speed, 'right')
        }
    }
}
