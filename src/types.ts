export type MonsterAilment = {
  name: string;
  description?: string;
};

export type MonsterWeakness = {
  element: string;
  stars: number;
  condition: string | null;
};

export type MonsterLocation = {
  id: number;
  zoneCount: number;
  name: string;
};

export type Monster = {
  id: number;
  name: string;
  type: string;
  species: string;
  description?: string;
  elements: string[];
  ailments?: MonsterAilment[];
  weaknesses?: MonsterWeakness[];
  locations?: MonsterLocation[];
};
