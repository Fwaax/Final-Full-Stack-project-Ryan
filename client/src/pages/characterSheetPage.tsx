import React, { useEffect, useState } from "react";
import TopPanel from "../components/topPanel";
import StatsPanel from "../components/statsPanel";
import BottomPanel from "../components/bottomPanel";
import { useNavigate, useParams } from "react-router-dom";
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
    otherAtom,
    inventoryAtom,
    spellsAtom,
    proficienciesAtom,
} from "../atoms";
import { ICharacterCurrentStateApiResponse } from "../Interfaces/apiRespose";
import D20 from "../components/svg/d20";


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
    const setInventory = useSetAtom(inventoryAtom);
    const setSpells = useSetAtom(spellsAtom);
    const setProficiencies = useSetAtom(proficienciesAtom);

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
    const userId = useAtomValue(userIdAtom);
    const createdAt = useAtomValue(createdAtAtom);
    const updatedAt = useAtomValue(updatedAtAtom);
    const inventory = useAtomValue(inventoryAtom);
    const spells = useAtomValue(spellsAtom);
    const proficiencies = useAtomValue(proficienciesAtom);

    // Fetch character data with useEffect
    useEffect(() => {
        const fetchCharacter = async () => {
            if (!token) {
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
                console.log(`Chracter fetched from backend`, data);

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
                setInventory(data.inventory);
                setSpells(data.spells);
                setProficiencies(data.proficiencies);
                toast("Character fetched successfully");
            } catch (err) {
                console.error("Failed to fetch character:", err);
                setError("Failed to fetch character");
            }
        };
        fetchCharacter();
    }, [characterIdFromUrl, token]);

    // const saveCharacter = async () => {
    //     const charStateToSendToBE: ICharacterCurrentStateApiResponse = {
    //         appearance,
    //         name,
    //         class: characterClass,
    //         race,
    //         level,
    //         background,
    //         coreAttributes,
    //         skills,
    //         hitPoints,
    //         allies,
    //         enemies,
    //         backstory,
    //         spells,
    //         other,
    //         inventory,
    //         userId: "",
    //         createdAt: "",
    //         updatedAt: "",
    //         _id: "",
    //         proficiencyBonus: 2,
    //         proficiencies,
    //         characteristics: "",
    //         personalityTraits: "",
    //         organizations: "",
    //         __v: 0,
    //     };

    //     const { userId, createdAt, updatedAt, _id, __v, ...payload } = charStateToSendToBE;
    //     if (!isFetched) {
    //         console.log("Character not fetched yet", `Current Character State: ${JSON.stringify(payload)}`);
    //         return;
    //     }

    //     try {
    //         await axios.put(`${BACKEND_URL}/char/edit-character/${characterIdFromUrl}`, payload, {
    //             headers: { Authorization: token },
    //         });
    //         console.log("Character state saved!");
    //     } catch (err) {
    //         console.error("Failed to save character:", err);
    //     }
    // };

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
            spells,
            other,
            inventory,
            userId: "",
            createdAt: "",
            updatedAt: "",
            _id: "",
            proficiencyBonus: 2,
            proficiencies,
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
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn("User is not authenticated.");
                return;
            }

            await axios.put(`${BACKEND_URL}/char/edit-character/${characterIdFromUrl}`, payload, {
                headers: { Authorization: `Bearer ${token}` },
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
    }, [appearance, name, characterClass, race, level, background, coreAttributes, skills, hitPoints, allies, enemies, backstory, spells, other, inventory, userId, createdAt, updatedAt, proficiencies]);

    const handleDiceClick = () => {
        const url = "/dice";  // Adjust path as needed
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (error) return <div>Error: {error}</div>;

    return isFetched ? (
        <div className="w-full h-full bg-[#292929]">
            <div className="w-11/12 2xl:w-9/12 mx-auto flex flex-col gap-2">
                <TopPanel characterId={characterIdFromUrl} />
                <StatsPanel />
                <BottomPanel />
                <D20 className="fixed bottom-6 left-2 cursor-pointer" onClick={handleDiceClick} />
            </div>
        </div>
    ) : (
        <div>Loading character...</div>
    );
};

export default CharacterSheetPage;
