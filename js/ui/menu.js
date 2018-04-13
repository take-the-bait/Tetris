const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const TITLE_IMG_SRC = 'images/title.png'
const START_IMG_SRC = 'images/start.png'
const LOGO_IMG_SRC = 'images/logo.png'
const COPYRIGHT_IMG_SRC = 'images/copyright.png'
const SCORE_IMG_SRC = 'images/score.png'
const DIG_IMG_SRC = ['images/0.png', 
                                        'images/1.png',
                                        'images/2.png',
                                        'images/3.png',
                                        'images/4.png',
                                        'images/5.png',
                                        'images/6.png',
                                        'images/7.png',
                                        'images/8.png',
                                        'images/9.png']
const AGAIN_IMG_SRC = 'images/again.png'


export default class Menu {
    constructor() {
        this.title = null
        this.start = null
        this.logo = null
        this.copyright = null
        this.startInfo = {}
        this.againInfo = {}

        this.init()
    }

    /**
     * 初始化
     */
    init() {
        this.title = new Image()
        this.title.src = TITLE_IMG_SRC

        this.start = new Image()
        this.start.src = START_IMG_SRC

        this.logo = new Image()
        this.logo.src = LOGO_IMG_SRC

        this.copyright = new Image()
        this.copyright.src = COPYRIGHT_IMG_SRC

        this.score = new Image()
        this.score.src = SCORE_IMG_SRC

        this.dig = []

        this.dig[0] = new Image()
        this.dig[0].src = DIG_IMG_SRC[0]

        this.dig[1] = new Image()
        this.dig[1].src = DIG_IMG_SRC[1]

        this.dig[2] = new Image()
        this.dig[2].src = DIG_IMG_SRC[2]

        this.dig[3] = new Image()
        this.dig[3].src = DIG_IMG_SRC[3]

        this.dig[4] = new Image()
        this.dig[4].src = DIG_IMG_SRC[4]

        this.dig[5] = new Image()
        this.dig[5].src = DIG_IMG_SRC[5]

        this.dig[6] = new Image()
        this.dig[6].src = DIG_IMG_SRC[6]

        this.dig[7] = new Image()
        this.dig[7].src = DIG_IMG_SRC[7]

        this.dig[8] = new Image()
        this.dig[8].src = DIG_IMG_SRC[8]

        this.dig[9] = new Image()
        this.dig[9].src = DIG_IMG_SRC[9]

        this.again = new Image()
        this.again.src = AGAIN_IMG_SRC
    }

    /**
     * 主菜单的渲染
     */
    mainRender(ctx) {
        let x = 0, y = 0, w = 0, h = 0

        w = this.title.width / 2
        h = this.title.height / 2
        x = (SCREEN_WIDTH - w) / 2
        y = (SCREEN_HEIGHT - h) / 4
        ctx.drawImage(
            this.title,
            x,
            y,
            w,
            h
        )

        y += this.title.height / 2 + 150
        w = this.start.width / 2
        h = this.start.height / 2
        x = (SCREEN_WIDTH - w) / 2
        ctx.drawImage(
            this.start,
            x,
            y,
            w,
            h
        )

        w = this.logo.width / 2
        h = this.logo.height / 2
        x = SCREEN_WIDTH - w - 10
        y = SCREEN_HEIGHT - h - 10
        ctx.drawImage(
            this.logo,
            x,
            y,
            w,
            h
        )

        w = this.copyright.width / 2
        h = this.copyright.height / 2
        x = (SCREEN_WIDTH - w) / 2
        y = SCREEN_HEIGHT - h - 10
        ctx.drawImage(
            this.copyright,
            x,
            y,
            w,
            h
        )
    }

    /**
     * 结束菜单的渲染
     */
    endRender(ctx, score) {
        let w = 0, h = 0, x =0, y = 0
        w = this.score.width / 2
        h = this.score.height / 2
        x = (SCREEN_WIDTH - w) / 2
        y = (SCREEN_HEIGHT - h) / 4
        ctx.drawImage(
            this.score,
            x,
            y,
            w,
            h
        )

        score += ''
        w = this.dig[0].width / 2
        h = this.dig[0].height / 2
        x = (SCREEN_WIDTH - w * score.length) / 2
        y = (SCREEN_HEIGHT - h) / 2
        for (let i = 0; i < score.length; i++) {
            ctx.drawImage(
                this.dig[score[i]],
                x + w * i,
                y,
                w,
                h
            )
        }

        w = this.again.width / 2
        h = this.again.height / 2
        x = (SCREEN_WIDTH - w) / 2
        y = SCREEN_HEIGHT - h - 130

        this.againInfo.w = w
        this.againInfo.h = h
        this.againInfo.x = x
        this.againInfo.y = y
        ctx.drawImage(
            this.again,
            x,
            y,
            w,
            h
        )
    }

    /**
     * 预加载
     */
    isDone() {
        if (this.title.width !== 0
            && this.logo.width !== 0
            && this.start.width !== 0
            && this.copyright.width !== 0)
        return true

        return false
    }
}