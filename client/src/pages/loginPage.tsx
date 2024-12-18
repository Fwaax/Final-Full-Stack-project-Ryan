import React, { useState } from "react";
import axios from "axios";
import { useJwtToken } from "../hooks/useJwtToken";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { saveData } = useJwtToken();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:6969/login/by-email", {
                email,
                password,
            });
            const data = response.data;
            saveData(data);
            setLoading(false);
            navigate("/character-selection");
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const handleSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/register");
    };



    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-[#bfbfba]">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-[#bfbfba]">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#bfbfba] bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-[#bfbfba]">Don't have an account?</p>
                    <button type="button" className="text-green-500 hover:underline" onClick={handleSignup}>Sign Up</button>
                </div>

            </div >
        </div >
    );
};

export default LoginPage;
