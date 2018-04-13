import DataBus from '../databus'
import Box from '../tetris/box'

const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight

const BOX_WIDTH = parseInt(window.innerWidth / 18)
const BOX_IMG_SRC = ['images/box_1.png', 'images/box_2.png', 'images/box_3.png', 'images/box_4.png', 'images/box_5.png']
const MAP_IMG_SRC = 'images/map.png'


let MAP = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

let databus = new DataBus()

/**
 * 生成一张12*21的地图
 */
export default class Map {
    constructor() {
        this.map = MAP

        this.nowBox = null
        this.nowBoxCopy = null
        this.nextBox = null

        this.boxImgA = new Image()
        this.boxImgA.src = BOX_IMG_SRC[0]

        this.boxImgB = new Image()
        this.boxImgB.src = BOX_IMG_SRC[1]

        this.boxImgC = new Image()
        this.boxImgC.src = BOX_IMG_SRC[2]

        this.boxImgD = new Image()
        this.boxImgD.src = BOX_IMG_SRC[3]

        this.boxImgE = new Image()
        this.boxImgE.src = BOX_IMG_SRC[4]

        this.mapImg = new Image()
        this.mapImg.src = MAP_IMG_SRC

        this.boxWidth = BOX_WIDTH
        this.boxHeight = BOX_WIDTH

        this.mapX = (SCREEN_WIDTH - BOX_WIDTH * 12) / 2
        this.mapY = (SCREEN_HEIGHT - BOX_WIDTH * 21) / 2.5
        this.boxX = 0
        this.boxY = 0

        this.init()
    }

    /**
     * 初始化
     */
    init() {
        // 初始化地图
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                this.map[i][j] = 0
            }
        }
        this.nowBox = databus.pool.getItemByClass('Box', Box)
        this.nextBox = databus.pool.getItemByClass('Box', Box)

        // 对生成的坐标进行处理，初始化在地图中央位置
        let nowBox = this.nowBox.box

        for (let i = 0; i < nowBox.length; i++) {
            nowBox[i][0] += 6
        }

        let nextBox = this.nextBox.cloneBox = this.arrCopy(this.nextBox.box)
        for (let i = 0; i < nextBox.length; i++) {
            nextBox[i][0] += Math.abs(this.nextBox.xNumber[0])
            nextBox[i][1] += Math.abs(this.nextBox.yNumber[0])
        }
    }

    /**
     * 更新地图
     * nowBox纵坐标+1进行碰撞检测，
     * 碰到则并返回false，
     * 没碰到则添加方块到地图中并返回true
     */
    update(mode) {
        let m = mode
        let map = this.map
        let box = this.nowBox.box
        let boxCopy = this.nowBoxCopy = this.arrCopy(box)
        let x = 0
        let y = 0

        switch (m) {
            case 'DOWN':
                // 将所有坐标的y轴+1
                for (let i = 0; i < boxCopy.length; i++) {
                    boxCopy[i][1]++

                    // 只要有一个y值大于20，则返回false
                    if (boxCopy[i][1] > 20) return false
                }
                break
            case 'LEFT':
                x = 11
                // 左移
                for (let i = 0; i < boxCopy.length; i++) {
                    boxCopy[i][0]--

                    //只要有一个x值小于0，则返回false
                    if (x < 0) return false
                }
                break
            case 'RIGHT':
                //  右移
                for (let i = 0; i < boxCopy.length; i++) {
                    boxCopy[i][0]++

                    //只要有一个x值大于11，则返回false
                    if (x > 11) return false
                }
                break
            case 'ROTATE':
                // 如果方块是正方形，则不做任何改动
                if (this.nowBox.index === 1) return false
                this.nowBox.direction++
                if (this.nowBox.direction > 3) {
                    this.nowBox.direction = 0
                }

                // 重新生成方块
                this.nowBox.generate()

                for (let i = 0; i < this.nowBox.box.length; i++) {
                    this.nowBox.box[i][0] += 6
                }

                let differenceX = 0
                let differenceY = 0
                let n = 0
                let o = 0
                // 得到初始化的方块和现在的方块的差值
                // 并对得到的方块进行微调使其能在旋转中更加美观流畅
                switch (this.nowBox.index) {
                    case 0:
                        if (this.nowBox.direction === 0 || this.nowBox.direction === 2) {
                            n = 0
                            o = 1
                        } else {
                            n = 1
                            o = 0
                        }
                        break
                    case 2:
                        if (this.nowBox.direction === 0) {
                            n = 2
                            o = 2
                        } else if (this.nowBox.direction === 1) {
                            n = 3
                            o = 3
                        }
                        break
                    case 3:
                        if (this.nowBox.direction === 3) {
                            n = 2
                            o = 1
                        } else if (this.nowBox.direction === 0) {
                            n = 0
                            o = 1
                        }
                        break
                    case 4:
                        if (this.nowBox.direction === 3) {
                            n = 1
                            o = 2
                        } else if (this.nowBox.direction === 0) {
                            n = 0
                            o = 1
                        }
                        break
                    case 6:
                        if (this.nowBox.direction === 0 || this.nowBox.direction === 2) {
                            n = 1
                            o = 0
                        } else if (this.nowBox.direction === 1 || this.nowBox.direction === 3) {
                            n = 0
                            o = 1
                        }
                    default:
                        break
                }
                differenceX = boxCopy[n][0] - this.nowBox.box[o][0]
                differenceY = boxCopy[n][1] - this.nowBox.box[o][1]


                // 补齐差值
                for (let i = 0; i < this.nowBox.box.length; i++) {
                    this.nowBox.box[i][0] += differenceX
                    this.nowBox.box[i][1] += differenceY
                }

                // 将重新生成的方块赋给boxCopy
                let temp = this.arrCopy(this.nowBox.box)
                this.nowBox.box = boxCopy
                this.nowBoxCopy = boxCopy = temp
                break
            default:
                break
        }

        if (!this.isCollide()) {
            if (m === 'ROTATE') {
                this.nowBox.direction--
                if (this.nowBox.direction < 0) {
                    this.nowBox.direction = 3
                }
            }
            return false
        }

        this.removeBox(box)
        this.nowBox.box = boxCopy
        this.pushBox()

        return true
    }

    /**
     * 碰撞检测
     */
    isCollide() {
        let map = this.map
        let box = this.nowBox.box
        let boxCopy = this.nowBoxCopy
        let collideCoord = []
        let sign = true
        let x = 0
        let y = 0
        // 得到需要碰撞检测的坐标
        for (let i = 0; i < boxCopy.length; i++) {
            sign = true
            for (let j = 0; j < box.length; j++) {
                if (boxCopy[i][0] === box[j][0]
                    && boxCopy[i][1] === box[j][1]) {

                    sign = false
                    break
                }
            }
            if (sign) collideCoord.push([boxCopy[i][0], boxCopy[i][1]])
        }

        for (let i = 0; i < collideCoord.length; i++) {
            x = collideCoord[i][0]
            y = collideCoord[i][1]
            // 一旦坐标值不为0，则返回false
            if (y >= 0) {
                if (map[y][x] > 0) {
                    return 0
                }
            }
            if (x < 0 || x > 11) {
                return 0
            }
        }
        return 1
    }

    /**
     * 同行消除
     */
    removeRows(callback) {
        let sign = false
        let y = 0
        for (let i = this.nowBox.box.length - 1; i >= 0; i--) {
            y = this.nowBox.box[i][1]
            if (y <= 0) return
            for (let j = 0; j < this.map[y].length; j++) {
                if (this.map[y][j] === 0) {
                    sign = false
                    break
                }
                sign = true
            }

            if (sign) {
                for (let k = y - 1; k > 0; k--) {
                    for (let l = 0; l < this.map[k].length; l++) {
                        this.map[k + 1][l] = this.map[k][l]
                    }
                }

                callback()
            }
        }
    }

    /**
     * 新一轮开始时回收nowBox对象，将nextBox赋给nowBox，再生成一个nextBox对象
     */
    newTurn() {
        databus.removeNowBox(this.nowBox)
        this.nowBox = this.nextBox
        this.nextBox = databus.pool.getItemByClass('Box', Box)

        // 对生成的坐标进行处理，初始化在地图中央位置
        let nowBox = this.nowBox.box

        for (let i = 0; i < nowBox.length; i++) {
            nowBox[i][0] += 6
        }

        let nextBox = this.nextBox.cloneBox = this.arrCopy(this.nextBox.box)

        for (let i = 0; i < nextBox.length; i++) {
            nextBox[i][0] += Math.abs(this.nextBox.xNumber[0])
            nextBox[i][1] += Math.abs(this.nextBox.yNumber[0])
        }
    }

    /**
     * 添加方块到地图中
     */
    pushBox() {
        let box = this.nowBox.box
        let x = 0
        let y = 0

        for (let i = 0; i < box.length; i++) {
            x = box[i][0]
            y = box[i][1]

            if (y >= 0) {
                if (this.map[y][x] === 0) {
                    this.map[y][x] = this.nowBox.style
                }
            }
        }
    }

    /**
     * 将方块从地图中移除
     */
    removeBox(b) {
        let box = b
        let x = 0
        let y = 0

        for (let i = 0; i < box.length; i++) {
            x = box[i][0]
            y = box[i][1]

            if (y >= 0) {
                this.map[y][x] = 0
            }
        }
    }

    /**
     * 渲染地图
     */
    render(ctx) {
        let x = 0, y = 0, w = 0, h = 0

        ctx.drawImage(
            this.mapImg,
            this.mapX - this.boxWidth / 2 - 5,
            this.mapY - this.boxWidth / 2 - 5,
            this.boxWidth * 13 + 10,
            this.boxHeight * 22 + 10
        )

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 0) continue

                let img = ''
                switch (this.map[i][j]) {
                    case 1:
                        img = this.boxImgA
                        break
                    case 2:
                        img = this.boxImgB
                        break
                    case 3:
                        img = this.boxImgC
                        break
                    case 4:
                        img = this.boxImgD
                        break
                    case 5:
                        img = this.boxImgE
                        break
                    default:
                        break
                }

                this.boxX = this.boxWidth * j + this.mapX
                this.boxY = this.boxHeight * i + this.mapY

                ctx.drawImage(
                    img,
                    this.boxX,
                    this.boxY,
                    this.boxWidth,
                    this.boxHeight
                )
            }
        }

        for (let i = 0; i < this.nextBox.box.length; i++) {
            let img = ''
            switch (this.nextBox.style) {
                case 1:
                    img = this.boxImgA
                    break
                case 2:
                    img = this.boxImgB
                    break
                case 3:
                    img = this.boxImgC
                    break
                case 4:
                    img = this.boxImgD
                    break
                case 5:
                    img = this.boxImgE
                    break
                default:
                    break
            }

            this.boxX = this.boxWidth * this.nextBox.cloneBox[i][0] + (SCREEN_WIDTH - this.boxWidth * this.nextBox.xNumber.length) / 2
            this.boxY = this.boxWidth * this.nextBox.cloneBox[i][1] + (SCREEN_HEIGHT - this.mapY - this.boxWidth * 21 - this.boxWidth * this.nextBox.yNumber.length) / 2 + this.mapY + this.boxWidth * 21
            ctx.drawImage(
                img,
                this.boxX,
                this.boxY,
                this.boxWidth,
                this.boxHeight
            )
        }
    }

    /**
     * 数组拷贝
     */
    arrCopy(arr) {
        //深拷贝二维数组
        let arrCopy = []

        for (let i = 0; i < arr.length; i++) {
            arrCopy.push([])
            for (let j = 0; j < arr[i].length; j++) {
                arrCopy[i].push(arr[i][j])
            }
        }

        return arrCopy
    }
}