import { Pokemon } from '../types/pokemon';

export const GEN5_POKEMON: Pokemon[] = [
  // Starters and their evolutions
  {
    id: 495,
    name: "Snivy",
    type: "Grass",
    stats: { hp: 45, attack: 45, defense: 55 }
  },
  {
    id: 496,
    name: "Servine",
    type: "Grass",
    stats: { hp: 60, attack: 60, defense: 75 }
  },
  {
    id: 497,
    name: "Serperior",
    type: "Grass",
    stats: { hp: 75, attack: 75, defense: 95 }
  },
  {
    id: 498,
    name: "Tepig",
    type: "Fire",
    stats: { hp: 65, attack: 63, defense: 45 }
  },
  {
    id: 499,
    name: "Pignite",
    type: "Fire/Fighting",
    stats: { hp: 90, attack: 93, defense: 55 }
  },
  {
    id: 500,
    name: "Emboar",
    type: "Fire/Fighting",
    stats: { hp: 110, attack: 123, defense: 65 }
  },
  {
    id: 501,
    name: "Oshawott",
    type: "Water",
    stats: { hp: 55, attack: 55, defense: 45 }
  },
  {
    id: 502,
    name: "Dewott",
    type: "Water",
    stats: { hp: 75, attack: 75, defense: 60 }
  },
  {
    id: 503,
    name: "Samurott",
    type: "Water",
    stats: { hp: 95, attack: 100, defense: 85 }
  },

  // Early Route Pokemon
  {
    id: 504,
    name: "Patrat",
    type: "Normal",
    stats: { hp: 45, attack: 55, defense: 39 }
  },
  {
    id: 505,
    name: "Watchog",
    type: "Normal",
    stats: { hp: 60, attack: 85, defense: 69 }
  },
  {
    id: 506,
    name: "Lillipup",
    type: "Normal",
    stats: { hp: 45, attack: 60, defense: 45 }
  },
  {
    id: 507,
    name: "Herdier",
    type: "Normal",
    stats: { hp: 65, attack: 80, defense: 65 }
  },
  {
    id: 508,
    name: "Stoutland",
    type: "Normal",
    stats: { hp: 85, attack: 110, defense: 90 }
  },

  // Monkey trio
  {
    id: 511,
    name: "Pansage",
    type: "Grass",
    stats: { hp: 50, attack: 53, defense: 48 }
  },
  {
    id: 512,
    name: "Simisage",
    type: "Grass",
    stats: { hp: 75, attack: 98, defense: 63 }
  },
  {
    id: 513,
    name: "Pansear",
    type: "Fire",
    stats: { hp: 50, attack: 53, defense: 48 }
  },
  {
    id: 514,
    name: "Simisear",
    type: "Fire",
    stats: { hp: 75, attack: 98, defense: 63 }
  },
  {
    id: 515,
    name: "Panpour",
    type: "Water",
    stats: { hp: 50, attack: 53, defense: 48 }
  },
  {
    id: 516,
    name: "Simipour",
    type: "Water",
    stats: { hp: 75, attack: 98, defense: 63 }
  },

  // Strong Pokemon
  {
    id: 612,
    name: "Haxorus",
    type: "Dragon",
    stats: { hp: 76, attack: 147, defense: 90 }
  },
  {
    id: 635,
    name: "Hydreigon",
    type: "Dark/Dragon",
    stats: { hp: 92, attack: 105, defense: 90 }
  },
  {
    id: 637,
    name: "Volcarona",
    type: "Bug/Fire",
    stats: { hp: 85, attack: 60, defense: 65 }
  },

  // Legendary Pokemon
  {
    id: 643,
    name: "Reshiram",
    type: "Dragon/Fire",
    stats: { hp: 100, attack: 120, defense: 100 }
  },
  {
    id: 644,
    name: "Zekrom",
    type: "Dragon/Electric",
    stats: { hp: 100, attack: 150, defense: 120 }
  },
  {
    id: 645,
    name: "Landorus",
    type: "Ground/Flying",
    stats: { hp: 89, attack: 125, defense: 90 }
  },
  {
    id: 646,
    name: "Kyurem",
    type: "Dragon/Ice",
    stats: { hp: 125, attack: 130, defense: 90 }
  },
  {
    id: 649,
    name: "Genesect",
    type: "Bug/Steel",
    stats: { hp: 71, attack: 120, defense: 95 }
  },

  // Additional Strong Pokemon
  {
    id: 609,
    name: "Chandelure",
    type: "Ghost/Fire",
    stats: { hp: 60, attack: 55, defense: 90 }
  },
  {
    id: 625,
    name: "Bisharp",
    type: "Dark/Steel",
    stats: { hp: 65, attack: 125, defense: 100 }
  },
  {
    id: 628,
    name: "Braviary",
    type: "Normal/Flying",
    stats: { hp: 100, attack: 123, defense: 75 }
  },
  {
    id: 632,
    name: "Durant",
    type: "Bug/Steel",
    stats: { hp: 58, attack: 109, defense: 112 }
  },

  // Popular Choices
  {
    id: 571,
    name: "Zoroark",
    type: "Dark",
    stats: { hp: 60, attack: 105, defense: 60 }
  },
  {
    id: 576,
    name: "Gothitelle",
    type: "Psychic",
    stats: { hp: 70, attack: 55, defense: 95 }
  },
  {
    id: 584,
    name: "Vanilluxe",
    type: "Ice",
    stats: { hp: 71, attack: 95, defense: 85 }
  },
  {
    id: 589,
    name: "Escavalier",
    type: "Bug/Steel",
    stats: { hp: 70, attack: 135, defense: 105 }
  },
  {
    id: 591,
    name: "Amoonguss",
    type: "Grass/Poison",
    stats: { hp: 114, attack: 85, defense: 70 }
  },
  {
    id: 593,
    name: "Jellicent",
    type: "Water/Ghost",
    stats: { hp: 100, attack: 60, defense: 70 }
  },
  {
    id: 517,
    name: "Munna",
    type: "Psychic",
    stats: { hp: 76, attack: 25, defense: 45 }
  },
  {
    id: 518,
    name: "Musharna",
    type: "Psychic",
    stats: { hp: 116, attack: 55, defense: 85 }
  },
  {
    id: 519,
    name: "Pidove",
    type: "Normal/Flying",
    stats: { hp: 50, attack: 55, defense: 50 }
  },
  {
    id: 520,
    name: "Tranquill",
    type: "Normal/Flying",
    stats: { hp: 62, attack: 77, defense: 62 }
  },
  {
    id: 521,
    name: "Unfezant",
    type: "Normal/Flying",
    stats: { hp: 80, attack: 115, defense: 80 }
  },
  {
    id: 607,
    name: "Litwick",
    type: "Ghost/Fire",
    stats: { hp: 50, attack: 30, defense: 55 }
  },
  {
    id: 608,
    name: "Lampent",
    type: "Ghost/Fire",
    stats: { hp: 60, attack: 40, defense: 60 }
  },
  {
    id: 633,
    name: "Deino",
    type: "Dark/Dragon",
    stats: { hp: 52, attack: 65, defense: 50 }
  },
  {
    id: 634,
    name: "Zweilous",
    type: "Dark/Dragon",
    stats: { hp: 72, attack: 85, defense: 70 }
  },
  {
    id: 638,
    name: "Cobalion",
    type: "Steel/Fighting",
    stats: { hp: 91, attack: 90, defense: 129 }
  },
  {
    id: 639,
    name: "Terrakion",
    type: "Rock/Fighting",
    stats: { hp: 91, attack: 129, defense: 90 }
  },
  {
    id: 640,
    name: "Virizion",
    type: "Grass/Fighting",
    stats: { hp: 91, attack: 90, defense: 129 }
  },
  {
    id: 641,
    name: "Tornadus",
    type: "Flying",
    stats: { hp: 79, attack: 115, defense: 70 }
  },
  {
    id: 642,
    name: "Thundurus",
    type: "Electric/Flying",
    stats: { hp: 79, attack: 115, defense: 70 }
  }
]; 