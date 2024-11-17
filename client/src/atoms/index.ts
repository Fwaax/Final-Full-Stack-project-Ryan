import { atom } from "jotai";
import { AttributeKey, Skill, SkillKey } from "../Interfaces/apiRespose";

export const nameAtom = atom<string>('');
export const classAtom = atom<string>('');
export const raceAtom = atom<string>('');
export const levelAtom = atom<number>(1);
export const backgroundAtom = atom<string>('');

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

export const coreAttributesAtom = atom<Record<AttributeKey, number>>({
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
});

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
} as Record<SkillKey, Skill>);

export const hitPointsAtom = atom({
    max: 10,
    current: 10,
    temp: 0,
});

export type Item = { name: string, quantity: number, weight: number, description: string, cost: string, isActivatable: boolean, numberOfCharges: number, dmgDice?: string, armorClass?: number, attackBonus?: number, armorBonus?: number, range?: string };

export type Spells = { name: string, damageRoll?: string, damageType?: string, savingThrow?: string, hitRoll?: string, shape?: string, size?: string, damageInstances?: number, spellSlot?: number, discription: string, range?: string, duration?: string, effect?: string, action: string, classAvailability: string, school: string, castingTime?: string, concentration?: boolean, ritual?: boolean, verbalComponents?: boolean, somaticComponents?: boolean, materialComponents?: boolean, higherLevelScaling?: boolean };

export type Profs = { armor: string, weapons: string, tools: string, savingThrows: string };
export const alliesAtom = atom<string>('');
export const enemiesAtom = atom<string>('');
export const backstoryAtom = atom<string>('');
export const otherAtom = atom<string>('');
export const userIdAtom = atom<string | null>(null);
export const createdAtAtom = atom<string | null>(null);
export const updatedAtAtom = atom<string | null>(null);
export const inventoryAtom = atom<Item[]>([]);
export const goldAtom = atom<number>(0);
export const spellsAtom = atom<Spells[]>([]);
export const proficienciesAtom = atom<Profs[]>([]);