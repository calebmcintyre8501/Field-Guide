import type { Monster } from "./types";

export function filterMonstersByName(
  monsters: Monster[],
  searchTerm: string,
): Monster[] {
  const normalizedTerm = searchTerm.trim().toLowerCase();

  if (normalizedTerm === "") {
    return monsters;
  }

  return monsters.filter((monster) =>
    monster.name.toLowerCase().includes(normalizedTerm),
  );
}

export function filterMonstersByType(
  monsters: Monster[],
  selectedType: string,
): Monster[] {
  if (selectedType === "all") {
    return monsters;
  }

  return monsters.filter(
    (monster) => monster.type.toLowerCase() === selectedType.toLowerCase(),
  );
}

export function filterMonstersBySpecies(
  monsters: Monster[],
  selectedSpecies: string,
): Monster[] {
  if (selectedSpecies === "all") {
    return monsters;
  }

  return monsters.filter(
    (monster) =>
      monster.species.toLowerCase() === selectedSpecies.toLowerCase(),
  );
}

export function filterMonstersByWeakness(
  monsters: Monster[],
  selectedWeakness: string,
): Monster[] {
  if (selectedWeakness === "all") {
    return monsters;
  }

  return monsters.filter((monster) =>
    monster.weaknesses?.some(
      (weakness) =>
        weakness.element.toLowerCase() === selectedWeakness.toLowerCase(),
    ),
  );
}

export function sortMonsters(
  monsters: Monster[],
  sortOrder: string,
): Monster[] {
  const sortedMonsters = [...monsters];

  if (sortOrder === "za") {
    sortedMonsters.sort((a, b) => b.name.localeCompare(a.name));
    return sortedMonsters;
  }

  if (sortOrder === "mostWeaknesses") {
    sortedMonsters.sort(
      (a, b) => (b.weaknesses?.length ?? 0) - (a.weaknesses?.length ?? 0),
    );
    return sortedMonsters;
  }

  if (sortOrder === "fewestWeaknesses") {
    sortedMonsters.sort(
      (a, b) => (a.weaknesses?.length ?? 0) - (b.weaknesses?.length ?? 0),
    );
    return sortedMonsters;
  }

  sortedMonsters.sort((a, b) => a.name.localeCompare(b.name));
  return sortedMonsters;
}

export function getUniqueMonsterTypes(monsters: Monster[]): string[] {
  const types = monsters
    .map((monster) => monster.type)
    .filter((type): type is string => Boolean(type));

  return [...new Set(types)].sort((a, b) => a.localeCompare(b));
}

export function getUniqueSpecies(monsters: Monster[]): string[] {
  const species = monsters.map((monster) => monster.species);
  return [...new Set(species)].sort((a, b) => a.localeCompare(b));
}

export function getUniqueWeaknesses(monsters: Monster[]): string[] {
  const weaknesses = monsters.flatMap((monster) =>
    monster.weaknesses
      ? monster.weaknesses.map((weakness) => weakness.element)
      : [],
  );

  return [...new Set(weaknesses)].sort((a, b) => a.localeCompare(b));
}
export function filterMonstersByElement(
  monsters: Monster[],
  selectedElement: string,
): Monster[] {
  if (selectedElement === "all") {
    return monsters;
  }

  return monsters.filter((monster) =>
    monster.elements?.some(
      (element) => element.toLowerCase() === selectedElement.toLowerCase(),
    ),
  );
}

export function getUniqueElements(monsters: Monster[]): string[] {
  const elements = monsters.flatMap((monster) => monster.elements ?? []);
  return [...new Set(elements)].sort((a, b) => a.localeCompare(b));
}
