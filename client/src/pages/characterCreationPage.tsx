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
import CharacterCreationOthers from '../components/characterCreationOthers';
import CharacterCreationSkillsNCantrips from '../components/characterCreationSkillsNCantrips';


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
        inventory: [],
        spells: [],
        firstSelectedCantrip: '',
        secondSelectedCantrip: '',
    });

    const { token } = useJwtToken();
    const navigate = useNavigate();

    async function sendToServerNewCharacter() {
        try {
            if (!token) {
                toast(`Please log in first`);
                return;
            }
            await axios.post('http://localhost:6969/char/new-character', character, { headers: { 'Authorization': token } });
            navigate("/character-selection", { state: { refetch: true } });
            toast(`Character created successfully`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast(`Failed to create character: ${error.response.data}`);
                console.error("Failed to create character:", error.response.data);
            } else {
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

    return (
        <div className="container mx-auto p-4 bg-[#1d1e2a]">
            <h1 className="text-3xl font-bold mb-4">Create Your D&D Character</h1>

            <CharacterCreationTop character={character} setCharacter={setCharacter} />

            <CharacterCreationApperance character={character} setCharacter={setCharacter} />

            <CharacterCreationOthers character={character} setCharacter={setCharacter} />

            <CharacterCreationSkillsNCantrips character={character} setCharacter={setCharacter} />


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
