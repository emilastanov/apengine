
export const touchscreenMixin = {
    touchStartListener (event){
        event.preventDefault();
        this.setState('touchscreenState', {touched: true});
    },
    touchEndListener (event){
        event.preventDefault();
        this.setState('touchscreenState', {touched: false});
    },
    useTouchscreen() {
        document.addEventListener('touchstart', this.touchStartListener);
        document.addEventListener('touchend', this.touchEndListener);
        document.addEventListener('touchmove',(event)=>{
            event.preventDefault();
        })
    }
}
