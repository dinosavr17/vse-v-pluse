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
import {ShopPage} from "./components/ShopPage/ShopPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";
import {Cart} from "./components/CartPage/Cart";
import {CodePage} from "./components/LoginPage/CodePage";
import {CommercialPage} from "./components/ShopPage/CommercialPage";
import {OrderHistory} from "./components/OrderHistory";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminRemoveProduct from "./components/AdminRemoveProduct";
import AdminMenu from "./components/AdminMenu";
import ControlingOrders from "./components/ControlingOrders";
import BalanceIncrease from "./components/BalanceIncrease";
import {News} from "./components/NewsPage/News";
import {Profile} from "./components/PersonalProfile/Profile";
import AdminAddNews from "./components/AdminAddNews";
import {TransferCoins} from "./components/TransferCoins/TransferCoins";
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
            </div>
            <Routes>
                <Route path="/" element={<Register/>} />
                <Route path="login" element={<Login/>}/>
                <Route path="main" element={<Main/>}/>
                <Route path="shop" element={<ShopPage/>}/>
                <Route path="events" element={<CalendarPage/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="code" element={<CodePage/>}/>
                <Route path="commercial" element={<CommercialPage/>}/>
                <Route path="orders" element={<OrderHistory/>}/>
                <Route path="add-product" element={<AdminAddProduct/>}/>
                <Route path="remove-product" element={<AdminRemoveProduct/>}/>
                <Route path="admin" element={<AdminMenu/>}/>
                <Route path="adm-orders" element={<ControlingOrders/>}/>
                <Route path="adm-balance" element={<BalanceIncrease/>}/>
                <Route path="adm-product" element={<AdminAddProduct/>}/>
                <Route path="news" element={<News/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="adm-news" element={<AdminAddNews/>}/>
                <Route path="transfer-coins" element={<TransferCoins/>}/>
            </Routes>
        </Router>
        </div>
    )
}

export default App;