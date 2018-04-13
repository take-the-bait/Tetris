const BACKGROUND_IMG_SRC = 'images/background.png'

export default class Background {
    constructor() {
        this.img = null

        this.init()
    }

    init() {
        this.img = new Image()
        this.img.src = BACKGROUND_IMG_SRC
    }

    render(ctx) {
        ctx.drawImage(
            this.img,
            0,
            0,
            window.innerWidth,
            window.innerHeight
        )
    }

    /**
     * 预加载
     */
    isDone() {
        if (this.img.width !== 0) return true

        return false 
    }
}