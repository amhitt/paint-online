import "../styles/toolbar.scss";
import ToolState from "../store/tool-state"

export const SettingBar = () => {
    return (
        <div className="setting-bar">
            <label htmlFor="line-width"> Толщина линии </label>
            <input
                id="line-width"
                type="number"
                defaultValue={1}
                min={1} max={50}
                onChange={(e)=> ToolState.setLineWidth(e.target.value)}  />
        </div>
    );
};
