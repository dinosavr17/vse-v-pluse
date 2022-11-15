import React,{ useRef, useState, useEffect, } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import './register.css';
import Logotype from "../../images/Logotype.svg"
const USER_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const NAME_REGEX = /^[а-яА-ЯёЁa\s\-]{3,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = '/register';

export const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [validPersonalName, setValidPersonalName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validSurname, setValidSurname] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(email));
    }, [email])
    useEffect(() => {
        setValidPersonalName(NAME_REGEX.test(firstName));
    }, [firstName])
    useEffect(() => {
        setValidSurname(NAME_REGEX.test(lastName));
    }, [lastName])
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, password, phoneNumber, firstName, lastName }),
                {
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    withCredentials: true,
                }
            );
            console.log(response?.data);
            // console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPassword('');
            setMatchPwd('');
            setFirstName('');
            setLastName('');
            setPhoneNumber('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Нет соединения с серверов');
            } else if (err.response?.status === 409) {
                setErrMsg('Пользователь с таким email уже зарегистрирован');
            } else {
                setErrMsg('Ошибка регистрации')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Успешно!</h1>
                    <p>
                        <a href="#">Войти</a>
                    </p>
                </section>
            ) : (
                <section className="register_section">
                    <div className="main_card">
                    <div className="register_logo">
                        <img src={Logotype}/>
                    </div>
                        <div className="register_title">
                            <h1>Зарегистрироваться</h1>
                            <p>Регистрация позволит вам пользоваться порталом</p>
                        </div>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="card register_inner_card">
                        <form className="register_form" onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                <FontAwesomeIcon icon={faCheck} className={validPersonalName? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPersonalName || !firstName ? "hide" : "invalid"} />
                                <span>Имя</span>
                            </label>
                            <input className="register_input capitalize"
                                   type="text"
                                   id="name"
                                   placeholder="Иван"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                                ref={nameRef}
                                aria-invalid={validPersonalName ? "false" : "true"}
                                aria-describedby="nameNote"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            <p id="nameNote" className={nameFocus && firstName && !validPersonalName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                 Имя должно быть валидным
                            </p>
                            <label htmlFor="surname">
                                <FontAwesomeIcon icon={faCheck} className={validSurname ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validSurname || !lastName ? "hide" : "invalid"} />
                                <span>Фамилия</span>
                            </label>
                            <input className="register_input"
                                   type="text"
                                   id="surname"
                                   placeholder="Иванов"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                ref={surnameRef}
                                aria-invalid={validSurname ? "false" : "true"}
                                aria-describedby="surnameNote"
                                onFocus={() => setSurnameFocus(true)}
                                onBlur={() => setSurnameFocus(false)}
                            />
                            <p id="surnameNote" className={surnameFocus && lastName && !validSurname ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Фамилия должна быть валидной
                            </p>
                            <label htmlFor="email">
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"}/>
                                <FontAwesomeIcon icon={faTimes} className={validName || !email ? "hide" : "invalid"} />
                                <span>Email</span>
                            </label>
                            <input className="register_input"
                                   type="text"
                                   id="email"
                                   placeholder="email@example.com"
                                   ref={userRef}
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required
                                   aria-invalid={validName ? "false" : "true"}
                                   aria-describedby="uidnote"
                                   onFocus={() => setUserFocus(true)}
                                   onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && email && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Корпоративный email адрес.<br/>
                                Должен содержать почтовый домен @chelpipegroup.com
                            </p>


                            <label htmlFor="password">
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                                <span>Пароль</span>
                            </label>
                            <input className="register_input"
                                   type="password"
                                   id="password"
                                   placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                                   aria-invalid={validPwd ? "false" : "true"}
                                   aria-describedby="pwdnote"
                                   onFocus={() => setPwdFocus(true)}
                                   onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                От 8 to 24 символов.<br />
                                Должен содержать прописные и строчные буквы <br />
                            </p>


                            <label className="validation_label" htmlFor="confirm_pwd">
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                   <span>Подтвердите пароль</span>
                            </label>
                            <input className="register_input"
                                   type="password"
                                   id="confirm_pwd"
                                   placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                   onChange={(e) => setMatchPwd(e.target.value)}
                                   value={matchPwd}
                                   required
                                   aria-invalid={validMatch ? "false" : "true"}
                                   aria-describedby="confirmnote"
                                   onFocus={() => setMatchFocus(true)}
                                   onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Пароли должны совпадать.
                            </p>
                            <label htmlFor="phone_number">
                                {/*<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />*/}
                                {/*<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />*/}
                                <span>Номер телефона</span>
                            </label>
                            <input className="register_input"
                                   type="tel"
                                   id="phone"
                                   placeholder="+7 (999) 999 99 99"
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                   required
                                   aria-describedby="phoneNote"
                                   value={phoneNumber}
                                   aria-invalid={validPhone ? "false" : "true"}
                                   onFocus={() => setPhoneFocus(true)}
                                   onBlur={() => setPhoneFocus(false)}
                            />

                            <button className="register_btn" disabled={!validName || !validPwd || !validMatch ? true : false}>Зарегистрироваться</button>
                        </form>
                        <p>
                            У вас есть аккаунт? <a href='#'>Войти</a>
                        </p>
                    </div>
                    </div>
                </section>
            )}
        </>
    )
}