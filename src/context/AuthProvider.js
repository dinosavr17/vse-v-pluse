import React, { createContext, useState, useCallback, useEffect } from "react";
// import { Link, useNavigate, useLocation } from 'react-router-dom';
function noop() { }
const AuthContext = createContext({
    login: noop,
    logout: noop,
    token: null,
    setAuth: noop,
});
const storageName = 'userData'
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();


    const [token, setToken] = useState(null)
    const login = useCallback((jwtToken, email ) => {
        setToken(jwtToken)
        localStorage.setItem(storageName, JSON.stringify({
            accessToken: jwtToken, email: email,
        }))
        setAuth(jwtToken)

    }, [])
    const logout = useCallback(() => {
        localStorage.clear();
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token);

        }
    }, [login])
    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;