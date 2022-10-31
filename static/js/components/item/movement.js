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
    useKeyboardForMove(speed, keyboardState) {
        ['up', 'down', 'left', 'right'].forEach((direction) => {
            if (keyboardState[direction]) {
                this.move(speed + (this.state.game.state.gravity ? this.state.fallSpeed : 0), direction);
                this.setMovementDirection(direction, true);
            } else {
                this.setMovementDirection(direction, false);
            }
        });
    },
    setMovementDirection(direction, state) {
        const directions = {...this.state.movementDirection};
        directions[direction] = state;

        this.setState("movementDirection", directions);
    }
}
