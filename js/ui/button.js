const PAUSE_BUTTON_SRC = 'images/pause.png'
const CONTINUE_BUTTON_SRC = 'images/continue.png'
export default class Button {
    constructor() {
        this.pauseButton = null
        this.continueButton = null
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0

        this.init()
    }

    init() {
        this.pauseButton = new Image()
        this.pauseButton.src = PAUSE_BUTTON_SRC

        this.continueButton = new Image()
        this.continueButton.src = CONTINUE_BUTTON_SRC

        this.x = 20
        this.y = 20
        this.w = 45
        this.h = 45
    }

    render(ctx, kind) {
        let button = kind === 'pause' ? this.pauseButton : this.continueButton
        ctx.drawImage(
            button,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }
}