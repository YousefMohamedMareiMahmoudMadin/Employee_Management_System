import React, { createContext, useState, useContext } from 'react'

export const userContext = createContext()

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem('token')
    }

    return (
        <userContext.Provider value={{ user, login, logout }}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext);

export default AuthContext