"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { registerUser, loginUser, fetchUserProfile, logoutUser } from '@/lib/api'; // Adjust the import path if needed

interface UserRegistrationData {
    email: string;
    password1: string;
    password2: string;
    first_name:string;
    last_name:string;

}

interface UserLoginData {
    email: string;
    password: string;
}

interface AuthContextType {
    user: any;
    loading: boolean;
    register: (userData: UserRegistrationData) => Promise<void>;
    login: (userData: UserLoginData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let token = localStorage.getItem('token');
        // TODO:
        token = ""
        if (token) {
            fetchUserProfile(token)
                .then(setUser)
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const register = async (userData: UserRegistrationData) => {
        await registerUser(userData);
        // Not Login Yet
        // await login({ email: userData.email, password: userData.password1 });
    };

    const login = async (userData: UserLoginData) => {
        const data = await loginUser(userData);
        localStorage.setItem('token', data.access);
        // setUser(await fetchUserProfile(data.access));//profile not implemented yet
        setUser(data.user)
};

    const logout = async() => {
        await logoutUser()
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
