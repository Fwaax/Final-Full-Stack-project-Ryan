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
import { spellsAtom } from '../atoms';
import CharacterCreationTop from '../components/characterCreationTop';
import CharacterCreationApperance from '../components/chracterCreationApperance';


const CharacterCreationPage: React.FC = () => {
    const classesWithCantrips = ["Cleric", "Druid", "Sorcerer", "Warlock", "Wizard", "Bard"];
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
        inventory: [],
        spells: [],
        firstSelectedCantrip: '',
        secondSelectedCantrip: '',
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
            inventory: [],
            spells: [],
            firstSelectedCantrip: '',
            secondSelectedCantrip: '',
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
            secondSelectedSkill: classSkills[selectedClass]?.[1] || '',
            thirdSelectedSkillHuman: classSkills[selectedClass]?.[2] || '',
        }));
    };

    useEffect(() => {
        if (character.class) {
            setCharacter(prev => ({
                ...prev,
                firstSelectedSkill: classSkills[character.class]?.[0] || '',
                secondSelectedSkill: classSkills[character.class]?.[1] || '',
                thirdSelectedSkillHuman: classSkills[character.class]?.[2] || '',
            }));
        }
    }, [character.class]);

    const classCantrips: { [key: string]: string[] } = {
        "Barbarian": [],
        "Cleric": ["Thaumaturgy", "Sacred Flame", "Guidance", "Resistance", "Blade Ward", "Produce Flame"],
        "Druid": ["Guidance", "Poison Spray", "Produce Flame", "Resistance", "Shillelagh", "Thorn Whip"],
        "Fighter": [],
        "Monk": [],
        "Paladin": [],
        "Ranger": [],
        "Rogue": [],
        "Sorcerer": ["Acid Splash", "Chill Touch", "Firebolt", "Poison Spray", "Ray of Frost", "Shocking Grasp", "Blade Ward", "Friends", "Dancing Lights", "Light", "Mage Hand", "Minor Illusion", "True Strike"],
        "Warlock": ["Eldritch Blast", "Blade Ward", "Booming Blade", "Chill Touch", "Create Bonfire", "Friends", "Frostbite", "Mage Hand", "Poison Spray", "True Strike"],
        "Wizard": ["Acid Splash", "Chill Touch", "Firebolt", "Poison Spray", "Ray of Frost", "Shocking Grasp", "Blade Ward", "Friends", "Dancing Lights", "Light", "Mage Hand", "Minor Illusion", "True Strike"],
        "Bard": ["Vicious mockery", "Blade Ward", "Mage Hand", "True Strike", "Friends", "Dancing Lights", "Light", "Minor Illusion"],
    };

    const handleCantripSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCharacter(prev => ({
            ...prev,
            [name]: value
        }))
    };

    // Auto-select initial cantrips based on class
    useEffect(() => {
        if (character.class) {
            setCharacter(prev => ({
                ...prev,
                firstSelectedCantrip: classCantrips[character.class]?.[0] || '',
                secondSelectedCantrip: classCantrips[character.class]?.[1] || '',
            }));
        }
    }, [character.class]);



    return (
        <div className="container mx-auto p-4 bg-[#1d1e2a]">
            <h1 className="text-3xl font-bold mb-4">Create Your D&D Character</h1>

            <CharacterCreationTop character={character} setCharacter={setCharacter} />

            <CharacterCreationApperance character={character} setCharacter={setCharacter} />

            <div className=' w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="personality_traits" className='font-semibold'>Personality Traits</label>
                    <input className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold" value={character.personalityTraits}
                        onChange={(e) => setCharacter({ ...character, personalityTraits: e.target.value })} placeholder="Personality Traits" type="text" name='personality_traits' />
                </div>
            </div>
            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="characteristics" className='font-semibold'>Characteristics</label>
                    <input className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold" value={character.characteristics}
                        onChange={(e) => setCharacter({ ...character, characteristics: e.target.value })} placeholder="Characteristics" type="text" name='characteristics' />
                </div>
            </div>

            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="backstory" className='font-semibold'>Backstory</label>
                    <textarea name="backstory" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.backstory}
                        onChange={(e) => setCharacter({ ...character, backstory: e.target.value })} placeholder="Backstory" />
                </div>
            </div>

            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="allies" className='font-semibold'>Allies</label>
                    <textarea name="allies" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.allies}
                        onChange={(e) => setCharacter({ ...character, allies: e.target.value })} placeholder="Allies" />
                </div>
            </div>

            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="enemies" className='font-semibold'>Enemies</label>
                    <textarea name="enemies" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.enemies}
                        onChange={(e) => setCharacter({ ...character, enemies: e.target.value })} placeholder="Enemies" />
                </div>
            </div>

            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="organizations" className='font-semibold'>Organizations</label>
                    <textarea name="organizations" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.organizations}
                        onChange={(e) => setCharacter({ ...character, organizations: e.target.value })} placeholder="Organizations" />
                </div>
            </div>

            <div className='w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="other" className='font-semibold'>Other</label>
                    <textarea name="other" className="mt-1 flex p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md " value={character.other}
                        onChange={(e) => setCharacter({ ...character, other: e.target.value })} placeholder="Other" />
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

            {classesWithCantrips.includes(character.class) && (
                <div>
                    {/* Picking 2 cantrips for the class */}
                    <h6>Choose 2 cantrips for your {character.class}</h6>
                    <div>
                        <label htmlFor="firstSelectedCantrip" className="font-semibold">Cantrip 1</label>
                        <select
                            name="firstSelectedCantrip"
                            id="firstSelectedCantrip"
                            onChange={handleCantripSelect}
                            value={character.firstSelectedCantrip}
                            className="bg-[#2a2b3c]"
                        >
                            {character.class && classCantrips[character.class].map(cantrip => (
                                cantrip !== character.secondSelectedCantrip ? (
                                    <option className="text-green-500" key={cantrip} value={cantrip}>{cantrip}</option>) : null))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="secondSelectedCantrip" className="font-semibold">Cantrip 2</label>
                        <select
                            name="secondSelectedCantrip"
                            id="secondSelectedCantrip"
                            onChange={handleCantripSelect}
                            value={character.secondSelectedCantrip}
                            className="bg-[#2a2b3c]"
                        >
                            {character.class && classCantrips[character.class].map(cantrip => (
                                cantrip !== character.firstSelectedCantrip ? (
                                    <option className="text-red-500" key={cantrip} value={cantrip}>{cantrip}</option>) : null))}
                        </select>
                    </div>
                </div>
            )
            }

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
