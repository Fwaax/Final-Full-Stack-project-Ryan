import { INewCharacterToSendToBackend } from "../Interfaces";

export default function CharacterCreationOthers(props: {
    character: INewCharacterToSendToBackend,
    setCharacter: React.Dispatch<React.SetStateAction<INewCharacterToSendToBackend>>
}) {
    const { character, setCharacter } = props;
    return (
        <>
            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="personality_traits" className='font-semibold'>Personality Traits</label>
                    <input className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold"
                        value={character.personalityTraits}
                        onChange={(e) => setCharacter({ ...character, personalityTraits: e.target.value })}
                        placeholder="Personality Traits" type="text" name='personality_traits' />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="characteristics" className='font-semibold'>Characteristics</label>
                    <input className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md font-semibold"
                        value={character.characteristics}
                        onChange={(e) => setCharacter({ ...character, characteristics: e.target.value })}
                        placeholder="Characteristics" type="text" name='characteristics' />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="backstory" className='font-semibold'>Backstory</label>
                    <textarea name="backstory" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                        value={character.backstory}
                        onChange={(e) => setCharacter({ ...character, backstory: e.target.value })}
                        placeholder="Backstory" />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="allies" className='font-semibold'>Allies</label>
                    <textarea name="allies" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                        value={character.allies}
                        onChange={(e) => setCharacter({ ...character, allies: e.target.value })}
                        placeholder="Allies" />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="enemies" className='font-semibold'>Enemies</label>
                    <textarea name="enemies" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                        value={character.enemies}
                        onChange={(e) => setCharacter({ ...character, enemies: e.target.value })}
                        placeholder="Enemies" />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="organizations" className='font-semibold'>Organizations</label>
                    <textarea name="organizations" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                        value={character.organizations}
                        onChange={(e) => setCharacter({ ...character, organizations: e.target.value })}
                        placeholder="Organizations" />
                </div>
            </div>

            <div className='w-full sm:w-3/5 mx-auto'>
                <div className='flex flex-col'>
                    <label htmlFor="other" className='font-semibold'>Other</label>
                    <textarea name="other" className="mt-1 w-full p-2 border border-[#bfbfba] bg-[#2a2b3c] rounded-md"
                        value={character.other}
                        onChange={(e) => setCharacter({ ...character, other: e.target.value })}
                        placeholder="Other" />
                </div>
            </div>
        </>
    );
}
