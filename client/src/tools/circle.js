import Tool from "./tool";

export default class Circle extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    //добавляем слушатели событий на канвас
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        // this.socket.send(JSON.stringify({
        //     method: 'draw',
        //     id: this.id,
        //     figure: {
        //         type: 'circle',
        //
        //     }
        // }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.dataUrl = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            let radius = Math.sqrt(width ** 2 + height ** 2);
            this.draw(currentX, currentY, radius);
        }
    }

    draw(x, y, r) {
        const img = new Image();
        img.src = this.dataUrl;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }
}
