import { Link, useNavigate } from "react-router-dom";
import { useJwtToken } from "../hooks/useJwtToken";

function Header() {
    const { token, user, clearData } = useJwtToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearData();
        navigate("/login");
    };

    return (
        <header className="bg-[#14151f] text-[#bfbfba] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <nav className="flex space-x-4">
                    <Link to="/character-creation" className="hover:underline">Character Creation</Link>
                    <Link to="/character-selection" className="hover:underline">Character Selection</Link>
                </nav>
                <div className="flex items-center space-x-4">
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
        </header>
    );
}

export default Header;
