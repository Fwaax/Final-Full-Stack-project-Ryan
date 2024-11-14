import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=(?:.*[A-Z]){3})(?=(?:.*[a-z]){3})(?=(?:.*\d){1})(?=(?:.*[!@#$%^&*]){1}).*$/;

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailValid || !passwordValid) {
            setError("Please correct the errors before submitting.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:6969/register", {
                email,
                password,
                nickname,
            });
            alert(response.data);
            setLoading(false);
            navigate("/");
        } catch (err: any) {
            setLoading(false);
            setError(err.response?.data || "Signup failed");
        }
    };

    const validateEmail = (value: string) => {
        setEmail(value);
        setEmailValid(EMAIL_REGEX.test(value));
    };

    const validatePassword = (value: string) => {
        setPassword(value);
        setPasswordValid(PASSWORD_REGEX.test(value));
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-600 p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#bfbfba]">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block text-sm font-medium text-[#bfbfba]">
                            Nickname:
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-[#bfbfba]">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${emailValid ? "border-gray-300" : "border-red-500"} bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            required
                        />
                        {!emailValid && <p className="text-red-500 text-sm mt-1">Invalid email format.</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-[#bfbfba]">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => validatePassword(e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${passwordValid ? "border-gray-300" : "border-red-500"} bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            required
                        />
                        <div className="text-xs text-gray-400 mt-2">
                            Password must contain:
                            <ul className="list-disc list-inside">
                                <li>At least 3 uppercase letters</li>
                                <li>At least 3 lowercase letters</li>
                                <li>At least 1 number</li>
                                <li>At least 1 special character (!@#$%^&*)</li>
                            </ul>
                        </div>
                        {!passwordValid && <p className="text-red-500 text-sm mt-1">Password does not meet requirements.</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#bfbfba] bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                    {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-[#bfbfba]">Already have an account?</p>
                    <button
                        onClick={() => navigate("/")}
                        className="text-indigo-500 hover:underline"
                    >
                        Login here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
