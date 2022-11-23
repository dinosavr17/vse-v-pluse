import React from "react";
import './styles.css';
import {Register} from "./components/RegisterPage/Register";
import {Login} from "./components/LoginPage/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from 'react-router-dom';
import {MainPage} from "./components/Main/MainPage";

// function AppRoutes() {
//     const Routes = useRoutes(
//         [
//             {path:'/',element:<MainPage/>},
//             {path:'/signup',element:<Login/>}
//         ]
//     )
//     return Routes;
// }
function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register/>} />
                <Route path="login" element={<Login/>}/>
                <Route path="main" element={<MainPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;