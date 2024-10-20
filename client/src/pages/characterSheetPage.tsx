import React from "react";
import TopPanel from "../components/topPanel";
import StatsPanel from "../components/statsPanel";
import BottomPanel from "../components/bottomPanel";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useJwtToken } from "../hooks/useJwtToken";
import { BACKEND_URL } from "../const";
import { toast } from "react-toastify";
import { ICharacterCurrentStateApiResponse } from "../Interfaces/apiRespose";
import { CharacterProvider } from "../hooks/characterCotextProvider";

const CharacterSheetPage = () => {
    const { token } = useJwtToken();
    const { characterId: characterIdFromUrl } = useParams<{ characterId: string }>(); // Extract characterId from URL

    const { data: yourCharacter = null, isLoading, error } = useQuery({
        staleTime: 0, // Ensure query refetches fresh data
        gcTime: 0, // Prevent caching if necessary
        queryKey: ["yourCharacter", characterIdFromUrl, token],
        queryFn: async () => {
            if (!token) {
                toast("Please log in first");
                return null;
            }
            if (!characterIdFromUrl) {
                toast("Character not found");
                return null;
            }
            try {
                const response = await axios({
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                    url: `${BACKEND_URL}/char/my-character/${characterIdFromUrl}`,
                });
                return response.data.data as ICharacterCurrentStateApiResponse;
            } catch (err) {
                console.error("Failed to fetch character:", err);
                return null;
            }
        },
    });

    if (isLoading) return <div>Loading character...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;
    if (yourCharacter === null) return <div>Character not found</div>;

    return (
        <div className="w-full h-full bg-[#292929]">
            <div className="w-11/12 2xl:w-9/12 mx-auto flex flex-col gap-2">
                <CharacterProvider character={yourCharacter}>
                    <TopPanel />
                    <StatsPanel />
                    <BottomPanel />
                </CharacterProvider>
            </div>
        </div>
    );
};

export default CharacterSheetPage;
