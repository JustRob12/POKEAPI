export interface Pokemon {
  id: number;
  name: string;
  type: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
}

export const STARTERS: Pokemon[] = [
  {
    id: 650,
    name: 'Chespin',
    type: 'Grass',
    stats: {
      hp: 56,
      attack: 61,
      defense: 65,
    },
  },
  {
    id: 653,
    name: 'Fennekin',
    type: 'Fire',
    stats: {
      hp: 40,
      attack: 45,
      defense: 40,
    },
  },
  {
    id: 656,
    name: 'Froakie',
    type: 'Water',
    stats: {
      hp: 41,
      attack: 56,
      defense: 40,
    },
  },
]; 