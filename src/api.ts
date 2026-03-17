import type { Monster } from "./types";

const BASE_URL = "https://mhw-db.com/monsters";

export async function fetchMonsters(): Promise<Monster[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch monsters: ${response.status}`);
  }

  const data: Monster[] = await response.json();
  return data;
}
