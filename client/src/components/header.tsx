import { Link, useNavigate } from "react-router-dom";
import { useJwtToken } from "../hooks/useJwtToken";
import { useState } from "react";

function Header() {
    const { token, user, clearData } = useJwtToken();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        clearData();
        navigate("/login");
    };

    return (
        <header className="bg-[#14151f] text-[#bfbfba] p-4">
            <div className="flex flex-row justify-between">
                {/* Left Section */}
                <div>
                    {/* Hamburger Button (Small Screens Only) */}
                    <div className="flex sm:hidden">
                        <button
                            className="text-[#bfbfba] focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12" // Cross Icon
                                            : "M4 6h16M4 12h16M4 18h16" // Hamburger Icon
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav
                        className={`flex flex-col gap-3 items-center ${isMenuOpen ? "block" : "hidden"
                            } sm:flex sm:flex-row`}
                    >
                        <Link to="/character-creation" className="hover:underline">
                            Character Creation
                        </Link>
                        <Link to="/character-selection" className="hover:underline">
                            Character Selection
                        </Link>
                    </nav>
                </div>

                {/* Right Section */}
                <div className="hidden sm:flex items-center space-x-4">
                    {token && user ? (
                        <>
                            <span className="text-sm">Welcome, {user.nickname}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-[#1a1b26] hover:bg-[#556b82] text-[#bfbfba] px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#1a1b26] hover:bg-[#556b82] text-[#bfbfba] px-3 py-1 rounded"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile View for Auth Buttons */}
            <div
                className={`${isMenuOpen ? "block" : "hidden"
                    } sm:hidden mt-4 flex flex-col space-y-2`}
            >
                {token && user ? (
                    <>
                        <span className="text-sm">Welcome, {user.nickname}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-[#1a1b26] hover:bg-[#556b82] text-[#bfbfba] px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-[#1a1b26] hover:bg-[#556b82] text-[#bfbfba] px-3 py-1 rounded"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>

    );
}

export default Header;
