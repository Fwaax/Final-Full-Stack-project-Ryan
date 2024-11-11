import React, { useEffect, useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import {
    nameAtom, classAtom, raceAtom, levelAtom, appearanceAtom,
    hitPointsAtom, alliesAtom, enemiesAtom, otherAtom, coreAttributesAtom
} from '../atoms';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
    const navigate = useNavigate()

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

    const getOptionsForField = (field: keyof typeof appearance) => {
        switch (field) {
            case 'gender':
                return ['Male', 'Female'];
            case 'alignment':
                return ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
            case 'faith':
                return ["Torm", "Tyr", "Lathander", "Mystra", "Selûne", "Sune", "Tempus", "Kelemvor", "Bane", "Bhaal", "Shar", "Lolth", "Pelor", "Heironeous", "Rao", "St. Cuthbert", "Nerull", "Vecna", "Erythnul", "Iuz", "Arawai", "Balinor", "Boldrei", "The Devourer", "The Mockery", "Nature", "Philosophies", ""];
            case 'size':
                return ['Small', 'Medium', 'Large'];
            default:
                return [];
        }
    };

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
            const token = localStorage.getItem('token');
            if (!token) {
                alert('User is not authenticated.');
                return;
            }
            await axios.put(`${BACKEND_URL}/char/edit-character/${characterId}`, updatedCharacterData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Character updated successfully!');
            navigate(`/character-sheet/${characterId}`);
        } catch (error) {
            console.error('Error updating character:', error);
            alert('Failed to update character.');
        }
    };

    return (
        <div className="edit-character-page p-6 text-gray-300 flex flex-col items-center max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Character</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <label className="block font-semibold">
                    Name:
                    <input
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className="block font-semibold">
                    Class:
                    <select
                        name="class"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={characterClass}
                        onChange={(e) => setClass(e.target.value)}
                    >
                        <option value="">Select Class</option>
                        <option value="Barbarian">Barbarian</option>
                        <option value="Bard">Bard</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Druid">Druid</option>
                        <option value="Fighter">Fighter</option>
                        <option value="Monk">Monk</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Ranger">Ranger</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Sorcerer">Sorcerer</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Wizard">Wizard</option>
                    </select>
                </label>
                <label className="block font-semibold">
                    Race:
                    <select
                        name="race"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                    >
                        <option value="">Select Race</option>
                        <option value="Human">Human</option>
                        <option value="Elf">Elf</option>
                        <option value="Dwarf">Dwarf</option>
                        <option value="Drow">Drow</option>
                        <option value="Halfling">Halfling</option>
                        <option value="Tiefling">Tiefling</option>
                        <option value="Orc">Orc</option>
                    </select>
                </label>
                <label className="block font-semibold">
                    Level:
                    <input
                        type="number"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={level}
                        onChange={(e) => setLevel(parseInt(e.target.value))}
                    />
                </label>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Appearance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {appearance ? (
                            (['alignment', 'gender', 'eyes', 'size', 'height', 'faith', 'hair', 'skin', 'age', 'weight'] as (keyof typeof appearance)[]).map((field) => (
                                <div key={field} className="block font-semibold">
                                    <label className="mb-1 block">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                                    </label>
                                    {(field === 'alignment' || field === 'gender' || field === 'faith' || field === 'size') ? (
                                        <select
                                            className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                                            value={appearance[field] || ''}
                                            onChange={(e) => setAppearance({ ...appearance, [field]: e.target.value })}
                                        >
                                            <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
                                            {getOptionsForField(field).map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                                            type="text"
                                            value={appearance[field] || ''}
                                            onChange={(e) => setAppearance({ ...appearance, [field]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Loading appearance data...</p>
                        )}
                    </div>
                </div>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Hit Points</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hitPoints ? (
                            (['max'] as (keyof typeof hitPoints)[]).map((field) => (
                                <label className="block font-semibold" key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)} Hit Points:
                                    <input
                                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                                        type="number"
                                        value={hitPoints[field] || 0}
                                        onChange={(e) => setHitPoints({ ...hitPoints, [field]: parseInt(e.target.value) || 0 })}
                                    />
                                </label>
                            ))
                        ) : (
                            <p>Loading hit points data...</p>
                        )}
                    </div>
                </div>
                {['Allies', 'Enemies', 'Other'].map((field) => (
                    <label className="block font-semibold col-span-2" key={field}>
                        {field}:
                        <textarea
                            className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c] resize-none"
                            value={field === 'Allies' ? allies : field === 'Enemies' ? enemies : other}
                            onChange={(e) => (field === 'Allies' ? setAllies(e.target.value) : field === 'Enemies' ? setEnemies(e.target.value) : setOther(e.target.value))}
                        />
                    </label>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    className="p-4 rounded-md bg-blue-600 text-gray-300 hover:bg-blue-700 transition duration-200"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
};
export default CharacterEditPage;