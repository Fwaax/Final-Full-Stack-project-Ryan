import { Alignment, Faith, Gender, INewCharacterToSendToBackend, Size } from "../Interfaces"

export default function CharacterCreationTop(props: {
    character: INewCharacterToSendToBackend,
    setCharacter: React.Dispatch<React.SetStateAction<INewCharacterToSendToBackend>>
}) {
    const { character, setCharacter } = props
    return (
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
    )
}