export interface INewCharacterToSendToBackend {
    name: string;
    race: string;
    class: string;
    background: string;
    characteristics: string;
    personalityTraits: string;
    appearance: CharacterAppearance;
    organizations: string;
    allies: string;
    enemies: string;
    backstory: string;
    other: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export type Gender = "Male" | "Female" | "";
export type Alignment = "Lawful Good" | "Neutral Good" | "Chaotic Good" | "Lawful Neutral" | "True Neutral" | "Chaotic Neutral" | "Lawful Evil" | "Neutral Evil" | "Chaotic Evil" | "";
export type Size = "Small" | "Medium" | "Large" | "";
export type Faith = "Torm" | "Tyr" | "Lathander" | "Mystra" | "Selûne" | "Sune" | "Tempus" | "Kelemvor" | "Bane" | "Bhaal" | "Shar" | "Lolth" | "Pelor" | "Heironeous" | "Rao" | "St. Cuthbert" | "Nerull" | "Vecna" | "Erythnul" | "Iuz" | "Arawai" | "Balinor" | "Boldrei" | "The Devourer" | "The Mockery" | "Nature" | "Philosophies" | "";

export interface CharacterAppearance {
    alignment: Alignment;
    gender: Gender;
    eyes: string;
    size: Size;
    height: string;
    faith: Faith;
    hair: string;
    skin: string;
    age: string;
    weight: string;
}

// Create a type for the ability score keys
export type AbilityScore = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';