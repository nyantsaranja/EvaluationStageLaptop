import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginComponent} from "./mothercomponents/LoginComponent";
import {Inter} from "./mothercomponents/Inter";
import {Logout} from "./childcomponents/Logout";
import {Homepage} from "./appcomponents/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inter/>}></Route>
                <Route path="/login/:role" element={<LoginComponent/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/logout" element={<Inter/>}></Route>
                <Route path="/homepage" element={<Homepage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
