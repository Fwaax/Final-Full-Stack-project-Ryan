import React, { useState } from 'react';

interface Character {
    name: string;
    race: string;
    class: string;
    level: number;
    background: string;
    characteristics: string;
    personalityTraits: string;
    appearance: CharacterAppearance;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

type Gender = "male" | "female";
type Alignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil";
type Size = "Small" | "Medium" | "Large";
type Faith = "Torm" | "Tyr" | "Lathander" | "Mystra" | "Selûne" | "Sune" | "Tempus" | "Kelemvor" | "Bane" | "Bhaal" | "Shar" | "Lolth" | "Pelor" | "Heironeous" | "Rao" | "St. Cuthbert" | "Nerull" | "Vecna" | "Erythnul" | "Iuz" | "Arawai" | "Balinor" | "Boldrei" | "The Devourer" | "The Mockery" | "Nature" | "Philosophies";

interface CharacterAppearance {
    alignment: Alignment;
    gender: Gender;
    eyes: string;
    size: Size;
    height: string;
    faith: Faith;
    hair: string;
    skin: string;
    age: string;
    weight: string;
}

// Create a type for the ability score keys
type AbilityScore = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

const CharacterCreationPage: React.FC = () => {
    const [character, setCharacter] = useState<Character>({
        name: '',
        race: '',
        class: '',
        level: 1,
        background: '',
        characteristics: '',
        personalityTraits: '',
        appearance: {
            alignment: 'True Neutral',
            gender: 'male',
            eyes: 'brown',
            size: 'Medium',
            height: '5\'8"',
            faith: 'Nature',
            hair: 'black',
            skin: 'light',
            age: '25',
            weight: '150 lbs',
        },
        organizations: '',
        allies: '',
        enemies: '',
        backstory: '',
        other: '',
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCharacter({ ...character, [name]: value });
    };

    // Helper function for handling ability score changes
    const handleAbilityChange = (ability: AbilityScore, value: number) => {
        setCharacter({ ...character, [ability]: value });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Your D&D Character</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                    Name:
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={character.name}
                        onChange={handleChange}
                    />
                </label>

                <label className="block">
                    Race:
                    <select
                        name="race"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={character.race}
                        onChange={handleChange}
                    >
                        <option value="">Select Race</option>
                        <option value="Human">Human</option>
                        <option value="Elf">Elf</option>
                        <option value="Dwarf">Dwarf</option>
                        <option value="Halfling">Halfling</option>
                        <option value="Tiefling">Tiefling</option>
                        <option value="Orc">Orc</option>
                    </select>
                </label>

                <label className="block">
                    Class:
                    <select
                        name="class"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={character.class}
                        onChange={handleChange}
                    >
                        <option value="">Select Class</option>
                        <option value="Fighter">Fighter</option>
                        <option value="Wizard">Wizard</option>
                        <option value="Rogue">Rogue</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Bard">Bard</option>
                        <option value="Ranger">Ranger</option>
                    </select>
                </label>

                <label className="block">
                    Background:
                    <select
                        name="background"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={character.background}
                        onChange={handleChange}
                    >
                        <option value="">Select Background</option>
                        <option value="Acolyte">Acolyte</option>
                        <option value="Charlatan">Charlatan</option>
                        <option value="Criminal">Criminal</option>
                        <option value="Entertainer">Entertainer</option>
                        <option value="Guild Artisan">Guild Artisan</option>
                        <option value="Hermit">Hermit</option>
                        <option value="Noble">Noble</option>
                        <option value="Outlander">Outlander</option>
                        <option value="Sage">Sage</option>
                        <option value="Sailor">Sailor</option>
                        <option value="Soldier">Soldier</option>
                        <option value="Urchin">Urchin</option>
                    </select>
                </label>
            </div>

            <h2 className="text-2xl font-semibold mt-6">Ability Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as AbilityScore[]).map((ability) => (
                    <label key={ability} className="block">
                        {ability.charAt(0).toUpperCase() + ability.slice(1)}:
                        <input
                            type="number"
                            name={ability}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            value={character[ability]}
                            min="8"
                            max="20"
                            onChange={(e) => handleAbilityChange(ability, Number(e.target.value))}
                        />
                    </label>
                ))}
            </div>

            <h3 className="text-xl font-semibold mt-6">Character Summary</h3>
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <p><strong>Name:</strong> {character.name}</p>
                <p><strong>Race:</strong> {character.race}</p>
                <p><strong>Class:</strong> {character.class}</p>
                <p><strong>Strength:</strong> {character.strength}</p>
                <p><strong>Dexterity:</strong> {character.dexterity}</p>
                <p><strong>Constitution:</strong> {character.constitution}</p>
                <p><strong>Intelligence:</strong> {character.intelligence}</p>
                <p><strong>Wisdom:</strong> {character.wisdom}</p>
                <p><strong>Charisma:</strong> {character.charisma}</p>
            </div>
        </div>
    );
};

export default CharacterCreationPage;
