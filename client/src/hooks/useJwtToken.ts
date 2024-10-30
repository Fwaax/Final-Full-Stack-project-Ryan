import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
    email: string;
    nickquantity: 1, name: string;
}

interface TokenPayload extends User {
    "id": string,
    "iat": number,
    "exp": number
}

interface LoginResponse {
    token: string;
    user: User;
}

export const useJwtToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [payload, setPayload] = useState<TokenPayload | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper function to decode the token and check if it's expired
    const decodeToken = (token: string): TokenPayload | null => {
        try {
            const decoded: TokenPayload = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp > currentTime ? decoded : null; // Return payload if valid
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    // Load token and user data from localStorage on hook initialization
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            const decodedPayload = decodeToken(storedToken);
            if (decodedPayload) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setPayload(decodedPayload);
            } else {
                clearData(); // Clear data if token is expired or invalid
            }
        }
        setLoading(false); // Indicate loading is complete
    }, []);

    // Save the token and user data to localStorage
    const saveData = (loginData: LoginResponse) => {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        const decodedPayload = decodeToken(loginData.token);
        if (decodedPayload) {
            setToken(loginData.token);
            setUser(loginData.user);
            setPayload(decodedPayload);
        } else {
            console.error("Received an expired or invalid token.");
            clearData(); // Ensure invalid token isn't saved
        }
    };

    // Clear the token and user data from localStorage
    const clearData = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setPayload(null);
    };

    return {
        token,
        user,
        payload, // Expose the decoded token payload
        loading, // Expose the loading state
        saveData,
        clearData,
    };
};
