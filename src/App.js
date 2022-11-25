import React from "react";
import './styles.css';
import {Register} from "./components/RegisterPage/Register";
import {Login} from "./components/LoginPage/Login";
import Logotype from "./images/Logotype.svg"
import './components/Navigation/NavbarElements'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
    Link,
} from 'react-router-dom';
import {Main} from "./components/Main/Main";
import * as S from "./components/Navigation/NavbarElements";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons";
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
            <div>
            <S.Nav>
                <div>
                <S.NavLink to='/'>
                    <img className="logoImage" src={Logotype} alt='logo'/>
                </S.NavLink>
                </div>
                    <div>
                        <S.NavLink to="/login"><S.GlassBtn><S.InlineSpan><FontAwesomeIcon icon={faUserAstronaut}/></S.InlineSpan><S.InlineSpan>Войти</S.InlineSpan></S.GlassBtn></S.NavLink>
                    </div>
            </S.Nav>
            </div>
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