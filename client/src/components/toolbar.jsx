import CanvasState from "../store/canvas-state";
import ToolState from "../store/tool-state";
import "../styles/toolbar.scss";
import Brush from "../tools/brush";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Line from "../tools/line";
import Rect from "../tools/rect";

const changeColor = (e) => {
    ToolState.setColor(e.target.value)
    ToolState.setStrokeColor(e.target.value)
}

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar_block">
                <button
                    className="toolbar__button brush"
                    onClick={() => ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>
                    brush
                </button>
                <button
                    className="toolbar__button rect"
                    onClick={() => ToolState.setTool(new Rect(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>
                    Rect
                </button>
                <button
                    className="toolbar__button rect"
                    onClick={() => ToolState.setTool(new Circle(CanvasState.canvas))}>
                    Circle
                </button>
                <button
                    className="toolbar__button rect"
                    onClick={() => ToolState.setTool(new Line(CanvasState.canvas))}>
                    Line
                </button>
                <button
                    className="toolbar__button rect"
                    onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))}>
                    Eraser
                </button>
                <input type="color" onChange={(e) => changeColor(e)} />
            </div>

            <div className='toolbar_block'>
                <button onClick={() => {CanvasState.undo()}}> Undo </button>
                <button> Redo </button>
            </div>

        </div>
    );
};
