import React, { useState } from 'react'
import { useJwtToken } from '../hooks/useJwtToken';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { alliesAtom, appearanceAtom, backgroundAtom, backstoryAtom, classAtom, coreAttributesAtom, createdAtAtom, enemiesAtom, hitPointsAtom, levelAtom, nameAtom, otherAtom, raceAtom, skillsAtom, updatedAtAtom, userIdAtom } from '../atoms';

const characterEditPage = () => {
    const { token } = useJwtToken();
    const navigate = useNavigate();

    const { characterId: characterIdFromUrl } = useParams<{ characterId: string }>();
    const [error, setError] = useState<string | null>(null);
    const [isFetched, setIsFetched] = useState(false);

    // Atom setters
    const setName = useSetAtom(nameAtom);
    const setClass = useSetAtom(classAtom);
    const setRace = useSetAtom(raceAtom);
    const setLevel = useSetAtom(levelAtom);
    const setBackground = useSetAtom(backgroundAtom);
    const setAppearance = useSetAtom(appearanceAtom);
    const setCoreAttributes = useSetAtom(coreAttributesAtom);
    const setSkills = useSetAtom(skillsAtom);
    const setHitPoints = useSetAtom(hitPointsAtom);
    const setAllies = useSetAtom(alliesAtom);
    const setEnemies = useSetAtom(enemiesAtom);
    const setBackstory = useSetAtom(backstoryAtom);
    const setUserId = useSetAtom(userIdAtom);
    const setCreatedAt = useSetAtom(createdAtAtom);
    const setUpdatedAt = useSetAtom(updatedAtAtom);
    const setOther = useSetAtom(otherAtom);

    // Atom values
    const name = useAtomValue(nameAtom);
    const characterClass = useAtomValue(classAtom);
    const race = useAtomValue(raceAtom);
    const level = useAtomValue(levelAtom);
    const background = useAtomValue(backgroundAtom);
    const appearance = useAtomValue(appearanceAtom);
    const coreAttributes = useAtomValue(coreAttributesAtom);
    const skills = useAtomValue(skillsAtom);
    const hitPoints = useAtomValue(hitPointsAtom);
    const allies = useAtomValue(alliesAtom);
    const enemies = useAtomValue(enemiesAtom);
    const backstory = useAtomValue(backstoryAtom);
    const other = useAtomValue(otherAtom);

    // async function sendToServerEditedCharacter() {
    //     try {
    //         if (!token) {
    //             toast(`Please log in first`);
    //             return;
    //         }

    //         await axios.put('http://localhost:6969/char/edit-character', character, { headers: { 'Authorization': token } });
    //         console.log("Character created successfully");
    //         navigate("/character-selection", { state: { refetch: true } });
    //         toast(`Character created successfully`);
    //     } catch (error) {
    //         // Check if the error is an AxiosError and has a response
    //         if (axios.isAxiosError(error) && error.response) {
    //             toast(`Failed to create character: ${error.response.data}`);
    //             console.error("Failed to create character:", error.response.data);
    //         } else {
    //             // For any other types of errors
    //             toast(`Failed to create character: An unknown error occurred`);
    //             console.error("Failed to create character:", error);
    //         }
    //     }
    // }


    return (
        <div>
            <h3>Manage Character</h3>

        </div>
    )
}

export default characterEditPage
