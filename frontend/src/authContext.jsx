import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // Check for existing user data on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        // Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value = {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    ) ;
}

export default AuthProvider;