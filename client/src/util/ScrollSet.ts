/**
 * 用于设置滚动条的帮助类
 */
export default class SetScrollHelper {

    private timer: any

    constructor(public dom: HTMLElement) { }

    public setX(target: number) {
        this.dom.scrollLeft = target;
    }

    public setY(target: number) {
        this.dom.scrollTop = target;
    }

    public set(targetX: number, targetY: number) {
        this.setX(targetX);
        this.setY(targetY);
    }

    public animateSet(targetX: number, targetY: number, duration: number = 500) {
        clearInterval(this.timer);
        const times = Math.ceil(duration / 16);
        let curtimes = 0;
        let curX = this.dom.scrollLeft;
        let curY = this.dom.scrollTop;
        const desX = targetX - curX;
        const desY = targetY - curY;
        const moveX = desX / times;
        const moveY = desY / times;
        this.timer = setInterval(() => {
            curtimes++;
            curX = this.dom.scrollLeft;
            curY = this.dom.scrollTop;
            this.set(curX + moveX, curY + moveY);
            if (curtimes >= times) {
                console.log(this.dom.scrollLeft, targetX, this.dom.scrollTop, targetY);
                this.set(targetX, targetY);
                clearInterval(this.timer);
            }
        }, 16)
    }
}