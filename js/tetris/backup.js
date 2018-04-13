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