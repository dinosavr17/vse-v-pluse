import React, {useState, useContext, useEffect} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    BalanceBlock,
    NavLabels
} from './NavbarElements';
import logoImage from '../../images/Logotype.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {faUserShield} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Badge from '@mui/material/Badge';
import AuthContext from "../../context/AuthProvider";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentsIcon from '@mui/icons-material/Payments';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './navbar.css';
import { useSelector } from "react-redux";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import axios from "../../api/axios";


const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const setAuth = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [role, setRole] = useState(0);
    const showSidebar = () => setSidebar(!sidebar);
    useEffect(async ()=>{
        const response=await axios.get(
            '/common/info',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setInfo(response.data);
        setRole(response.data.roleId);
        console.log(response.data);
    },[role])
    const quantity = useSelector(state=>state.cart.quantity)
    useEffect(()=>{
        if (role == 2)
        {   document.getElementById('admPanel').style.display = 'flex';
            document.getElementById('admPanel2').style.display = 'flex';
        }

        else
        {   document.getElementById('admPanel').style.display = 'none';
            document.getElementById('admPanel2').style.display = 'none';
        }
    },[role])

    return (

        <>
            <Nav>
                <NavLink to='/main'>
                    <img className="logoImage" src={logoImage} alt='logo'/>
                </NavLink>
                {/*<IconContext.Provider value={{ color: 'rgb(0,0,0)' }}>*/}
                    <div className='navbar'>
                        <NavLink to='#' className='menu-bars'>
                            <Bars onClick={showSidebar}/>
                        </NavLink>
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <NavLink  to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id='admPanel2' to='/adm-home' activeStyle>
                                    <div><FontAwesomeIcon icon={faUserShield}/></div>
                                    <div>Управление</div>
                                </NavLink>
                                <BalanceBlock to='#'>
                                    <div>
                                        <button className="userBalance">
                                        {info.userBalance}&#129689;</button></div>
                                </BalanceBlock>
                                <NavLink to='/orders' activeStyle>
                                    <WorkHistoryIcon/>
                                </NavLink>
                                <NavLink to='/cart' activeStyle>
                                    <Badge component="badge" id='cart_badge'  badgeContent={quantity} color='secondary'>
                                        <ShoppingBasketIcon/>
                                        <NavLabels>Корзина</NavLabels>
                                    </Badge>
                                </NavLink>
                                <NavLink to='/sign-in' activeStyle>
                                    <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() => {
                                        localStorage.clear()} }/>
                                    </div>
                                    <div>
                                        Выход
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                {/*</IconContext.Provider>*/}

                <NavMenu classname='sidebar'>
                    <NavLink to='/admin' id='admPanel' activeStyle>
                        <div><FontAwesomeIcon icon={faUserShield}/></div>
                        <div>Управление</div>
                    </NavLink>
                    <NavLink to='#'>
                        <div><button className="userBalance">
                            {info.userBalance}&#129689;</button></div>
                    </NavLink>
                    <NavLink to='/orders' activeStyle>
                        <WorkHistoryIcon/>
                        <NavLabels>История заказов</NavLabels>
                    </NavLink>
                    <NavLink style={{display: "flex", flexDirection: "column"}} to='/cart' activeStyle>
                        <Badge  style={{display: "flex", flexDirection: "column"}} component="badge" id='cart_badge' badgeContent={quantity} color='secondary'>
                            <ShoppingCartOutlinedIcon />
                            <NavLabels>Корзина</NavLabels>
                        </Badge>
                        <div>
                        </div>
                    </NavLink>
                    <NavLink to='/balance-change-history' activeStyle>
                        <PaymentsIcon/>
                       <NavLabels>Транзакции</NavLabels>
                    </NavLink>
                    <NavLink to='/transfer-coins' activeStyle>
                        <CurrencyExchangeIcon/>
                        <NavLabels>Перевод койнов</NavLabels>
                    </NavLink>
                    <NavLink to='/profile' activeStyle>
                        <AccountCircleIcon/>
                       <NavLabels>{info.email}</NavLabels>
                    </NavLink>
                    <NavLink to='/login' activeStyle>
                        <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() => {
                            localStorage.clear()} }/>
                        </div>
                        <NavLabels>Выход</NavLabels>
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};
export default Navbar;