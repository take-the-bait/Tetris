import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
    constructor() {
        if (instance) return instance

        instance = this

        this.pool = new Pool()

        this.reset()
    }

    reset() {
        this.nowBox = []
        this.nextBox = []
    }

    /**
     * 回收当前方块，进入对象池
     */
    removeNowBox(box) {
        let temp = this.nowBox.shift()

        this.pool.recover('box', box)
    }
    /**
     * 回收下个方块，进入对象池
     */
    removeNextBox(box) {
        let temp = this.nextBox.shift()

        this.pool.recover('box', box)
    }
}