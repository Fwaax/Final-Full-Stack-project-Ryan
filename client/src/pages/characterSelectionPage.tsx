import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../const";
import { useQuery } from "@tanstack/react-query";
import { useJwtToken } from "../hooks/useJwtToken";
import axios from "axios";
import { ICharacterCurrentStateApiResponse } from "../Interfaces/apiRespose";
import { toast } from "react-toastify";

const CharacterSelection: React.FC = () => {
    const { user, token, clearData } = useJwtToken();
    const navigate = useNavigate();
    const location = useLocation();

    // Check for state passed when navigating
    const shouldRefetch = location.state?.refetch ?? false;

    // Fetch characters using React Query and the JWT token
    const { data: yourCharacters = [], isLoading, isError, refetch } = useQuery({
        staleTime: 0,   // Ensure query refetches fresh data
        gcTime: 0,   // Prevent caching if necessary
        queryKey: ["yourCharacters", token],
        queryFn: async () => {
            if (!token) {
                return [];
            }
            try {
                const response = await axios({
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                    url: `${BACKEND_URL}/char/all-my-characters`,
                });
                return response.data.data as ICharacterCurrentStateApiResponse[];
            } catch (err) {
                console.error("Failed to fetch characters:", err);
                return [];
            }
        },
        refetchOnMount: shouldRefetch,  // Force refetch on remount if `refetch` state is true
    });

    const handleSelectCharacter = (characterId: string) => {
        navigate(`/character-sheet/${characterId}`); // Navigate to the character sheet page
    };

    const handleAddCharacter = () => {
        navigate("/character-creation"); // Navigate to the character creation page
    };

    const handleDeleteCharacter = async (characterId: string) => {
        try {
            await axios({
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
                url: `${BACKEND_URL}/char/delete-character`,
                data: { characterId },
            });
            refetch();
            toast(`Character deleted successfully.`);
        } catch (err) {
            console.error("Failed to delete character:", err);
            toast(`Failed to delete character.`);
        }
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
                    className="mt-4 bg-green-600 text-[#bfbfba] py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Create Character
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700">Select Your Character</h2>

                <div className="text-right mb-4">
                    <button
                        onClick={handleAddCharacter}
                        className="bg-green-600 text-[#bfbfba] py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                    >
                        Add Character
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yourCharacters.map((character) => (
                        <div
                            key={character._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-bold mb-2 text-gray-700" >{character.name}</h3>
                            <p className="text-gray-600">Class: {character.class}</p>
                            <p className="text-gray-600">Level: {character.level}</p>
                            <button
                                className="mt-4 w-full bg-indigo-600 text-[#bfbfba] py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                onClick={() => handleSelectCharacter(character._id)}
                            >
                                Select
                            </button>
                            <button className="mt-4 w-full bg-red-600 text-[#bfbfba] py-2 rounded-md hover:bg-red-700 transition duration-300"
                                onClick={() => handleDeleteCharacter(character._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CharacterSelection;
