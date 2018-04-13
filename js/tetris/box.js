import DataBus from '../databus'

let databus = new DataBus()
/**
 * 方块的生成实现
 */
export default class Box {
    constructor() {
        this.box = []
        this.index = 0
        this.style = 0
        this.direction = 0
        this.xNumber = 0
        this.yNumber = 0

        this.init().generate()
    }

    /**
     * 初始化，随机方块类型，随机填充样式，随机方向
     */
    init() {
        this.index = Math.floor(Math.random() * 7)
        this.style = Math.floor(Math.random() * 5) + 1
        this.direction = Math.floor(Math.random() * 4)

        return this
    }

    /**
     * 根据方向生成方块
     */
    generate() {
        let box = []
        switch (this.index) {
            case 0:
                if (this.direction === 0 || this.direction === 2) {
                    this.box = [[-2, 0], [-1, 0], [0, 0], [1, 0]]
                } else {
                    this.box = [[-1, 0], [-1, -1], [-1, -2], [-1, -3]]
                }
                break
            case 1:
                this.box = [[-1, 0], [0, 0], [-1, -1], [0, -1]]
                break
            case 2:
                switch (this.direction) {
                    case 0:
                        this.box = [[-1, 0], [0, 0], [1, 0], [0, -1]]
                        break
                    case 1:
                        this.box = [[0, 0], [-1, -1], [0, -1], [0, -2]]
                        break
                    case 2:
                        this.box = [[0, 0], [-1, -1], [0, -1], [1, -1]]
                        break
                    case 3:
                        this.box = [[0, 0], [0, -1], [1, -1], [0, -2]]
                        break
                    default:
                        break
                }
                break
            case 3:
                switch (this.direction) {
                    case 0:
                        this.box = [[-2, 0], [-1, 0], [0, 0], [0, -1]]
                        break
                    case 1:
                        this.box = [[-1, 0], [0, 0], [-1, -1], [-1, -2]]
                        break
                    case 2:
                        this.box = [[-1, 0], [-1, -1], [0, -1], [1, -1]]
                        break
                    case 3:
                        this.box = [[0, 0], [0, -1], [-1, -2], [0, -2]]
                        break
                    default:
                        break
                }
                break
            case 4:
                switch (this.direction) {
                    case 0:
                        this.box = [[-1, 0], [0, 0], [0, -1], [0, -2]]
                        break
                    case 1:
                        this.box = [[-1, 0], [0, 0], [1, 0], [-1, -1]]
                        break
                    case 2:
                        this.box = [[-1, 0], [-1, -1], [-1, -2], [0, -2]]
                        break
                    case 3:
                        this.box = [[0, 0], [-2, -1], [-1, -1], [0, -1]]
                        break
                    default:
                        break
                }
                break
            case 5:
                if (this.direction % 2 === 0) {
                    this.box = [[-1, 0], [-1, -1], [0, -1], [0, -2]]
                } else {
                    this.box = [[-1, 0], [0, 0], [-2, -1], [-1, -1]]
                }
                break
            case 6:
                if (this.direction % 2 === 0) {
                    this.box = [[0, 0], [-1, -1], [0, -1], [-1, -2]]
                } else {
                    this.box = [[-1, 0], [0, 0], [0, -1], [1, -1]]
                }
                break
            default:
                break
        }

        let xNumber = []
        let yNumber = []
        for (let i = 0; i < this.box.length; i++) {
            if (xNumber.length === 0) {
                xNumber.push(this.box[i][0])
            }
            if (yNumber.length === 0) {
                yNumber.push(this.box[i][1])
            }
            for (let j = 0; j < xNumber.length; j++) {
                if (xNumber[j] === this.box[i][0]) break

                if (xNumber[xNumber.length - 1] !== this.box[i][0]) xNumber.push(this.box[i][0])
            }
            for (let j = 0; j < yNumber.length; j++) {
                if (yNumber[j] === this.box[i][1]) break

                if (yNumber[yNumber.length - 1] !== this.box[i][1]) yNumber.push(this.box[i][1])
            }
        }

        xNumber.sort(function(a, b) {
            return a - b
        })
        yNumber.sort(function(a, b) {
            return a - b
        })
        this.xNumber = this.unique(xNumber)
        this.yNumber = yNumber
    }

    /**
     * 回收自身
     */
    updateNowBox() {
        databus.removeNowBox(this)
    }

    updateNextBox() {
        databus.removeNextBox(this)
    }

    unique(arr) {
        var res = []
        var json = {}
        for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
                res.push(arr[i])
                json[arr[i]] = 1
            }
        }
        return res;
    }
}