// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { MyUser } from '../types';

const AuthContext = createContext<{ 
    user: MyUser | null; 
    login: (userData: MyUser) => void; 
    logout: () => void; 
}>({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<MyUser | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('sazon_user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = (userData: MyUser) => {
        setUser(userData);
        localStorage.setItem('sazon_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sazon_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
