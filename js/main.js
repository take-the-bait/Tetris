import Map from './tetris/map'
import Menu from './ui/menu'
import Button from './ui/button'
import Gameinfo from './ui/gameinfo'
import Music from './ui/music'
import Background from './ui/background'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        this.mainInterface()

        this.reset()
        this.init()

        // 事件初始化
        this.touchHandler = this.touchStartEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)

        this.touchEndHandler = this.touchEndEventHandler.bind(this)
        canvas.addEventListener('touchend', this.touchEndHandler)
    }

    /**
     * 重置游戏
     */
    reset() {
        this.map = null
        this.menu = null
        this.button = null
        this.gameinfo = null
        this.music = null
        this.background = null
        this.speed = 0
        this.interval = null
        this.touchHandler = null
        this.touchEndHandler = null
        this.pressInterval = null
        this.pressIntervalCount = 0
        this.startLock = false
        this.endLock = false
        this.shortPressLock = false
        this.longPressLock = false
        this.isPause = false
        this.pauseLock = false
        this.gameOver = false

        wx.triggerGC()
    }

    /**
     * 初始化
     * 
     */
    init() {
        this.map = new Map()
        this.menu = new Menu()
        this.button = new Button()
        this.gameinfo = new Gameinfo()
        // this.music = new Music()
        this.background = new Background()

        this.speed = this.gameinfo.speed

        this.startLock = true
    }
    
    /**
     * 开始菜单
     */
    mainInterface() {
        // 使用帧渲染保证图片加载完毕后渲染
        let menuAnimation = requestAnimationFrame(() => {
            if (this.background.isDone()
                && this.menu.isDone()) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                this.background.render(ctx)
                this.menu.mainRender(ctx)
                cancelAnimationFrame(menuAnimation)
            } else {
                this.mainInterface()
            }
        })
    }

    /**
     * 结束菜单
     */
    endInterface() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.background.render(ctx)
        this.menu.endRender(ctx, this.gameinfo.score)
    }

    /**
     * 开始游戏
     */
    startGame() {
        // 碰撞检测
        if (!this.isCollide()) {
            this.endGame()
            return
        }

        // 将方块放进地图
        this.map.pushBox()
        this.render()

        this.interval = setInterval(() => {
            this.update()
        },  this.speed)
    }

    /**
     * 更新
     */
    update() {
        let lock = this.map.update('DOWN')

        this.render()

        if (!lock) {
            clearInterval(this.interval)
            wx.triggerGC()

            this.gameinfo.whenStop()
            this.map.removeRows(() => {
                this.gameinfo.whenRemove()
            })

            this.speed = this.gameinfo.speed
            this.map.newTurn()
            this.startGame()
        }
    }

    /**
     * 游戏结束
     */
    endGame() {
        setTimeout(() => {
            this.endInterface()
            this.endLock = true
        }, 1000)
    }

    /**
     * 触摸开始事件
     */
    touchStartEventHandler(e) {
        e.preventDefault()

        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY

        if (this.endLock) {
            if (x > this.menu.againInfo.x && x < this.menu.againInfo.x + this.menu.againInfo.w && y > this.menu.againInfo.y && y < this.menu.againInfo.y + this.menu.againInfo.h) {
                this.reset()
                this.init()
            }
        }
        if (this.startLock) {
            this.startGame()
            this.startLock = false
        } else {
            if (x > this.button.x && x < this.button.x + this.button.w && y > this.button.y && y < this.button.y + this.button.h) {
                this.pauseLock = true
            } else if (x < 200 && y < 500) {
                this.map.update('LEFT')
                this.render()
            } else if (x >= 200 && y < 500) {
                this.map.update('RIGHT')
                this.render()
            } else if (y >= 500) {
                // 触发短按
                this.shortPressLock = true

                // 设置定时器并计数来确定长按或者短按
                this.pressInterval = setInterval(() => {
                    this.pressIntervalCount++

                    // 如果是长按则执行长按事件
                    if (this.pressIntervalCount > 20) {
                        clearInterval(this.pressInterval)
                        // 触发长按
                        this.longPressLock = true
                        this.longPressHandler()
                    }
                }, 16)
            }
        }
    }

    /**
     * 触摸离开事件
     */
    touchEndEventHandler(e) {
        clearInterval(this.pressInterval)

        // 短按变换方向
        if (this.shortPressLock && this.pressIntervalCount <= 20) {
            this.shortPressHandler()
        }

        // 长按快速下落
        if (this.longPressLock) {
            this.pause()
            this.speed = this.gameinfo.speed
            this.continueGame()
        }

        this.shortPressLock = false
        this.longPressLock = false
        this.pressIntervalCount = 0

        // 暂停按钮
        if (this.pauseLock) {
            this.pauseLock = false
            if (this.isPause) {
                this.isPause = false
                this.continueGame()
            } else {
                this.isPause = true
                this.pause()
            }

            this.render()
        }
    }

    /**
     * 短按事件
     */
    shortPressHandler() {
        this.map.update('ROTATE')
        this.render()
    }

    /**
     * 长按事件
     */
    longPressHandler() {
        this.pause()
        this.speed = 50
        this.continueGame()
    }

    /**
     * 碰撞检测（判断游戏是否结束）
     */
    isCollide() {
        let map = this.map.map
        let box = this.map.nowBox.box
        let x = 0
        let y = 0

        for (let i = 0; i < box.length; i++) {
            x = box[i][0]
            y = box[i][1]

            if (y >= 0) {
                if (map[y][x] > 0) {
                    return false
                }
            }
        }
        return true
    } 

    /**
     *  游戏渲染
     */
    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.background.render(ctx)
        this.map.render(ctx)
        
        let kind = this.isPause ? 'continue' : 'pause'
        this.button.render(ctx, kind)
    }

    /**
     * 暂停
     */
    pause() {
        clearInterval(this.interval)
    }

    /**
     * 继续
     */
    continueGame() {
        this.interval = setInterval(() => {
            this.update()
        }, this.speed)
    }
}