
export const visualizerMixin = {
    showTime() {
        let label = document.getElementById(`generator${this.id}`);
        if (!label) {
            label = document.createElement('h1');
            label.id = `generator${this.id}`;
            label.style.position = 'absolute';
            label.style.right = '0';
            this.game.state.scene.body.appendChild(label);
        }
        label.innerText = this.timer;
    }
}
