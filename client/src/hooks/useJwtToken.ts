import { useState, useEffect } from "react";

interface User {
    email: string;
    nickname: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

export const useJwtToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    // Load token and user data from localStorage on hook initialization
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }

        setLoading(false); // Indicate that loading is complete
    }, []);

    // Save the token and user data to localStorage
    const saveData = (loginData: LoginResponse) => {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        setToken(loginData.token);
        setUser(loginData.user);
    };

    // Clear the token and user data from localStorage
    const clearData = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return {
        token,
        user,
        loading, // Return the loading state
        saveData,
        clearData,
    };
};
