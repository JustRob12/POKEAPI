import { Pokemon } from '../types/pokemon';

export const GEN4_POKEMON: Pokemon[] = [
  // Starter Pokemon and Evolutions
  {
    id: 387,
    name: "Turtwig",
    type: "Grass",
    stats: { hp: 55, attack: 68, defense: 64 }
  },
  {
    id: 388,
    name: "Grotle",
    type: "Grass",
    stats: { hp: 75, attack: 89, defense: 85 }
  },
  {
    id: 389,
    name: "Torterra",
    type: "Grass/Ground",
    stats: { hp: 95, attack: 109, defense: 105 }
  },
  {
    id: 390,
    name: "Chimchar",
    type: "Fire",
    stats: { hp: 44, attack: 58, defense: 44 }
  },
  {
    id: 391,
    name: "Monferno",
    type: "Fire/Fighting",
    stats: { hp: 64, attack: 78, defense: 52 }
  },
  {
    id: 392,
    name: "Infernape",
    type: "Fire/Fighting",
    stats: { hp: 76, attack: 104, defense: 71 }
  },
  {
    id: 393,
    name: "Piplup",
    type: "Water",
    stats: { hp: 53, attack: 51, defense: 53 }
  },
  {
    id: 394,
    name: "Prinplup",
    type: "Water",
    stats: { hp: 64, attack: 66, defense: 68 }
  },
  {
    id: 395,
    name: "Empoleon",
    type: "Water/Steel",
    stats: { hp: 84, attack: 86, defense: 88 }
  },

  // Early Route Pokemon
  {
    id: 396,
    name: "Starly",
    type: "Normal/Flying",
    stats: { hp: 40, attack: 55, defense: 30 }
  },
  {
    id: 397,
    name: "Staravia",
    type: "Normal/Flying",
    stats: { hp: 55, attack: 75, defense: 50 }
  },
  {
    id: 398,
    name: "Staraptor",
    type: "Normal/Flying",
    stats: { hp: 85, attack: 120, defense: 70 }
  },
  {
    id: 399,
    name: "Bidoof",
    type: "Normal",
    stats: { hp: 59, attack: 45, defense: 40 }
  },
  {
    id: 400,
    name: "Bibarel",
    type: "Normal/Water",
    stats: { hp: 79, attack: 85, defense: 60 }
  },
  {
    id: 403,
    name: "Shinx",
    type: "Electric",
    stats: { hp: 45, attack: 65, defense: 34 }
  },
  {
    id: 404,
    name: "Luxio",
    type: "Electric",
    stats: { hp: 60, attack: 85, defense: 49 }
  },
  {
    id: 405,
    name: "Luxray",
    type: "Electric",
    stats: { hp: 80, attack: 120, defense: 79 }
  },
  {
    id: 442,
    name: "Spiritomb",
    type: "Ghost/Dark",
    stats: { hp: 50, attack: 92, defense: 108 }
  },

  // Mid-Game Pokemon
  {
    id: 406,
    name: "Budew",
    type: "Grass/Poison",
    stats: { hp: 40, attack: 30, defense: 35 }
  },
  {
    id: 407,
    name: "Roserade",
    type: "Grass/Poison",
    stats: { hp: 60, attack: 125, defense: 65 }
  },
  {
    id: 408,
    name: "Cranidos",
    type: "Rock",
    stats: { hp: 67, attack: 125, defense: 40 }
  },
  {
    id: 409,
    name: "Rampardos",
    type: "Rock",
    stats: { hp: 97, attack: 165, defense: 60 }
  },
  {
    id: 410,
    name: "Shieldon",
    type: "Rock/Steel",
    stats: { hp: 30, attack: 42, defense: 118 }
  },
  {
    id: 411,
    name: "Bastiodon",
    type: "Rock/Steel",
    stats: { hp: 60, attack: 52, defense: 168 }
  },

  // Evolution of Previous Gen Pokemon
  {
    id: 463,
    name: "Lickilicky",
    type: "Normal",
    stats: { hp: 110, attack: 85, defense: 95 }
  },
  {
    id: 464,
    name: "Rhyperior",
    type: "Ground/Rock",
    stats: { hp: 115, attack: 140, defense: 130 }
  },
  {
    id: 465,
    name: "Tangrowth",
    type: "Grass",
    stats: { hp: 100, attack: 100, defense: 125 }
  },

  // Legendary Pokemon
  {
    id: 483,
    name: "Dialga",
    type: "Steel/Dragon",
    stats: {
      hp: 100,
      attack: 120,
      defense: 120
    }
  },
  {
    id: 484,
    name: "Palkia",
    type: "Water/Dragon",
    stats: {
      hp: 90,
      attack: 120,
      defense: 100
    }
  },
  {
    id: 487,
    name: "Giratina",
    type: "Ghost/Dragon",
    stats: {
      hp: 150,
      attack: 100,
      defense: 120
    }
  },
  {
    id: 488,
    name: "Cresselia",
    type: "Psychic",
    stats: { hp: 120, attack: 70, defense: 120 }
  },
  {
    id: 489,
    name: "Phione",
    type: "Water",
    stats: { hp: 80, attack: 80, defense: 80 }
  },
  {
    id: 490,
    name: "Manaphy",
    type: "Water",
    stats: { hp: 100, attack: 100, defense: 100 }
  },
  {
    id: 491,
    name: "Darkrai",
    type: "Dark",
    stats: { hp: 70, attack: 90, defense: 90 }
  },
  {
    id: 492,
    name: "Shaymin",
    type: "Grass",
    stats: { hp: 100, attack: 100, defense: 100 }
  },
  {
    id: 493,
    name: "Arceus",
    type: "Normal",
    stats: { hp: 120, attack: 120, defense: 120 }
  },

  // Additional Strong Pokemon
  {
    id: 443,
    name: "Gible",
    type: "Dragon/Ground",
    stats: { hp: 58, attack: 70, defense: 45 }
  },
  {
    id: 444,
    name: "Gabite",
    type: "Dragon/Ground",
    stats: { hp: 68, attack: 90, defense: 65 }
  },
  {
    id: 445,
    name: "Garchomp",
    type: "Dragon/Ground",
    stats: { hp: 108, attack: 130, defense: 95 }
  },
  {
    id: 447,
    name: "Riolu",
    type: "Fighting",
    stats: { hp: 40, attack: 70, defense: 40 }
  },
  {
    id: 448,
    name: "Lucario",
    type: "Fighting/Steel",
    stats: { hp: 70, attack: 110, defense: 70 }
  },
  {
    id: 452,
    name: "Drapion",
    type: "Poison/Dark",
    stats: { hp: 70, attack: 90, defense: 110 }
  },
  {
    id: 462,
    name: "Magnezone",
    type: "Electric/Steel",
    stats: { hp: 70, attack: 70, defense: 115 }
  },
  {
    id: 466,
    name: "Electivire",
    type: "Electric",
    stats: { hp: 75, attack: 123, defense: 67 }
  },
  {
    id: 467,
    name: "Magmortar",
    type: "Fire",
    stats: { hp: 75, attack: 95, defense: 67 }
  },
  {
    id: 468,
    name: "Togekiss",
    type: "Fairy/Flying",
    stats: { hp: 85, attack: 50, defense: 95 }
  },
  {
    id: 471,
    name: "Glaceon",
    type: "Ice",
    stats: { hp: 65, attack: 60, defense: 110 }
  },
  {
    id: 472,
    name: "Gliscor",
    type: "Ground/Flying",
    stats: { hp: 75, attack: 95, defense: 125 }
  },
  {
    id: 480,
    name: "Uxie",
    type: "Psychic",
    stats: { hp: 75, attack: 75, defense: 130 }
  },
  {
    id: 481,
    name: "Mesprit",
    type: "Psychic",
    stats: { hp: 80, attack: 105, defense: 105 }
  },
  {
    id: 482,
    name: "Azelf",
    type: "Psychic",
    stats: { hp: 75, attack: 125, defense: 70 }
  },
  {
    id: 485,
    name: "Heatran",
    type: "Fire/Steel",
    stats: { hp: 91, attack: 90, defense: 106 }
  },
  {
    id: 486,
    name: "Regigigas",
    type: "Normal",
    stats: { hp: 110, attack: 160, defense: 110 }
  },

  // Add these Pokemon to the existing array
  {
    id: 412,
    name: "Burmy",
    type: "Bug",
    stats: { hp: 40, attack: 29, defense: 45 }
  },
  {
    id: 413,
    name: "Wormadam",
    type: "Bug/Grass",
    stats: { hp: 60, attack: 59, defense: 85 }
  },
  {
    id: 414,
    name: "Mothim",
    type: "Bug/Flying",
    stats: { hp: 70, attack: 94, defense: 50 }
  },
  {
    id: 415,
    name: "Combee",
    type: "Bug/Flying",
    stats: { hp: 30, attack: 30, defense: 42 }
  },
  {
    id: 416,
    name: "Vespiquen",
    type: "Bug/Flying",
    stats: { hp: 70, attack: 80, defense: 102 }
  },
  {
    id: 417,
    name: "Pachirisu",
    type: "Electric",
    stats: { hp: 60, attack: 45, defense: 70 }
  },
  {
    id: 418,
    name: "Buizel",
    type: "Water",
    stats: { hp: 55, attack: 65, defense: 35 }
  },
  {
    id: 419,
    name: "Floatzel",
    type: "Water",
    stats: { hp: 85, attack: 105, defense: 55 }
  },
  {
    id: 420,
    name: "Cherubi",
    type: "Grass",
    stats: { hp: 45, attack: 35, defense: 45 }
  },
  {
    id: 421,
    name: "Cherrim",
    type: "Grass",
    stats: { hp: 70, attack: 60, defense: 70 }
  },
  {
    id: 422,
    name: "Shellos",
    type: "Water",
    stats: { hp: 76, attack: 48, defense: 48 }
  },
  {
    id: 423,
    name: "Gastrodon",
    type: "Water/Ground",
    stats: { hp: 111, attack: 83, defense: 68 }
  },
  {
    id: 424,
    name: "Ambipom",
    type: "Normal",
    stats: { hp: 75, attack: 100, defense: 66 }
  },
  {
    id: 429,
    name: "Mismagius",
    type: "Ghost",
    stats: { hp: 60, attack: 60, defense: 60 }
  },
  {
    id: 430,
    name: "Honchkrow",
    type: "Dark/Flying",
    stats: { hp: 100, attack: 125, defense: 52 }
  },
  {
    id: 461,
    name: "Weavile",
    type: "Dark/Ice",
    stats: { hp: 70, attack: 120, defense: 65 }
  },
  {
    id: 473,
    name: "Mamoswine",
    type: "Ice/Ground",
    stats: { hp: 110, attack: 130, defense: 80 }
  },
  {
    id: 474,
    name: "Porygon-Z",
    type: "Normal",
    stats: { hp: 85, attack: 80, defense: 70 }
  },
  {
    id: 475,
    name: "Gallade",
    type: "Psychic/Fighting",
    stats: { hp: 68, attack: 125, defense: 65 }
  },
  {
    id: 476,
    name: "Probopass",
    type: "Rock/Steel",
    stats: { hp: 60, attack: 55, defense: 145 }
  },
  {
    id: 477,
    name: "Dusknoir",
    type: "Ghost",
    stats: { hp: 45, attack: 100, defense: 135 }
  },
  {
    id: 478,
    name: "Froslass",
    type: "Ice/Ghost",
    stats: { hp: 70, attack: 80, defense: 70 }
  },
  {
    id: 479,
    name: "Rotom",
    type: "Electric/Ghost",
    stats: { hp: 50, attack: 50, defense: 77 }
  }
]; 