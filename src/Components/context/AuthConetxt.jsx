import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true);
    const [UserImage, setUserImage] = useState(null);
    const [userData, setUserData] = useState({});

    const value = { isLoggedIn, setIsLoggedIn, UserImage, setUserImage, userData, setUserData, isAdminLoggedIn, setIsAdminLoggedIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
