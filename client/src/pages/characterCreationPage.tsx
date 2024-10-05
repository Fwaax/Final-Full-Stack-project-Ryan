import React, { useEffect, useState } from 'react';
import { NumericInputWithNumberValue } from '../components/numberInput';

// Updating the currect state for the character to update on the webpage

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

type Gender = "male" | "female" | "";
type Alignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil" | "";
type Size = "Small" | "Medium" | "Large" | "";
type Faith = "Torm" | "Tyr" | "Lathander" | "Mystra" | "Selûne" | "Sune" | "Tempus" | "Kelemvor" | "Bane" | "Bhaal" | "Shar" | "Lolth" | "Pelor" | "Heironeous" | "Rao" | "St. Cuthbert" | "Nerull" | "Vecna" | "Erythnul" | "Iuz" | "Arawai" | "Balinor" | "Boldrei" | "The Devourer" | "The Mockery" | "Nature" | "Philosophies" | "";

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
            alignment: '',
            gender: '',
            eyes: '',
            size: '',
            height: '',
            faith: '',
            hair: '',
            skin: '',
            age: '',
            weight: '',
        } as CharacterAppearance,

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




    // Helper function for handling ability score changes
    const handleAbilityChange = (ability: AbilityScore, value: number) => {
        setCharacter({ ...character, [ability]: value });
    };

    return (
        <div className="container mx-auto p-4 bg-gray-700">
            <h1 className="text-3xl font-bold mb-4">Create Your D&D Character</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                    Name:
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.name}
                        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                    />
                </label>

                <label className="block">
                    Race:
                    <select
                        name="race"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.race}
                        onChange={(e) => setCharacter({ ...character, race: e.target.value })}
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
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.class}
                        onChange={(e) => setCharacter({ ...character, class: e.target.value })}
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
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.background}
                        onChange={(e) => setCharacter({ ...character, background: e.target.value })}
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

                <label className="block">
                    Gender:
                    <select
                        name="gender"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.appearance.gender}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, gender: e.target.value as Gender } })}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>

                <label className="block">
                    Alignment:
                    <select
                        name="alignment"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.appearance.alignment}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, alignment: e.target.value as Alignment } })}
                    >
                        <option value="">Select Alignment</option>
                        <option value="True Neutral">True Neutral</option>
                        <option value="Lawful Good">Lawful Good</option>
                        <option value="Lawful Neutral">Lawful Neutral</option>
                        <option value="Lawful Evil">Lawful Evil</option>
                        <option value="Chaotic Good">Chaotic Good</option>
                        <option value="Chaotic Neutral">Chaotic Neutral</option>
                        <option value="Chaotic Evil">Chaotic Evil</option>
                    </select>
                </label>

                <label className='block'>
                    Size:
                    <select
                        name="size"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.appearance.size}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, size: e.target.value as Size } })}
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </label>

                <label className="block">
                    Faith:
                    <select
                        name="faith"
                        className="mt-1 block w-full p-2 border border-gray-900 rounded-md bg-slate-600"
                        value={character.appearance.faith}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, faith: e.target.value as Faith } })}
                    >
                        <option value="">Select Faith</option>
                        <option value="Torm">Torm</option>
                        <option value="Tyr">Tyr</option>
                        <option value="Lathander">Lathander</option>
                        <option value="Mystra">Mystra</option>
                        <option value="Selûne">Selûne</option>
                        <option value="Sune">Sune</option>
                        <option value="Tempus">Tempus</option>
                        <option value="Kelemvor">Kelemvor</option>
                        <option value="Bane">Bane</option>
                        <option value="Bhaal">Bhaal</option>
                        <option value="Shar">Shar</option>
                        <option value="Lolth">Lolth</option>
                        <option value="Pelor">Pelor</option>
                        <option value="Heironeous">Heironeous</option>
                        <option value="Rao">Rao</option>
                        <option value="St. Cuthbert">St. Cuthbert</option>
                        <option value="Nerull">Nerull</option>
                        <option value="Vecna">Vecna</option>
                        <option value="Erythnul">Erythnul</option>
                        <option value="Iuz">Iuz</option>
                        <option value="Arawai">Arawai</option>
                        <option value="Balinor">Balinor</option>
                        <option value="Boldrei">Boldrei</option>
                        <option value="The Devourer">The Devourer</option>
                        <option value="The Mockery">The Mockery</option>
                        <option value="Nature">Nature</option>
                        <option value="Philosophies">Philosophies</option>
                    </select>
                </label>
            </div>

            <div className="flex flex-row flex-wrap justify-between">
                <div>
                    <label htmlFor="hair">Hair</label>
                    <input type="text" name="hair" className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.hair}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, hair: e.target.value } })} placeholder="Hair" />
                </div>

                <div>
                    <label htmlFor="skin">Skin</label>
                    <input type="text" name="skin" className="mt-1 flex  p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.skin}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, skin: e.target.value } })} placeholder="Skin" />
                </div>

                <div>
                    <label htmlFor="eyes">Eyes</label>
                    <input type="text" name="eyes" className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.eyes}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, eyes: e.target.value } })} placeholder="Eyes" />
                </div>

                <div>
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.age}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, age: e.target.value } })} placeholder="Age" />
                </div>

                <div>
                    <label htmlFor="weight">Weight</label>
                    <input type="text" name="weight" className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.weight}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, weight: e.target.value } })} placeholder="Weight" />
                </div>

                <div>
                    <label htmlFor="height">Height</label>
                    <input type="text" name="height" className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.appearance.height}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, height: e.target.value } })} placeholder="Height" />
                </div>
            </div>

            <div className=' w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="personality_traits">Personality Traits</label>
                    <input className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.personalityTraits}
                        onChange={(e) => setCharacter({ ...character, personalityTraits: e.target.value })} placeholder="Personality Traits" type="text" name='personality_traits' />
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-6">Ability Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as AbilityScore[]).map((ability) => (
                    <label key={ability} className="block">
                        {ability.charAt(0).toUpperCase() + ability.slice(1)}:
                        <NumericInputWithNumberValue className='' value={character[ability]} setValue={(num: number) => handleAbilityChange(ability, num)} />
                    </label>
                ))}
            </div>

            <h3 className="text-xl font-semibold mt-6">Character Summary</h3>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <p><strong>Name:</strong> {character.name}</p>
                <p><strong>Race:</strong> {character.race}</p>
                <p><strong>Class:</strong> {character.class}</p>
                <p><strong>Level:</strong> {character.level}</p>
                <p><strong>Background:</strong> {character.background}</p>
                <p><strong>Characteristics:</strong> {character.characteristics}</p>
                <p><strong>Personality Traits:</strong> {character.personalityTraits}</p>
                <p><strong>Size:</strong> {character.appearance.size}</p>
                <p><strong>Faith:</strong> {character.appearance.faith}</p>
                <p><strong>Organizations:</strong> {character.organizations}</p>
                <p><strong>Allies:</strong> {character.allies}</p>
                <p><strong>Enemies:</strong> {character.enemies}</p>
                <p><strong>Backstory:</strong> {character.backstory}</p>
                <p><strong>Other:</strong> {character.other}</p>
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
