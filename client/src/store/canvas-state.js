import { makeAutoObservable } from "mobx";

class CanvasState {
    undoList = [] // все действия пользователя на canvas
    redoList = [] // отмененные действия
    canvas = null;
    userName = ''
    sessionId = null
    socket = null


    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setUserName(name) {
        this.userName = name
    }

    pushToUndo(data) {
        this.undoList.push(data)
        console.log(this.undoList)
    }

    undo(action) {
        let ctx = this.canvas.getContext('2d')
        if(this.undoList.length > 0) {
            this.undoList.pop()
        }else{
            ctx.clearRect(0, 0, ctx.width, ctx.height)
        }
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    setSessionId(id) {
        this.sessionId = id
    }

    setSocket(socket) {
        this.socket = socket
    }
}

export default new CanvasState();
