import React from "react";
import axios from "axios";
import { useJwtToken } from "../hooks/useJwtToken";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = "http://localhost:6969"; // Update this with your backend URL

const CharacterSelection: React.FC = () => {
    const { user, token, clearData } = useJwtToken();
    const navigate = useNavigate();

    // Fetch characters using React Query and the JWT token
    const { data: yourCharacters = [], isLoading, isError } = useQuery({
        staleTime: 60000,
        gcTime: 60000,
        queryKey: ["yourCharacters", token],
        queryFn: async () => {
            if (!token) {
                return [];
            }
            try {
                const response = await axios({
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    url: `${BACKEND_URL}/char/all-my-characters`,
                });
                return response.data;
            } catch (err) {
                console.error("Failed to fetch characters:", err);
                return [];
            }
        },
    });

    const handleLogout = () => {
        clearData();
        navigate("/"); // Redirect to the login page
    };

    const handleAddCharacter = () => {
        navigate("/character-creation"); // Navigate to the character creation page
    };

    if (isLoading) {
        return <div className="text-center mt-12">Loading characters...</div>;
    }

    if (isError || yourCharacters.length === 0) {
        return (
            <div className="text-center mt-12">
                <p>No characters found. Please create one.</p>
                <button
                    onClick={handleAddCharacter}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Create Character
                </button>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-indigo-600 text-white py-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <h1 className="text-2xl font-bold">Character Selection</h1>
                    <div className="flex items-center">
                        <span className="mr-4">Welcome, {user?.nickname || "Adventurer"}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">Select Your Character</h2>

                {/* Add Character Button */}
                <div className="text-right mb-4">
                    <button
                        onClick={handleAddCharacter}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Add Character
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yourCharacters.map((character: any) => (
                        <div
                            key={character.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                            <p className="text-gray-600">Class: {character.class}</p>
                            <p className="text-gray-600">Level: {character.level}</p>
                            <button
                                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                onClick={() => alert(`You selected ${character.name}`)}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CharacterSelection;
