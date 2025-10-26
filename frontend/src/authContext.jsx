import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";

const AuthProvider = ({children}) => {
    const nav = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Check for existing auth data on component mount
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        nav('/');
    };

    const isAuthenticated = Boolean(user && token);
    if(loading)return<div>Loading...</div>;
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, setUser, setToken }}>
            {children}
        </AuthContext.Provider>
    ) ;
}

export default AuthProvider;