import React,{ useRef, useState, useEffect } from 'react';
// import useAuth from '../hooks/useAuth';
import './login.css';
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logotype from "../../images/Logotype.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
const LOGIN_URL = '/auth';

export const Login = () => {
    // const {setAuth,login} = useAuth();

    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            // setAuth({email,password, accessToken});
            // login(accessToken,email)
            setEmail('');
            setPassword('');
            // navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Нет ответа от сервера');
                console.log(err);
            } else if (err.response?.status === 400) {
                setErrMsg('Неверный логин или пароль');
            } else if (err.response?.status === 401) {
                setErrMsg('Пользователь не зарегистрирован');
            } else {
                setErrMsg('Ошибка Входа');
            }
            errRef.current.focus();
        }
    }

    return (
        <section className="login_section">
            <div className="main_login_card">
                <div className="login_logo">
                    <img className="loginLogo" src={Logotype} alt='logo'/>
                </div>
                <div className="login_title">
                    <h1>Войти</h1>
                    <p>Войдите в свою учётную запись, используя адрес<br/> корпоративной электронной почты и пароль, указанные<br/>  при регистрации</p>
                </div>
                <div className="login_inner_card">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="email_input">
                    <label htmlFor="email">
                        <span>Email</span>
                    </label>
                    <input className='login_input'
                           type="text"
                           placeholder="@chelpipegroup.com"
                           id="username"
                           ref={emailRef}
                           autoComplete="off"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           required
                    />
                    </div>
                    <div className="password_input">
                    <label htmlFor="email">
                        <span>Пароль</span>
                    </label>
                    <input className="login_input"
                           placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                           type="password"
                           id="password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           required
                    />
                    </div>
                    <button className="login_btn">Войти</button>
                </form>
                <p>
                    Нет аккаунта?<br />
                    <span className="line">
                            {/*put router link here*/}
                        <a href="sign-up">Зарегистрироваться</a>
                        </span>
                </p>
            </div>
            </div>
        </section>
    )
}
