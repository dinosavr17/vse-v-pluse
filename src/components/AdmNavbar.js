import React, {useState, useContext, useEffect} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './Navigation/NavbarElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import AuthContext from "../context/AuthProvider";
import './Navigation/navbar.css';
import { useSelector } from "react-redux";
import axios from "../api/axios";
import headImage from '../images/Logotype.svg'

const AdmNavbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const setAuth = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const showSidebar = () => setSidebar(!sidebar);
    useEffect(async ()=>{
        const response=await axios.get(
            '/info',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        // console.log(response.data.userBalance);
        setInfo(response.data);
        // console.log(response.data);
    },[])
    const quantity = useSelector(state=>state.cart.quantity)
    // console.log(quantity)
    return (

        <>
            <Nav>
                <NavLink to='/adm-home'>
                    <img src={headImage} alt='nav-label'/>
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
                            <NavLink to='#'>
                                <div><button className="userBalance">
                                    {info.userBalance}&#129689;</button></div>
                                <div>
                                    {info.email}
                                </div>
                            </NavLink>
                            <NavLink to='/sign-in' activeStyle>
                                <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() => {
                                    setAuth.logout()} }/>
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
                    <NavLink to='#'>
                        <div><button className="userBalance">
                            {info.userBalance}&#129689;</button></div>
                        <div>
                            {info.email}
                        </div>
                    </NavLink>
                    <NavLink to='/sign-in' activeStyle>
                        <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() => {
                            setAuth.logout()} }/>
                        </div>
                        <div>
                            Выход
                        </div>
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};
export default AdmNavbar;