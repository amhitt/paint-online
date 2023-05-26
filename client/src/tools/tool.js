export default class Tool {
    constructor(canvas, socket, id) {
        this.id = id
        this.socket = socket
        this.canvas = canvas
        this.ctx = canvas.getContext("2d") // объект, который позволяет совершать различные манипуляции на канвасе
        this.destroyEvents()
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }

    set color(color) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width) {
        this.ctx.lineWidth = width
    }
}
