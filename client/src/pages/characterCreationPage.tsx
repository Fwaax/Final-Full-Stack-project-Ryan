import React, { useEffect, useState } from 'react';
import { NumericInputWithNumberValue } from '../components/numberInput';
import axios from 'axios';
import { useJwtToken } from '../hooks/useJwtToken';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { toast } from 'react-toastify';
import { AbilityScore, Alignment, INewCharacterToSendToBackend, CharacterAppearance, Faith, Gender, Size } from '../Interfaces';


// Updating the currect state for the character to update on the webpage



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
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
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
            class: faker.helpers.arrayElement(['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Bard', 'Ranger']),
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
            strength: faker.number.int({ min: 1, max: 20 }),
            dexterity: faker.number.int({ min: 1, max: 20 }),
            constitution: faker.number.int({ min: 1, max: 20 }),
            intelligence: faker.number.int({ min: 1, max: 20 }),
            wisdom: faker.number.int({ min: 1, max: 20 }),
            charisma: faker.number.int({ min: 1, max: 20 }),
        });
    };



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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
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
            <div className=' w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="characteristics">Characteristics</label>
                    <input className="mt-1 flex p-2 border border-gray-900 bg-slate-600 rounded-md" value={character.characteristics}
                        onChange={(e) => setCharacter({ ...character, characteristics: e.target.value })} placeholder="Characteristics" type="text" name='characteristics' />
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
            <div><button className='bg-gray-800 p-4 rounded-lg shadow-lg' onClick={sendToServerNewCharacter}>Create Character</button></div>
            <div><button className='bg-gray-800 p-4 rounded-lg shadow-lg' onClick={randomizeCharacter}>Random Character</button></div>
        </div>
    );
};

export default CharacterCreationPage;
