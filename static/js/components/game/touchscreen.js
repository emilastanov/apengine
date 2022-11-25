
export const touchscreenMixin = {
    useTouchscreen() {
        document.addEventListener('touchstart', (event)=>{
            event.preventDefault();
            this.setState('touchscreenState', {touched: true});
        });
        document.addEventListener('touchend', (event)=>{
            event.preventDefault();
            this.setState('touchscreenState', {touched: false});
        });
        document.addEventListener('touchmove',(event)=>{
            event.preventDefault();
        })
    }
}
