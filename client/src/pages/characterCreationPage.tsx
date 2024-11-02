import React, { useEffect, useState } from 'react';
import { NumericInputWithNumberValue } from '../components/numberInput';
import axios from 'axios';
import { useJwtToken } from '../hooks/useJwtToken';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { toast } from 'react-toastify';
import { AbilityScore, Alignment, INewCharacterToSendToBackend, CharacterAppearance, Faith, Gender, Size } from '../Interfaces';
import CreationStatRoll from '../components/creationStatRoll';
import { SkillKey } from '../Interfaces/apiRespose';


const CharacterCreationPage: React.FC = () => {
    const [character, setCharacter] = useState<INewCharacterToSendToBackend>({
        name: '',
        race: '',
        class: '',
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
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10,
        firstSelectedSkill: '',
        secondSelectedSkill: '',
        thirdSelectedSkillHuman: '',
    });
    const isHuman = character.race === 'Human';

    const { token } = useJwtToken();
    const navigate = useNavigate();

    async function sendToServerNewCharacter() {
        try {
            if (!token) {
                toast(`Please log in first`);
                return;
            }

            await axios.post('http://localhost:6969/char/new-character', character, { headers: { 'Authorization': token } });
            console.log("Character created successfully");
            navigate("/character-selection", { state: { refetch: true } });
            toast(`Character created successfully`);
        } catch (error) {
            // Check if the error is an AxiosError and has a response
            if (axios.isAxiosError(error) && error.response) {
                toast(`Failed to create character: ${error.response.data}`);
                console.error("Failed to create character:", error.response.data);
            } else {
                // For any other types of errors
                toast(`Failed to create character: An unknown error occurred`);
                console.error("Failed to create character:", error);
            }
        }
    }
    const randomizeCharacter = () => {
        setCharacter({
            name: faker.person.firstName(),
            race: faker.helpers.arrayElement(['Human', 'Elf', 'Dwarf', 'Halfling', 'Tiefling', 'Orc']),
            class: faker.helpers.arrayElement(['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Bard', 'Ranger', 'Druid', 'Monk', 'Paladin', 'Barbarian', 'Sorcerer', 'Warlock']),
            background: faker.helpers.arrayElement(['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin']),
            characteristics: faker.lorem.sentence(),
            personalityTraits: faker.lorem.sentence(),
            appearance: {
                alignment: faker.helpers.arrayElement(['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']),
                gender: faker.helpers.arrayElement(['Male', 'Female']),
                eyes: faker.color.human(),
                size: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
                height: `${faker.number.int({ min: 4, max: 7 })} ft`,
                faith: faker.helpers.arrayElement(['Torm', 'Tyr', 'Lathander', 'Mystra', 'Selûne', 'Sune', 'Tempus', 'Kelemvor', 'Bane', 'Bhaal', 'Shar', 'Lolth', 'Pelor', 'Heironeous', 'Rao', 'St. Cuthbert', 'Nerull', 'Vecna', 'Erythnul', 'Iuz', 'Arawai', 'Balinor', 'Boldrei', 'The Devourer', 'The Mockery', 'Nature', 'Philosophies']),
                hair: faker.color.human(),
                skin: faker.color.human(),
                age: faker.number.int({ min: 18, max: 120 }).toString(),
                weight: `${faker.number.int({ min: 100, max: 300 })} lbs`,
            },
            organizations: faker.company.name(),
            allies: faker.person.firstName(),
            enemies: faker.person.firstName(),
            backstory: faker.lorem.paragraph(),
            other: faker.lorem.sentence(),
            STR: faker.number.int({ min: 1, max: 20 }),
            DEX: faker.number.int({ min: 1, max: 20 }),
            CON: faker.number.int({ min: 1, max: 20 }),
            INT: faker.number.int({ min: 1, max: 20 }),
            WIS: faker.number.int({ min: 1, max: 20 }),
            CHA: faker.number.int({ min: 1, max: 20 }),
            firstSelectedSkill: '',
            secondSelectedSkill: '',
            thirdSelectedSkillHuman: '',
        });
    };



    // Helper function for handling ability score changes
    const handleAbilityChange = (ability: AbilityScore, value: number) => {
        setCharacter({ ...character, [ability]: value });
    };

    const classSkills: { [key: string]: SkillKey[] } = {
        "Barbarian": ["animalHandling", "athletics", "intimidation", "nature", "perception", "survival"],
        "Cleric": ["history", "insight", "medicine", "persuasion", "religion"],
        "Druid": ["arcana", "animalHandling", "insight", "medicine", "nature", "perception", "religion", "survival"],
        "Fighter": ["acrobatics", "animalHandling", "athletics", "history", "insight", "intimidation", "perception", "survival"],
        "Monk": ["acrobatics", "athletics", "history", "insight", "religion", "stealth"],
        "Paladin": ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"],
        "Ranger": ["animalHandling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"],
        "Rogue": ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "persuasion", "performance", "sleightOfHand", "stealth"],
        "Sorcerer": ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"],
        "Warlock": ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"],
        "Wizard": ["arcana", "history", "insight", "investigation", "medicine", "religion"],
        "Bard": ["acrobatics", "animalHandling", "athletics", "deception", "insight", "intimidation", "performance", "persuasion", "sleightOfHand"],
    }

    const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCharacter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClassChange = (selectedClass: string) => {
        setCharacter(prev => ({
            ...prev,
            class: selectedClass,
            firstSelectedSkill: classSkills[selectedClass]?.[0] || '',
            secondSelectedSkill: classSkills[selectedClass]?.[1] || ''
        }));
    };

    useEffect(() => {
        if (character.class) {
            setCharacter(prev => ({
                ...prev,
                firstSelectedSkill: classSkills[character.class]?.[0] || '',
                secondSelectedSkill: classSkills[character.class]?.[1] || ''
            }));
        }
    }, [character.class]);

    // const classCantrips: { [key: string]: Cantrips } = {
    //     "Barbarian": ["cantripsKnown"],
    //     "Cleric": ["cantripsKnown"],
    //     "Druid": ["cantripsKnown"],
    //     "Fighter": ["cantripsKnown"],
    //     "Monk": ["cantripsKnown"],
    //     "Paladin": ["cantripsKnown"],
    //     "Ranger": ["cantripsKnown"],
    //     "Rogue": ["cantripsKnown"],
    //     "Sorcerer": ["cantripsKnown"],
    //     "Warlock": ["cantripsKnown"],
    //     "Wizard": ["cantripsKnown"],
    //     "Bard": ["cantripsKnown"],
    // };



    return (
        <div className="container mx-auto p-4 bg-[#1d1e2a]">
            <h1 className="text-3xl font-bold mb-4">Create Your D&D Character</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block font-semibold">
                    name:
                    <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={character.name}
                        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                    />
                </label>

                <label className="block font-semibold">
                    Race:
                    <select
                        name="race"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={character.race}
                        onChange={(e) => setCharacter({ ...character, race: e.target.value })}
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
                    Class:
                    <select
                        name="class"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={character.class}
                        onChange={(e) => setCharacter({ ...character, class: e.target.value })}
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
                    Background:
                    <select
                        name="background"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
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

                <label className="block font-semibold">
                    Gender:
                    <select
                        name="gender"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={character.appearance.gender}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, gender: e.target.value as Gender } })}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>

                <label className="block font-semibold">
                    Alignment:
                    <select
                        name="alignment"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
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

                <label className='block font-semibold'>
                    Size:
                    <select
                        name="size"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
                        value={character.appearance.size}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, size: e.target.value as Size } })}
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </label>

                <label className="block font-semibold">
                    Faith:
                    <select
                        name="faith"
                        className="mt-1 block w-full p-2 border border-[#bfbfba] rounded-md bg-[#2a2b3c]"
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
                    <label htmlFor="hair" className='font-semibold'>Hair</label>
                    <input type="text" name="hair" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.hair}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, hair: e.target.value } })} placeholder="Hair" />
                </div>

                <div>
                    <label htmlFor="skin" className='font-semibold'>Skin</label>
                    <input type="text" name="skin" className="mt-1 flex  p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.skin}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, skin: e.target.value } })} placeholder="Skin" />
                </div>

                <div>
                    <label htmlFor="eyes" className='font-semibold'>Eyes</label>
                    <input type="text" name="eyes" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.eyes}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, eyes: e.target.value } })} placeholder="Eyes" />
                </div>

                <div>
                    <label htmlFor="age" className='font-semibold'>Age</label>
                    <input type="text" name="age" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.age}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, age: e.target.value } })} placeholder="Age" />
                </div>

                <div>
                    <label htmlFor="weight" className='font-semibold'>Weight</label>
                    <input type="text" name="weight" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.weight}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, weight: e.target.value } })} placeholder="Weight" />
                </div>

                <div>
                    <label htmlFor="height" className='font-semibold'>Height</label>
                    <input type="text" name="height" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.appearance.height}
                        onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, height: e.target.value } })} placeholder="Height" />
                </div>
            </div>

            <div className=' w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="personality_traits" className='font-semibold'>Personality Traits</label>
                    <input className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold" value={character.personalityTraits}
                        onChange={(e) => setCharacter({ ...character, personalityTraits: e.target.value })} placeholder="Personality Traits" type="text" name='personality_traits' />
                </div>
            </div>
            <div className=' w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="characteristics" className='font-semibold'>Characteristics</label>
                    <input className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold" value={character.characteristics}
                        onChange={(e) => setCharacter({ ...character, characteristics: e.target.value })} placeholder="Characteristics" type="text" name='characteristics' />
                </div>
            </div>
            <div>
                {/* picking 2 skills for the class */}
                <h6>Choose 2 skills for your {character.class}</h6>
                <div>
                    <label htmlFor="firstSelectedSkill" className="font-semibold">Skill 1</label>
                    <select
                        name="firstSelectedSkill"
                        id="firstSelectedSkill"
                        onChange={handleSkillSelect}
                        value={character.firstSelectedSkill}
                        className="bg-[#2a2b3c]"
                    >
                        {character.class && classSkills[character.class].map(skill => (
                            skill !== character.secondSelectedSkill ? (
                                <option className="text-green-500" key={skill} value={skill}>{skill}</option>) : null))}
                    </select>
                </div>

                <div>
                    <label htmlFor="secondSelectedSkill" className="font-semibold">Skill 2</label>
                    <select
                        name="secondSelectedSkill"
                        id="secondSelectedSkill"
                        onChange={handleSkillSelect}
                        value={character.secondSelectedSkill}
                        className="bg-[#2a2b3c]"
                    >
                        {character.class && classSkills[character.class].map(skill => (
                            skill !== character.firstSelectedSkill ? (
                                <option className="text-red-500" key={skill} value={skill}>{skill}</option>) : null))}
                    </select>
                </div>
                {isHuman && (<div>
                    <label htmlFor="thirdSelectedSkillHuman" className="font-semibold">Skill Human</label>
                    <select
                        name="thirdSelectedSkillHuman"
                        id="thirdSelectedSkillHuman"
                        onChange={handleSkillSelect}
                        value={character.thirdSelectedSkillHuman}
                        className="bg-[#2a2b3c]"
                    >
                        {character.class && classSkills[character.class].map(skill => (
                            skill !== character.firstSelectedSkill && skill !== character.secondSelectedSkill ? (
                                <option className="text-red-500" key={skill} value={skill}>{skill}</option>) : null))}
                    </select>
                </div>)
                }
            </div>

            <h2 className="text-2xl font-semibold mt-6">Ability Scores</h2>
            <div className="m-8">
                <CreationStatRoll />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as AbilityScore[]).map((ability) => (
                    <div key={ability} className="flex flex-col items-start">
                        <label className="text-lg font-semibold text-gray-300 mb-1">
                            {ability.charAt(0).toUpperCase() + ability.slice(1)}:
                        </label>
                        <NumericInputWithNumberValue
                            className="w-full bg-[#1d1e2a] border border-[#bfbfba] text-[#bfbfba] p-2 rounded-sm"
                            value={character[ability]}
                            setValue={(num: number) => handleAbilityChange(ability, num)}
                        />
                    </div>
                ))}
            </div>

            <h3 className="text-xl font-semibold mt-6">Character Summary</h3>
            <div className="bg-[#2a2b3c] p-4 rounded-lg shadow-lg">
                <p><strong>name:</strong> {character.name}</p>
                <p><strong>Race:</strong> {character.race}</p>
                <p><strong>Class:</strong> {character.class}</p>
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
                <p><strong>Strength:</strong> {character.STR}</p>
                <p><strong>Dexterity:</strong> {character.DEX}</p>
                <p><strong>Constitution:</strong> {character.CON}</p>
                <p><strong>Intelligence:</strong> {character.INT}</p>
                <p><strong>Wisdom:</strong> {character.WIS}</p>
                <p><strong>Charisma:</strong> {character.CHA}</p>
            </div>
            <div className='flex flex-row justify-between mt-2'>
                <div><button className='bg-[#2a2b3c] p-4 rounded-lg shadow-lg font-semibold' onClick={sendToServerNewCharacter}>Create Character</button></div>
                <div><button className='bg-[#2a2b3c] p-4 rounded-lg shadow-lg font-semibold' onClick={randomizeCharacter}>Random Character</button></div>
            </div>
        </div>
    );
};

export default CharacterCreationPage;
