export default class GameInfo {
    constructor() {
        this.score = 0
        this.speed = 500
        this.level = 1
    }

    whenStop() {
        this.score += 1
    }

    whenRemove() {
        this.score += 10

        if (this.score > 50 && this.score <= 90) {
            this.speed = 450
            this.level = 2
        } else if (this.score > 90 && this.score <= 140) {
            this.speed = 400
            this.level = 3
        } else if (this.score > 140 && this.score <= 200) {
            this.speed = 350
            this.level = 4
        } else if (this.score > 200 && this.score <= 300) {
            this.speed = 300
            this.level = 5
        } else if (this.score > 300 && this.score <= 500) {
            this.speed = 250
            this.level = 6
        } else if (this.score > 500 && this.score <= 800) {
            this.speed = 200
            this.level = 7
        } else if (this.score > 800 && this.score <= 1200) {
            this.speed = 150
            this.level = 8
        } else if (this.score > 1200) {
            this.speed = 100
            this.level = 9
        }
    }
}