import React from "react";
import './styles.css';
import {Register} from "./components/RegisterPage/Register";
import {Login} from "./components/LoginPage/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Link,
} from 'react-router-dom';
import {Main} from "./components/Main/Main";
import {Navbar} from "./components/Navigation/Navbar";
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
        <div>
        <Router>
            <nav>
                <Link to="/login">Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Register/>} />
                <Route path="login" element={<Login/>}/>
                <Route path="main" element={<Main/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;