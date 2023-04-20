import './login.css';
import {Link, useNavigate, useLocation, NavLink} from 'react-router-dom';
import shopImg from '../images/cartIcon.png'
import productAdditionImg from '../images/addProdIcon.png'

const AdminMenu = () => {

    return (
        <nav>
            <div className="card-adm">
            <NavLink to='/adm-orders'>
            <div className='adm-card1 adm-card'>
                <div>Заказы</div>
                <div><img className='adm-icons' src={shopImg}/></div>
            </div>
            </NavLink>
                <NavLink to='/'>
            <div className='adm-card2 adm-card'>
                <div>UDV Store</div>
                <div><img className='adm-icons' src={shopImg}/></div>
            </div>
                </NavLink>
                <NavLink to='/adm-product'>
            <div className='adm-card3 adm-card'>
                <div>Товары</div>
                <div><img className='adm-icons' src={productAdditionImg}/></div>
            </div>
                </NavLink>
                <NavLink to='/adm-balance'>
                <div className='adm-card4 adm-card'>
                    <div>Пользователи</div>
                    <div><img className='adm-icons' src={shopImg}/></div>
                </div>
                </NavLink>
            </div>
            </nav>
    )
}

export default AdminMenu