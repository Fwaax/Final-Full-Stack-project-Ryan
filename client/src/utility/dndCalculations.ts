// import { ICharacterApiResponse, Skill } from "../Interfaces/apiRespose"

// export const AttributeNameToModMap = {
//     "strength": "STR",
//     "dexterity": "DEX",
//     "constitution": "CON",
//     "intelligence": "INT",
//     "wisdom": "WIS",
//     "charisma": "CHA",
// }
// export function calculateSkillValues(char: ICharacterApiResponse, skillname: string) {
//     const foundSkill = char.skills.find(skill => skill.name === skillName)
//     if (!foundSkill) {
//         throw new Error(`Skill ${skillName} not found in character ${char._id}`)
//     }
//     const statBaseValue =0;
//     switch (foundSkill.mod) {
//         case "STR": return statBaseValue + char.strength
//         case "DEX": return statBaseValue + char.dexterity
//         case "CON": return statBaseValue + char.constitution
//         case "INT": return statBaseValue + char.intelligence
//         case "WIS": return statBaseValue + char.wisdom
//         case "CHA": return statBaseValue + char.charisma
//     }
//     switch (foundSkill.mod) {
//         case "STR": return char.strength
//         case "DEX": return char.dexterity
//         case "CON": return char.constitution
//         case "INT": return char.intelligence
//         case "WIS": return char.wisdom
//         case "CHA": return char.charisma
//     }
// }