import "./style.css";
import { fetchMonsters } from "./api";
import type { Monster } from "./types";
import {
  renderMonsterList,
  renderMonsterDetails,
  renderTypeOptions,
  renderSpeciesOptions,
  renderElementOptions,
  renderWeaknessOptions,
  showStatus,
  clearStatus,
} from "./render";
import {
  filterMonstersByName,
  filterMonstersByType,
  filterMonstersBySpecies,
  filterMonstersByElement,
  filterMonstersByWeakness,
  sortMonsters,
  getUniqueMonsterTypes,
  getUniqueSpecies,
  getUniqueElements,
  getUniqueWeaknesses,
} from "./filters";

const searchInput = document.querySelector<HTMLInputElement>("#search");
const typeFilter = document.querySelector<HTMLSelectElement>("#typeFilter");
const speciesFilter =
  document.querySelector<HTMLSelectElement>("#speciesFilter");
const elementFilter =
  document.querySelector<HTMLSelectElement>("#elementFilter");
const weaknessFilter =
  document.querySelector<HTMLSelectElement>("#weaknessFilter");
const sortSelect = document.querySelector<HTMLSelectElement>("#sortSelect");
const clearFiltersBtn =
  document.querySelector<HTMLButtonElement>("#clearFilters");

const monsterList = document.querySelector<HTMLElement>("#monsterList");
const monsterDetails = document.querySelector<HTMLElement>("#monsterDetails");
const statusMessage = document.querySelector<HTMLElement>("#statusMessage");

if (
  !searchInput ||
  !typeFilter ||
  !speciesFilter ||
  !elementFilter ||
  !weaknessFilter ||
  !sortSelect ||
  !clearFiltersBtn ||
  !monsterList ||
  !monsterDetails ||
  !statusMessage
) {
  throw new Error("Required DOM elements are missing.");
}

let allMonsters: Monster[] = [];
let selectedMonsterId: number | null = null;

function formatMonsterNameForImage(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getMonsterImageUrl(name: string): string {
  return `/monsters/${formatMonsterNameForImage(name)}.png`;
}

function renderDefaultDetailsPanel(): void {
  monsterDetails.innerHTML = `
    <div class="empty-record">
      <div class="empty-record-icon">📖</div>
      <h2>Field Record</h2>
      <p>Select a creature to open its field record.</p>
    </div>
  `;
}

function updateDisplayedMonsters(): void {
  const searchTerm = searchInput.value;
  const selectedType = typeFilter.value;
  const selectedSpecies = speciesFilter.value;
  const selectedElement = elementFilter.value;
  const selectedWeakness = weaknessFilter.value;
  const sortOrder = sortSelect.value;

  let filtered = filterMonstersByName(allMonsters, searchTerm);
  filtered = filterMonstersByType(filtered, selectedType);
  filtered = filterMonstersBySpecies(filtered, selectedSpecies);
  filtered = filterMonstersByElement(filtered, selectedElement);
  filtered = filterMonstersByWeakness(filtered, selectedWeakness);
  filtered = sortMonsters(filtered, sortOrder);

  renderMonsterList(filtered, monsterList, selectedMonsterId ?? undefined);
}

async function initializeApp(): Promise<void> {
  try {
    showStatus("Loading monsters...", statusMessage);

    const data = await fetchMonsters();

    allMonsters = data.map((monster) => ({
      ...monster,
      image: getMonsterImageUrl(monster.name),
    }));

    renderTypeOptions(getUniqueMonsterTypes(allMonsters), typeFilter);
    renderSpeciesOptions(getUniqueSpecies(allMonsters), speciesFilter);
    renderElementOptions(getUniqueElements(allMonsters), elementFilter);
    renderWeaknessOptions(getUniqueWeaknesses(allMonsters), weaknessFilter);

    renderDefaultDetailsPanel();
    updateDisplayedMonsters();
    clearStatus(statusMessage);
  } catch (error) {
    showStatus("Failed to load monster data.", statusMessage);
    console.error(error);
  }
}

searchInput.addEventListener("input", updateDisplayedMonsters);
typeFilter.addEventListener("change", updateDisplayedMonsters);
speciesFilter.addEventListener("change", updateDisplayedMonsters);
elementFilter.addEventListener("change", updateDisplayedMonsters);
weaknessFilter.addEventListener("change", updateDisplayedMonsters);
sortSelect.addEventListener("change", updateDisplayedMonsters);

clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  typeFilter.value = "all";
  speciesFilter.value = "all";
  elementFilter.value = "all";
  weaknessFilter.value = "all";
  sortSelect.value = "az";
  selectedMonsterId = null;

  renderDefaultDetailsPanel();
  updateDisplayedMonsters();
});

monsterList.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const card = target.closest(".monster-card") as HTMLElement | null;
  if (!card) return;

  const id = Number(card.dataset.id);
  const monster = allMonsters.find((m) => m.id === id);
  if (!monster) return;

  selectedMonsterId = id;
  renderMonsterDetails(monster, monsterDetails);
  updateDisplayedMonsters();
});

initializeApp();
