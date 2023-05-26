import "../styles/canvas.scss";
import {observer} from "mobx-react-lite";
import {useEffect, useRef, useState} from "react";
import CanvasState from "../store/canvas-state.js";
import {Box, Button, Input, Modal, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Brush from "../tools/brush";
import Rect from "../tools/rect";
import canvasState from "../store/canvas-state.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Canvas = observer(() => {
    const canvasRef = useRef()
    const nameRef = useRef('')
    const [modal, setModal] = useState(true)
    const session = useParams()

    const drawHandler = msg => {
        const ctx = canvasRef.current.getContext("2d")
        const figure = msg.figure

        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y, figure.color)
                break;

            case 'finish':
                ctx.beginPath()
                break;

            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
                break;
        }
    }

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (CanvasState.userName) {
            const socket = new WebSocket('ws://localhost:3001')
            CanvasState.setSocket(socket)
            CanvasState.setSessionId(session.id)

            socket.onopen = function () {
                socket.send(`${JSON.stringify({
                    name: CanvasState.userName,
                    id: session.id,
                    method: 'connection'
                })
                }`)
            }

            socket.onmessage = function (event) {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`${msg.name} подключился к сессии`)
                        break;

                    case "draw":
                        drawHandler(msg)
                        break;
                }
            }
        }

    }, [CanvasState.userName])


    const handleModal = () => {
        setModal(!modal)
        CanvasState.setUserName(nameRef.current.value)
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className="canvas">
            <Modal
                open={modal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Введите свое имя
                    </Typography>
                    <Input inputRef={nameRef}/>
                    <Button onClick={handleModal}>Ok</Button>
                </Box>
            </Modal>
            <canvas
                ref={canvasRef}
                width={800} height={600}
                onMouseDown={() => mouseDownHandler()}
            />
        </div>
    );
})
