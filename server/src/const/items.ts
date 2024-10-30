import { Item } from "../schema/character";

export const itemWoodenShield: Item = { name: "Wooden Shield", weight: 6, description: "shield adds +2 your you armor class", cost: "10gp", isActivatable: false, numberOfCharges: 0, armorBonus: 2 }
export const itemShield: Item = { name: "Shield", weight: 6, description: "shield adds +2 your you armor class", cost: "10gp", isActivatable: false, numberOfCharges: 0, armorBonus: 2 }
export const itemMace: Item = { name: "Mace", weight: 4, description: "1d6 + Str mod bludgeon", cost: "5gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "5ft" }
export const itemLongsword: Item = { name: "Longsword", weight: 4, description: "1d8 + Str mod slash", cost: "15gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "5ft" }
export const itemShortsword: Item = { name: "Shortsword", weight: 2, description: "1d6 + Str mod slash", cost: "10gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "5ft" }
export const itemHandaxe: Item = { name: "Handaxe", weight: 2, description: "1d6 + Str mod slash", cost: "5gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "5ft" }
export const itemJavelin: Item = { name: "Javelin", weight: 2, description: "1d6 + Str mod slash", cost: "0.5gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "30ft./120ft." }
export const itemGreatAxe: Item = { name: "Great Axe", weight: 7, description: "1d12 + Str mod slash dmg", cost: "30gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d12", range: "5ft" }
export const itemBattleaxe: Item = { name: "Battleaxe", weight: 6, description: "1d8 + Str mod slash", cost: "10gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "5ft" }
export const itemDagger: Item = { name: "Dagger", weight: 1, description: "1d4 + Str mod slash", cost: "2gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d4", range: "5ft" }
export const itemClub: Item = { name: "Club", weight: 2, description: "1d4 + Str mod bludgeon", cost: "0.1gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d4", range: "5ft" }
export const itemQuarterstaff: Item = { name: "Quarterstaff", weight: 4, description: "1d6 + Str mod bludgeon", cost: "0.2gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "5ft" }
export const itemLightCrossbow: Item = { name: "Light Crossbow", weight: 5, description: "1d8 + DEX mod ranged piercing", cost: "25gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "80ft./320ft." }
export const itemHeavyCrossbow: Item = { name: "Heavy Crossbow", weight: 5, description: "1d10 + DEX mod ranged pircing ", cost: "50gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d10", range: "100ft./400ft." }
export const itemHandCrossbow: Item = { name: "Hand Crossbow", weight: 5, description: "1d6 + DEX mod ranged piercing ", cost: "75gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "30ft./120ft." }
export const itemLongbow: Item = { name: "Longbow", weight: 2, description: "1d8 + DEX mod ranged", cost: "50gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d8", range: "150ft./600ft." }
export const itemShortbow: Item = { name: "Shortbow", weight: 2, description: "1d6 + DEX mod ranged", cost: "25gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6", range: "80ft./320ft." }
export const itemRapier: Item = { name: "Rapier", weight: 2, description: "1d8 + Str mod piercing", cost: "25gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d8" }
export const itemScimitar: Item = { name: "Scimitar", weight: 3, description: "1d6 + Str mod piercing", cost: "25gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d6" }
export const itemExplorerPack: Item = { name: "Explorer's Pack", weight: 45, description: "Contains a backpack , bedroll , mess kit , tinderbox , 10 rations , 10 torches , waterskin , 50 feet of hempen rope", cost: "10gp", isActivatable: false, numberOfCharges: 0 }
export const itemChainMail: Item = { name: "Chain Mail", weight: 55, description: "Armor Class 16", cost: "75gp", isActivatable: false, numberOfCharges: 0, armorClass: 16 }
export const itemPriestsPack: Item = { name: "Priest's Pack", weight: 24, description: " contains backpack, blanket ,10 candles ,tinderbox, alms box , 2 blocks of incense , censer , vestments , 2 days of rations , waterskin", cost: "19gp", isActivatable: false, numberOfCharges: 0 }
export const itemHolySymbol: Item = { name: "Holy Symbol", weight: 1, description: "a holy symbol", cost: "5gp", isActivatable: false, numberOfCharges: 0 }
export const itemLeatherArmor: Item = { name: "Leather Armor", weight: 10, description: "Armor Class 11", cost: "10gp", isActivatable: false, numberOfCharges: 0, armorClass: 11 }
export const itemDruidicFocus: Item = { name: "Druidic Focus", weight: 0, description: "A druid can use a Sprig of Mistletoe (or holly) as a spellcasting focus, as described in the Spellcasting section.", cost: "0", isActivatable: false, numberOfCharges: 0 }
export const itemDungeoneersPack: Item = { name: "Dungeoneer's Pack", weight: 55, description: "Contains a backpack , crowbar , hammer , 10 pitons , 10 rations , 10 torches , waterskin , 50 feet of hempen rope , tinderbox", cost: "12gp", isActivatable: false, numberOfCharges: 0 }
export const itemBurglarsPack: Item = { name: "Burglar's Pack", weight: 47.5, description: "Contains a backpack , bag of 1,000 ballbearings , 10 feet of sring , bell , 5 candles , crowbar , hammer , 10 pitons , hooded lantern , 2 flasks of oil , 5 rations ,tinderbox , waterskin , 50 feet of hempen rope", cost: "16gp", isActivatable: false, numberOfCharges: 0 }
export const itemThievesTools: Item = { name: "Thieves' Tools", weight: 1, description: "This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks.", cost: "25gp", isActivatable: false, numberOfCharges: 0 }
export const itemScaleMail: Item = { name: "Scale Mail", weight: 45, description: "Armor Class 14", cost: "50gp", isActivatable: false, numberOfCharges: 0, armorClass: 14 }
export const itemComponentPouch: Item = { name: "Component Pouch", weight: 2, description: "A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).", cost: "25gp", isActivatable: false, numberOfCharges: 0 }
export const itemScholarspack: Item = { name: "Scholar's Pack", weight: 22, description: "Contains a backpack , book of lore , bottle of ink , ink pen , 10 sheets of parchment , little bag of sand , small knife ", cost: "40gp", isActivatable: false, numberOfCharges: 0 }
export const itemSpellBook: Item = { name: "Spellbook", weight: 3, description: "Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.", cost: "50gp", isActivatable: false, numberOfCharges: 0 }
export const itemDart: Item = { name: "Darts", weight: 0.25, description: "1d4 + DEX mod piercing", cost: "0.05gp", isActivatable: false, numberOfCharges: 0, dmgDice: "1d4", range: "20/60" }
export const itemGreatsWord: Item = { name: "Greatsword", weight: 6, description: "2d6 + STR mod slashing dmg", cost: "50gp", isActivatable: false, numberOfCharges: 0, dmgDice: "2d6" }
export const itemDeplomatsPack: Item = { name: "Diplomat's Pack", weight: 39, description: "Contains a chest ,2 cases of maps and scrolls ,set of fine clothes ,bottle of ink ,ink pen ,lamp ,2 flasts of oil ,5 sheets of paper ,vial of perfume ,sealing wax ,soap", cost: "39gp", isActivatable: false, numberOfCharges: 0 }
export const itemLute: Item = { name: "Lute", weight: 2, description: "If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency.", cost: "35gp", isActivatable: false, numberOfCharges: 0, }
export const itemArcaneFocus: Item = { name: "Arcane Focus", weight: 0, description: "An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus.", cost: "", isActivatable: false, numberOfCharges: 0 }