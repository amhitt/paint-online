import "./styles/app.scss"
import {BrowserRouter, Navigate, Route, Routes, useParams} from "react-router-dom";
import {Toolbar} from "./components/toolbar";
import {SettingBar} from "./components/setting-bar";
import {Canvas} from "./components/canvas";


export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path={"/:id"} element={
                        <>
                        <Toolbar/>
                        <SettingBar/>
                        <Canvas/>
                        </>}
                    />
                    <Route path={'/'} element={<Navigate to={`${(+new Date).toString(36)}`} /> }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
