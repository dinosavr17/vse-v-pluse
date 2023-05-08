import React,{ useRef, useState, useEffect } from 'react';
import {useAuth} from '../../hooks/useAuth';
import './login.css';
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logotype from "../../images/Logotype.svg"

export const Login = () => {
    const navigate = useNavigate();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('auth/email',
                JSON.stringify({email}),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8080' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            setEmail('');
            localStorage.setItem("userData", JSON.stringify({
                accessToken: accessToken, email: email,
            }))
            navigate("/code");


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
                    <p>Войдите в свою учётную запись или зарегистрируйтесь,<br/>  используя адрес корпоративной электронной почты</p>
                </div>
                <div className="login_inner_card">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="email_input">
                    <label htmlFor="email">
                        <span style={{'margin-left':0}}>Email</span>
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
                    <button className="login_btn">Войти</button>
                </form>
            </div>
            </div>
        </section>
    )
}
