
export const fluctuationsMixin = {
    setFluctuation() {
        let doChange = true;

        let pow = Math.floor(Math.random() * 2);

        let futurePos = [...this.state.beginPos.map((pos) => ({
            x: pos.x + ((-1) ** pow) * this.state.posFluctuation.x,
            y: pos.y + ((-1) ** pow) * this.state.posFluctuation.y
        }))];

        futurePos.forEach((pos,key)=>{
            if (pos.x !== this.state.beginPos[key].x &&
                (pos.x + this.itemOptions.size.width <= 0 ||
                    pos.x >= this.game.state.scene.width)
            ) {
                doChange = false;
            }

            if (pos.y !== this.state.beginPos[key].y &&
                (pos.y >= this.game.state.scene.height ||
                    pos.y + this.itemOptions.size.height <= 0)
            ) {
                doChange = false;
            }
        });

        if (doChange){
            this.setState('beginPos', futurePos);
        }
    }
}
