
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
        document.addEventListener('touchstart', this.touchStartListener.bind(this));
        document.addEventListener('touchend', this.touchEndListener.bind(this));
        document.addEventListener('touchmove',(event)=>{
            event.preventDefault();
        })
    }
}
