import { Link, useNavigate } from "react-router-dom";
import { useJwtToken } from "../hooks/useJwtToken";

function Header() {
    const { token, user, clearData } = useJwtToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearData();
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Navigation links */}
                <nav className="flex space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/debug" className="hover:underline">Debug</Link>
                    <Link to="/character-sheet" className="hover:underline">Character Sheet</Link>
                    <Link to="/character-creation" className="hover:underline">Character Creation</Link>
                    <Link to="/character-selection" className="hover:underline">Character Selection</Link>
                </nav>

                {/* User info and login/logout buttons */}
                <div className="flex items-center space-x-4">
                    {token && user ? (
                        <>
                            <span className="text-sm">Welcome, {user.nickname}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
