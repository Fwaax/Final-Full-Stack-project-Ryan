import { INewCharacterToSendToBackend } from "../Interfaces";

export default function CharacterCreationApperance(props: {
    character: INewCharacterToSendToBackend,
    setCharacter: React.Dispatch<React.SetStateAction<INewCharacterToSendToBackend>>
}) {
    const { character, setCharacter } = props;
    return (
        <div className="flex flex-row flex-wrap justify-between gap-4">
            <div className="w-full sm:w-[48%]">
                <label htmlFor="hair" className='font-semibold'>Hair</label>
                <input type="text" name="hair" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.hair}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, hair: e.target.value } })}
                    placeholder="Hair" />
            </div>

            <div className="w-full sm:w-[48%]">
                <label htmlFor="skin" className='font-semibold'>Skin</label>
                <input type="text" name="skin" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.skin}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, skin: e.target.value } })}
                    placeholder="Skin" />
            </div>

            <div className="w-full sm:w-[48%]">
                <label htmlFor="eyes" className='font-semibold'>Eyes</label>
                <input type="text" name="eyes" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.eyes}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, eyes: e.target.value } })}
                    placeholder="Eyes" />
            </div>

            <div className="w-full sm:w-[48%]">
                <label htmlFor="age" className='font-semibold'>Age</label>
                <input type="text" name="age" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.age}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, age: e.target.value } })}
                    placeholder="Age" />
            </div>

            <div className="w-full sm:w-[48%]">
                <label htmlFor="weight" className='font-semibold'>Weight</label>
                <input type="text" name="weight" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.weight}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, weight: e.target.value } })}
                    placeholder="Weight" />
            </div>

            <div className="w-full sm:w-[48%]">
                <label htmlFor="height" className='font-semibold'>Height</label>
                <input type="text" name="height" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                    value={character.appearance.height}
                    onChange={(e) => setCharacter({ ...character, appearance: { ...character.appearance, height: e.target.value } })}
                    placeholder="Height" />
            </div>
        </div>
    );
}
