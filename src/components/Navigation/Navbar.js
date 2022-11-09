import React, {useState, useContext, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {faUserShield} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './navbar.css';


export const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (

        <>
                <Router>
            <Nav>
                <NavLink to='/'>
                </NavLink>
                <IconContext.Provider value={{ color: '#00d29d' }}>
                    <div className='navbar'>
                        <NavLink to='#' className='menu-bars'>
                            <Bars onClick={showSidebar}/>
                        </NavLink>
                        {/*<NavLink to='#' className='menu-bars'>*/}
                        {/*    <FaIcons.FaBars onClick={showSidebar} />*/}
                        {/*</NavLink>*/}
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <NavLink to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id='admPanel2' to='/' activeStyle>
                                    <div><FontAwesomeIcon icon={faUserShield}/></div>
                                    <div>Управление</div>
                                </NavLink>
                                <NavLink to='#' activeStyle>
                                    <div><button className="userBalance"></button></div>
                                </NavLink>
                                <NavLink to='/orders' activeStyle>
                                    <div><FontAwesomeIcon icon={faBagShopping} />
                                    </div>
                                    <div>
                                        Заказы
                                    </div>
                                </NavLink>
                                <NavLink to='/' activeStyle>
                                    <Badge component="badge" id='cart_badge'  badgeContent={'0'} color='secondary'>
                                        <ShoppingCartOutlinedIcon />
                                    </Badge>
                                    <div>
                                        Корзина
                                    </div>
                                </NavLink>
                                <NavLink to='/' activeStyle>
                                    <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket}/>
                                    </div>
                                    <div>
                                        Выход
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </IconContext.Provider>

                <NavMenu classname='sidebar'>
                    <NavLink to='/' id='admPanel' activeStyle>
                        <div><FontAwesomeIcon icon={faUserShield}/></div>
                        <div>Управление</div>
                    </NavLink>
                    <NavLink to='/'>
                        <div><button className="userBalance">&#129689;</button></div>
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        <div><FontAwesomeIcon icon={faBagShopping} />
                        </div>
                        <div>
                            Заказы
                        </div>
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        <Badge component="badge" id='cart_badge'  badgeContent={'0'} color='secondary'>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                        <div>
                            Корзина
                        </div>
                    </NavLink>
                    <NavLink to='/' activeStyle>
                        <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket}/>
                        </div>
                        <div>
                            Выход
                        </div>
                    </NavLink>
                </NavMenu>
            </Nav>
            </Router>
        </>
    );
};