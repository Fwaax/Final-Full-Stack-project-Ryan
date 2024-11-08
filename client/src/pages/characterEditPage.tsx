import React, { useEffect, useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import {
    nameAtom, classAtom, raceAtom, levelAtom, appearanceAtom,
    hitPointsAtom, alliesAtom, enemiesAtom, otherAtom, coreAttributesAtom
} from '../atoms';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../const';
import { toast } from 'react-toastify';
import { ICharacterCurrentStateApiResponse } from '../Interfaces/apiRespose';
import { useJwtToken } from '../hooks/useJwtToken';

const CharacterEditPage: React.FC = () => {
    const { token } = useJwtToken();
    const { characterId: characterIdFromUrl } = useParams<{ characterId: string }>();
    const [error, setError] = useState<string | null>(null);
    const [isFetched, setIsFetched] = useState(false);
    const { characterId } = useParams<{ characterId: string }>();
    const [loading, setLoading] = useState(false);

    // Setters for atoms
    const setName = useSetAtom(nameAtom);
    const setClass = useSetAtom(classAtom);
    const setRace = useSetAtom(raceAtom);
    const setLevel = useSetAtom(levelAtom);
    const setAppearance = useSetAtom(appearanceAtom);
    const setHitPoints = useSetAtom(hitPointsAtom);
    const setAllies = useSetAtom(alliesAtom);
    const setEnemies = useSetAtom(enemiesAtom);
    const setOther = useSetAtom(otherAtom);

    // Values for form fields
    const name = useAtomValue(nameAtom);
    const characterClass = useAtomValue(classAtom);
    const race = useAtomValue(raceAtom);
    const level = useAtomValue(levelAtom);
    const appearance = useAtomValue(appearanceAtom);
    const hitPoints = useAtomValue(hitPointsAtom);
    const allies = useAtomValue(alliesAtom);
    const enemies = useAtomValue(enemiesAtom);
    const other = useAtomValue(otherAtom);

    // Load character data on component mount
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
                setAppearance(data.appearance);
                setHitPoints(data.hitPoints);
                setAllies(data.allies);
                setEnemies(data.enemies);
                setOther(data.other);
                setError(null);
                toast("Character fetched successfully");
            } catch (err) {
                console.error("Failed to fetch character:", err);

                setError("Failed to fetch character");
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [characterIdFromUrl, token]);

    if (loading) return <p>Loading...</p>;

    console.log('Appearance:', appearance);
    console.log('Hit Points:', hitPoints);
    console.log(`coreAttributesAtom`, coreAttributesAtom);



    // Function to handle saving character data
    const handleSubmit = async () => {
        const updatedCharacterData = {
            name,
            class: characterClass,
            race,
            level,
            appearance,
            hitPoints,
            allies,
            enemies,
            other,
        };
        try {
            console.log(`updatedCharacterData`, updatedCharacterData);
            await axios.put(`http://localhost:6969/char/characters-edit/${characterId}`, updatedCharacterData);
            alert('Character updated successfully!');
        } catch (error) {
            console.error("Error updating character:", error);
            alert("Failed to update character.");
        }
    };


    return (
        <div className="edit-character-page p-6 text-gray-300 flex flex-col items-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Character</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Name */}
                <label className="block font-semibold">
                    Name:
                    <input
                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                {/* Class */}
                <label className="block font-semibold">
                    Class:
                    <input
                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                        value={characterClass}
                        onChange={(e) => setClass(e.target.value)}
                    />
                </label>

                {/* Race */}
                <label className="block font-semibold">
                    Race:
                    <input
                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                    />
                </label>

                {/* Level */}
                <label className="block font-semibold">
                    Level:
                    <input
                        type="number"
                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                        value={level}
                        onChange={(e) => setLevel(parseInt(e.target.value))}
                    />
                </label>

                {/* Appearance Section */}
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Appearance</h2>

                    {/* Render Appearance fields only if data is available */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {appearance ? (
                            (['alignment', 'gender', 'eyes', 'size', 'height', 'faith', 'hair', 'skin', 'age', 'weight'] as (keyof typeof appearance)[]).map((field) => (
                                <label className="block font-semibold" key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                    <input
                                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                                        type="text"
                                        value={appearance[field] || ''}  // Ensure no undefined values
                                        onChange={(e) => setAppearance({ ...appearance, [field]: e.target.value })}
                                    />
                                </label>
                            ))
                        ) : (
                            <p>Loading appearance data...</p>  // Placeholder while loading
                        )}
                    </div>
                </div>

                {/* Hit Points Section */}
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Hit Points</h2>

                    {/* Render Hit Points fields only if data is available */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hitPoints ? (
                            (['max'] as (keyof typeof hitPoints)[]).map((field) => (
                                <label className="block font-semibold" key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)} Hit Points:
                                    <input
                                        className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300"
                                        type="number"
                                        value={hitPoints[field] || 0}  // Ensure no undefined values
                                        onChange={(e) => setHitPoints({ ...hitPoints, [field]: parseInt(e.target.value) || 0 })}
                                    />
                                </label>
                            ))
                        ) : (
                            <p>Loading hit points data...</p>  // Placeholder while loading
                        )}
                    </div>
                </div>

                {/* Allies, Enemies, Other */}
                {['Allies', 'Enemies', 'Other'].map((field) => (
                    <label className="block font-semibold col-span-2" key={field}>
                        {field}:
                        <textarea
                            className="w-full mt-1 p-2 border border-gray-400 rounded bg-gray-800 text-gray-300 resize-none"
                            value={field === 'Allies' ? allies : field === 'Enemies' ? enemies : other}
                            onChange={(e) => (field === 'Allies' ? setAllies(e.target.value) : field === 'Enemies' ? setEnemies(e.target.value) : setOther(e.target.value))}
                        />
                    </label>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <button
                    className="p-3 rounded-md bg-blue-600 text-gray-300 hover:bg-blue-700 transition duration-200"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );

};

export default CharacterEditPage;

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
