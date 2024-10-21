import React, { useEffect, useState } from "react";
import TopPanel from "../components/topPanel";
import StatsPanel from "../components/statsPanel";
import BottomPanel from "../components/bottomPanel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useJwtToken } from "../hooks/useJwtToken";
import { BACKEND_URL } from "../const";
import { toast } from "react-toastify";
import {
    useAtomValue, useSetAtom
} from "jotai";
import {
    backgroundAtom, classAtom, levelAtom, nameAtom, raceAtom, appearanceAtom,
    coreAttributesAtom, skillsAtom, hitPointsAtom, alliesAtom, enemiesAtom,
    backstoryAtom, userIdAtom, createdAtAtom, updatedAtAtom,
    otherAtom
} from "../atoms";
import { ICharacterCurrentStateApiResponse } from "../Interfaces/apiRespose";

const CharacterSheetPage = () => {
    const { token } = useJwtToken();
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

    // Fetch character data with useEffect
    useEffect(() => {
        const fetchCharacter = async () => {
            if (!token) {
                toast("Please log in first");
                setError("Unauthorized, Token is missing");
                return;
            }
            if (!characterIdFromUrl) {
                toast("Character not found");
                setError("Character not found");
                return;
            }

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/char/my-character/${characterIdFromUrl}`,
                    { headers: { Authorization: token } }
                );
                const data = response.data.data as ICharacterCurrentStateApiResponse;

                // Populate atoms with character data
                setName(data.name);
                setClass(data.class);
                setRace(data.race);
                setLevel(data.level);
                setBackground(data.background);
                setAppearance(data.appearance);
                setCoreAttributes(data.coreAttributes);
                setSkills(data.skills);
                setHitPoints(data.hitPoints);
                setAllies(data.allies);
                setEnemies(data.enemies);
                setBackstory(data.backstory);
                setUserId(data.userId);
                setCreatedAt(data.createdAt);
                setUpdatedAt(data.updatedAt);
                setOther(data.other);
                setError(null);
                setIsFetched(true);
            } catch (err) {
                console.error("Failed to fetch character:", err);
                setError("Failed to fetch character");
            }
        };

        fetchCharacter();
    }, [characterIdFromUrl, token]);

    const saveCharacter = async () => {
        const charStateToSendToBE: ICharacterCurrentStateApiResponse = {
            appearance,
            name,
            class: characterClass,
            race,
            level,
            background,
            coreAttributes,
            skills,
            hitPoints,
            allies,
            enemies,
            backstory,
            other,
            userId: "", // Populate as needed
            createdAt: "", // Populate as needed
            updatedAt: "", // Populate as needed
            _id: "", // Populate as needed
            proficiencyBonus: 0,
            characteristics: "",
            personalityTraits: "",
            organizations: "",
            __v: 0,
        };

        const { userId, createdAt, updatedAt, _id, __v, ...payload } = charStateToSendToBE;

        if (!isFetched) {
            console.log("Character not fetched yet", `Current Character State: ${JSON.stringify(payload)}`);
            return;
        }

        try {
            await axios.put(`${BACKEND_URL}/char/edit-character/${characterIdFromUrl}`, payload, {
                headers: { Authorization: token },
            });
            console.log("Character state saved!");
        } catch (err) {
            console.error("Failed to save character:", err);
        }
    };

    // Auto-save every 5 seconds
    useEffect(() => {
        const interval = setInterval(saveCharacter, 5000);
        return () => clearInterval(interval);
    }, [appearance, name, characterClass, race, level, background, coreAttributes, skills, hitPoints, allies, enemies, backstory]);

    if (error) return <div>Error: {error}</div>;

    return isFetched ? (
        <div className="w-full h-full bg-[#292929]">
            <div className="w-11/12 2xl:w-9/12 mx-auto flex flex-col gap-2">
                <TopPanel />
                <StatsPanel />
                <BottomPanel />
            </div>
        </div>
    ) : (
        <div>Loading character...</div>
    );
};

export default CharacterSheetPage;
