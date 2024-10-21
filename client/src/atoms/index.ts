import { atom } from "jotai";
import { AttributeKey, Skill, SkillKey } from "../Interfaces/apiRespose";

export const nameAtom = atom<string>('');
export const classAtom = atom<string>('');
export const raceAtom = atom<string>('');
export const levelAtom = atom<number>(1);
export const backgroundAtom = atom<string>('');

// Appearance
export const appearanceAtom = atom({
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
});

// Core attributes
export const coreAttributesAtom = atom<Record<AttributeKey, number>>({
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
});

// Skills
export const skillsAtom = atom<Record<SkillKey, Skill>>({
    acrobatics: { modifier: "DEX", proficiency: false },
    animalHandling: { modifier: "WIS", proficiency: false },
    arcana: { modifier: "INT", proficiency: false },
    athletics: { modifier: "STR", proficiency: false },
    deception: { modifier: "CHA", proficiency: false },
    history: { modifier: "INT", proficiency: false },
    insight: { modifier: "WIS", proficiency: false },
    intimidation: { modifier: "CHA", proficiency: false },
    investigation: { modifier: "INT", proficiency: false },
    medicine: { modifier: "WIS", proficiency: false },
    nature: { modifier: "INT", proficiency: false },
    perception: { modifier: "WIS", proficiency: false },
    performance: { modifier: "CHA", proficiency: false },
    persuasion: { modifier: "CHA", proficiency: false },
    religion: { modifier: "INT", proficiency: false },
    sleightOfHand: { modifier: "DEX", proficiency: false },
    stealth: { modifier: "DEX", proficiency: false },
    survival: { modifier: "WIS", proficiency: false },
});

// Hit points
export const hitPointsAtom = atom({
    max: 10,
    current: 10,
    temp: 0,
});

// Other character details
export const alliesAtom = atom<string>('');
export const enemiesAtom = atom<string>('');
export const backstoryAtom = atom<string>('');
export const otherAtom = atom<string>('');
export const userIdAtom = atom<string | null>(null);
export const createdAtAtom = atom<string | null>(null);
export const updatedAtAtom = atom<string | null>(null);