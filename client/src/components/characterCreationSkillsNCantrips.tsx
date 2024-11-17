import { useEffect } from "react";
import { INewCharacterToSendToBackend } from "../Interfaces";
import { SkillKey } from "../Interfaces/apiRespose";

export default function CharacterCreationSkillsNCantrips(props: {
    character: INewCharacterToSendToBackend,
    setCharacter: React.Dispatch<React.SetStateAction<INewCharacterToSendToBackend>>
}) {
    const { character, setCharacter } = props

    const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCharacter(prev => ({
            ...prev,
            [name]: value
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
    const isHuman = character.race === 'Human';
    const classesWithCantrips = ["Cleric", "Druid", "Sorcerer", "Warlock", "Wizard", "Bard"];
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
        <>
            <div>
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
        </>
    );
}