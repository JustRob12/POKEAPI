import { Pokemon } from '../types/pokemon';

export const GEN3_POKEMON: Pokemon[] = [
  // Starter Pokemon and Evolutions
  {
    id: 252,
    name: "Treecko",
    type: "Grass",
    stats: { hp: 40, attack: 45, defense: 35 }
  },
  {
    id: 253,
    name: "Grovyle",
    type: "Grass",
    stats: { hp: 50, attack: 65, defense: 45 }
  },
  {
    id: 254,
    name: "Sceptile",
    type: "Grass",
    stats: { hp: 70, attack: 85, defense: 65 }
  },
  {
    id: 255,
    name: "Torchic",
    type: "Fire",
    stats: { hp: 45, attack: 60, defense: 40 }
  },
  {
    id: 256,
    name: "Combusken",
    type: "Fire/Fighting",
    stats: { hp: 60, attack: 85, defense: 60 }
  },
  {
    id: 257,
    name: "Blaziken",
    type: "Fire/Fighting",
    stats: { hp: 80, attack: 120, defense: 70 }
  },
  {
    id: 258,
    name: "Mudkip",
    type: "Water",
    stats: { hp: 50, attack: 70, defense: 50 }
  },
  {
    id: 259,
    name: "Marshtomp",
    type: "Water/Ground",
    stats: { hp: 70, attack: 85, defense: 70 }
  },
  {
    id: 260,
    name: "Swampert",
    type: "Water/Ground",
    stats: { hp: 100, attack: 110, defense: 90 }
  },

  // Early Route Pokemon
  {
    id: 261,
    name: "Poochyena",
    type: "Dark",
    stats: { hp: 35, attack: 55, defense: 35 }
  },
  {
    id: 262,
    name: "Mightyena",
    type: "Dark",
    stats: { hp: 70, attack: 90, defense: 70 }
  },
  {
    id: 263,
    name: "Zigzagoon",
    type: "Normal",
    stats: { hp: 38, attack: 30, defense: 41 }
  },
  {
    id: 264,
    name: "Linoone",
    type: "Normal",
    stats: { hp: 78, attack: 70, defense: 61 }
  },

  // Bug Pokemon
  {
    id: 265,
    name: "Wurmple",
    type: "Bug",
    stats: { hp: 45, attack: 45, defense: 35 }
  },
  {
    id: 266,
    name: "Silcoon",
    type: "Bug",
    stats: { hp: 50, attack: 35, defense: 55 }
  },
  {
    id: 267,
    name: "Beautifly",
    type: "Bug/Flying",
    stats: { hp: 60, attack: 70, defense: 50 }
  },
  {
    id: 268,
    name: "Cascoon",
    type: "Bug",
    stats: { hp: 50, attack: 35, defense: 55 }
  },
  {
    id: 269,
    name: "Dustox",
    type: "Bug/Poison",
    stats: { hp: 60, attack: 50, defense: 70 }
  },

  // Forest Pokemon
  {
    id: 270,
    name: "Lotad",
    type: "Water/Grass",
    stats: { hp: 40, attack: 30, defense: 30 }
  },
  {
    id: 271,
    name: "Lombre",
    type: "Water/Grass",
    stats: { hp: 60, attack: 50, defense: 50 }
  },
  {
    id: 272,
    name: "Ludicolo",
    type: "Water/Grass",
    stats: { hp: 80, attack: 70, defense: 70 }
  },
  {
    id: 273,
    name: "Seedot",
    type: "Grass",
    stats: { hp: 40, attack: 40, defense: 50 }
  },
  {
    id: 274,
    name: "Nuzleaf",
    type: "Grass/Dark",
    stats: { hp: 70, attack: 70, defense: 40 }
  },
  {
    id: 275,
    name: "Shiftry",
    type: "Grass/Dark",
    stats: { hp: 90, attack: 100, defense: 60 }
  },

  // Strong Pokemon
  {
    id: 334,
    name: "Altaria",
    type: "Dragon/Flying",
    stats: { hp: 75, attack: 70, defense: 90 }
  },
  {
    id: 346,
    name: "Cradily",
    type: "Rock/Grass",
    stats: { hp: 86, attack: 81, defense: 97 }
  },
  {
    id: 359,
    name: "Absol",
    type: "Dark",
    stats: { hp: 65, attack: 130, defense: 60 }
  },
  {
    id: 373,
    name: "Salamence",
    type: "Dragon/Flying",
    stats: { hp: 95, attack: 135, defense: 80 }
  },
  {
    id: 376,
    name: "Metagross",
    type: "Steel/Psychic",
    stats: { hp: 80, attack: 135, defense: 130 }
  },

  // Legendary Pokemon
  {
    id: 377,
    name: "Regirock",
    type: "Rock",
    stats: { hp: 80, attack: 100, defense: 200 }
  },
  {
    id: 378,
    name: "Regice",
    type: "Ice",
    stats: { hp: 80, attack: 50, defense: 100 }
  },
  {
    id: 379,
    name: "Registeel",
    type: "Steel",
    stats: { hp: 80, attack: 75, defense: 150 }
  },
  {
    id: 380,
    name: "Latias",
    type: "Dragon/Psychic",
    stats: { hp: 80, attack: 80, defense: 90 }
  },
  {
    id: 381,
    name: "Latios",
    type: "Dragon/Psychic",
    stats: { hp: 80, attack: 90, defense: 80 }
  },
  {
    id: 382,
    name: "Kyogre",
    type: "Water",
    stats: { hp: 100, attack: 100, defense: 90 }
  },
  {
    id: 383,
    name: "Groudon",
    type: "Ground",
    stats: { hp: 100, attack: 150, defense: 140 }
  },
  {
    id: 384,
    name: "Rayquaza",
    type: "Dragon/Flying",
    stats: { hp: 105, attack: 150, defense: 90 }
  },
  {
    id: 385,
    name: "Jirachi",
    type: "Steel/Psychic",
    stats: { hp: 100, attack: 100, defense: 100 }
  },
  {
    id: 386,
    name: "Deoxys",
    type: "Psychic",
    stats: { hp: 50, attack: 150, defense: 50 }
  },

  // Bird Pokemon
  {
    id: 276,
    name: "Taillow",
    type: "Normal/Flying",
    stats: { hp: 40, attack: 55, defense: 30 }
  },
  {
    id: 277,
    name: "Swellow",
    type: "Normal/Flying",
    stats: { hp: 60, attack: 85, defense: 60 }
  },

  // Psychic Pokemon
  {
    id: 280,
    name: "Ralts",
    type: "Psychic/Fairy",
    stats: { hp: 28, attack: 25, defense: 25 }
  },
  {
    id: 281,
    name: "Kirlia",
    type: "Psychic/Fairy",
    stats: { hp: 38, attack: 35, defense: 35 }
  },
  {
    id: 282,
    name: "Gardevoir",
    type: "Psychic/Fairy",
    stats: { hp: 68, attack: 65, defense: 65 }
  },

  // Beach Pokemon
  {
    id: 278,
    name: "Wingull",
    type: "Water/Flying",
    stats: { hp: 40, attack: 30, defense: 30 }
  },
  {
    id: 279,
    name: "Pelipper",
    type: "Water/Flying",
    stats: { hp: 60, attack: 50, defense: 100 }
  },

  // Desert Pokemon
  {
    id: 322,
    name: "Numel",
    type: "Fire/Ground",
    stats: { hp: 60, attack: 60, defense: 40 }
  },
  {
    id: 323,
    name: "Camerupt",
    type: "Fire/Ground",
    stats: { hp: 70, attack: 100, defense: 70 }
  },
  {
    id: 324,
    name: "Torkoal",
    type: "Fire",
    stats: { hp: 70, attack: 85, defense: 140 }
  },

  // Fossil Pokemon
  {
    id: 347,
    name: "Anorith",
    type: "Rock/Bug",
    stats: { hp: 45, attack: 95, defense: 50 }
  },
  {
    id: 348,
    name: "Armaldo",
    type: "Rock/Bug",
    stats: { hp: 75, attack: 125, defense: 100 }
  },
  {
    id: 349,
    name: "Feebas",
    type: "Water",
    stats: { hp: 20, attack: 15, defense: 20 }
  },
  {
    id: 350,
    name: "Milotic",
    type: "Water",
    stats: { hp: 95, attack: 60, defense: 79 }
  },

  // Cave Pokemon
  {
    id: 353,
    name: "Shuppet",
    type: "Ghost",
    stats: { hp: 44, attack: 75, defense: 35 }
  },
  {
    id: 354,
    name: "Banette",
    type: "Ghost",
    stats: { hp: 64, attack: 115, defense: 65 }
  },
  {
    id: 355,
    name: "Duskull",
    type: "Ghost",
    stats: { hp: 20, attack: 40, defense: 90 }
  },
  {
    id: 356,
    name: "Dusclops",
    type: "Ghost",
    stats: { hp: 40, attack: 70, defense: 130 }
  },

  // Weather Trio Support
  {
    id: 370,
    name: "Luvdisc",
    type: "Water",
    stats: { hp: 43, attack: 30, defense: 55 }
  },
  {
    id: 371,
    name: "Bagon",
    type: "Dragon",
    stats: { hp: 45, attack: 75, defense: 60 }
  },
  {
    id: 372,
    name: "Shelgon",
    type: "Dragon",
    stats: { hp: 65, attack: 95, defense: 100 }
  },
  {
    id: 374,
    name: "Beldum",
    type: "Steel/Psychic",
    stats: { hp: 40, attack: 55, defense: 80 }
  },
  {
    id: 375,
    name: "Metang",
    type: "Steel/Psychic",
    stats: { hp: 60, attack: 75, defense: 100 }
  },

  // Mid-Game Pokemon
  {
    id: 283,
    name: "Surskit",
    type: "Bug/Water",
    stats: { hp: 40, attack: 30, defense: 32 }
  },
  {
    id: 284,
    name: "Masquerain",
    type: "Bug/Flying",
    stats: { hp: 70, attack: 60, defense: 62 }
  },
  {
    id: 285,
    name: "Shroomish",
    type: "Grass",
    stats: { hp: 60, attack: 40, defense: 60 }
  },
  {
    id: 286,
    name: "Breloom",
    type: "Grass/Fighting",
    stats: { hp: 60, attack: 130, defense: 80 }
  },
  {
    id: 287,
    name: "Slakoth",
    type: "Normal",
    stats: { hp: 60, attack: 60, defense: 60 }
  },
  {
    id: 288,
    name: "Vigoroth",
    type: "Normal",
    stats: { hp: 80, attack: 80, defense: 80 }
  },
  {
    id: 289,
    name: "Slaking",
    type: "Normal",
    stats: { hp: 150, attack: 160, defense: 100 }
  },

  // Cave and Mountain Pokemon
  {
    id: 290,
    name: "Nincada",
    type: "Bug/Ground",
    stats: { hp: 31, attack: 45, defense: 90 }
  },
  {
    id: 291,
    name: "Ninjask",
    type: "Bug/Flying",
    stats: { hp: 61, attack: 90, defense: 45 }
  },
  {
    id: 292,
    name: "Shedinja",
    type: "Bug/Ghost",
    stats: { hp: 1, attack: 90, defense: 45 }
  },
  {
    id: 293,
    name: "Whismur",
    type: "Normal",
    stats: { hp: 64, attack: 51, defense: 23 }
  },
  {
    id: 294,
    name: "Loudred",
    type: "Normal",
    stats: { hp: 84, attack: 71, defense: 43 }
  },
  {
    id: 295,
    name: "Exploud",
    type: "Normal",
    stats: { hp: 104, attack: 91, defense: 63 }
  },

  // More Desert Pokemon
  {
    id: 320,
    name: "Wailmer",
    type: "Water",
    stats: { hp: 130, attack: 70, defense: 35 }
  },
  {
    id: 321,
    name: "Wailord",
    type: "Water",
    stats: { hp: 170, attack: 90, defense: 45 }
  },
  {
    id: 325,
    name: "Spoink",
    type: "Psychic",
    stats: { hp: 60, attack: 25, defense: 35 }
  },
  {
    id: 326,
    name: "Grumpig",
    type: "Psychic",
    stats: { hp: 80, attack: 45, defense: 65 }
  },

  // More Cave Pokemon
  {
    id: 327,
    name: "Spinda",
    type: "Normal",
    stats: { hp: 60, attack: 60, defense: 60 }
  },
  {
    id: 328,
    name: "Trapinch",
    type: "Ground",
    stats: { hp: 45, attack: 100, defense: 45 }
  },
  {
    id: 329,
    name: "Vibrava",
    type: "Ground/Dragon",
    stats: { hp: 50, attack: 70, defense: 50 }
  },
  {
    id: 330,
    name: "Flygon",
    type: "Ground/Dragon",
    stats: { hp: 80, attack: 100, defense: 80 }
  },
  {
    id: 331,
    name: "Cacnea",
    type: "Grass",
    stats: { hp: 50, attack: 85, defense: 40 }
  },
  {
    id: 332,
    name: "Cacturne",
    type: "Grass/Dark",
    stats: { hp: 70, attack: 115, defense: 60 }
  },
  {
    id: 333,
    name: "Swablu",
    type: "Normal/Flying",
    stats: { hp: 45, attack: 40, defense: 60 }
  },

  // More Strong Pokemon
  {
    id: 357,
    name: "Tropius",
    type: "Grass/Flying",
    stats: { hp: 99, attack: 68, defense: 83 }
  },
  {
    id: 358,
    name: "Chimecho",
    type: "Psychic",
    stats: { hp: 75, attack: 50, defense: 80 }
  },
  {
    id: 360,
    name: "Wynaut",
    type: "Psychic",
    stats: { hp: 95, attack: 23, defense: 48 }
  },
  {
    id: 361,
    name: "Snorunt",
    type: "Ice",
    stats: { hp: 50, attack: 50, defense: 50 }
  },
  {
    id: 362,
    name: "Glalie",
    type: "Ice",
    stats: { hp: 80, attack: 80, defense: 80 }
  },
  {
    id: 363,
    name: "Spheal",
    type: "Ice/Water",
    stats: { hp: 70, attack: 40, defense: 50 }
  },
  {
    id: 364,
    name: "Sealeo",
    type: "Ice/Water",
    stats: { hp: 90, attack: 60, defense: 70 }
  },
  {
    id: 365,
    name: "Walrein",
    type: "Ice/Water",
    stats: { hp: 110, attack: 80, defense: 90 }
  },
  {
    id: 366,
    name: "Clamperl",
    type: "Water",
    stats: { hp: 35, attack: 64, defense: 85 }
  },
  {
    id: 367,
    name: "Huntail",
    type: "Water",
    stats: { hp: 55, attack: 104, defense: 105 }
  },
  {
    id: 368,
    name: "Gorebyss",
    type: "Water",
    stats: { hp: 55, attack: 84, defense: 105 }
  },
  {
    id: 369,
    name: "Relicanth",
    type: "Water/Rock",
    stats: { hp: 100, attack: 90, defense: 130 }
  }
]; 