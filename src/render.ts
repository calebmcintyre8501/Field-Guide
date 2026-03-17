import type { Monster } from "./types";

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getElementIcon(element: string): string {
  const e = element.toLowerCase();

  if (e === "fire") return "🔥";
  if (e === "water") return "💧";
  if (e === "thunder") return "⚡";
  if (e === "ice") return "❄️";
  if (e === "dragon") return "🐉";

  return "✧";
}

function getWeaknessIcon(value: string): string {
  const w = value.toLowerCase();

  if (w === "fire") return "🔥";
  if (w === "water") return "💧";
  if (w === "thunder") return "⚡";
  if (w === "ice") return "❄️";
  if (w === "dragon") return "🐉";

  if (w === "fireblight") return "🔥💀";
  if (w === "waterblight") return "💧💀";
  if (w === "thunderblight") return "⚡💀";
  if (w === "iceblight") return "❄️💀";
  if (w === "dragonblight") return "🐉💀";

  if (w === "poison") return "☠️";
  if (w === "sleep") return "😴";
  if (w === "paralysis") return "⚡💫";
  if (w === "blast") return "💥";
  if (w === "stun") return "💫";
  if (w === "bleed") return "🩸";

  return "❔";
}

function getElementClass(value: string): string {
  const normalized = value.toLowerCase();

  if (normalized === "fire" || normalized === "fireblight")
    return "element-fire";
  if (normalized === "water" || normalized === "waterblight")
    return "element-water";
  if (
    normalized === "thunder" ||
    normalized === "thunderblight" ||
    normalized === "paralysis"
  ) {
    return "element-thunder";
  }
  if (normalized === "ice" || normalized === "iceblight") return "element-ice";
  if (normalized === "dragon" || normalized === "dragonblight")
    return "element-dragon";

  return "element-default";
}

function getHabitatIcon(locationName: string): string {
  const name = locationName.toLowerCase();

  if (name.includes("ancient forest")) return "🌲";
  if (name.includes("wildspire waste")) return "🏜️";
  if (name.includes("coral highlands")) return "⛰️";
  if (name.includes("rotten vale")) return "☠️";
  if (name.includes("elder's recess")) return "🌋";
  if (name.includes("hoarfrost reach")) return "❄️";
  if (name.includes("guiding lands")) return "🧭";
  if (name.includes("great ravine")) return "🌉";
  if (name.includes("everstream")) return "🌌";
  if (name.includes("confluence of fates")) return "✨";
  if (name.includes("caverns of el dorado")) return "💰";
  if (name.includes("arena")) return "🏟️";

  return "📍";
}

function getAilmentIcon(ailment: string): string {
  const a = ailment.toLowerCase();

  if (a === "poison") return "☠️";
  if (a === "sleep") return "😴";
  if (a === "paralysis") return "⚡";
  if (a === "blast") return "💥";
  if (a === "stun") return "💫";
  if (a === "bleed") return "🩸";
  if (a === "fireblight") return "🔥";
  if (a === "waterblight") return "💧";
  if (a === "thunderblight") return "⚡";
  if (a === "iceblight") return "❄️";
  if (a === "dragonblight") return "🐉";

  return "✦";
}

function getElementColor(element: string): string {
  const e = element.toLowerCase();

  if (e === "fire") return "rgba(200, 75, 49, 0.35)";
  if (e === "water") return "rgba(47, 111, 180, 0.35)";
  if (e === "thunder") return "rgba(184, 138, 0, 0.35)";
  if (e === "ice") return "rgba(95, 168, 211, 0.35)";
  if (e === "dragon") return "rgba(122, 78, 163, 0.4)";

  return "transparent";
}

function getMonsterBackground(elements: string[]): string {
  if (elements.length === 1) {
    const color = getElementColor(elements[0]);

    return `
      linear-gradient(
        to bottom,
        #f1e2be,
        #f1e2be 70%,
        ${color}
      )
    `;
  }

  if (elements.length >= 2) {
    const color1 = getElementColor(elements[0]);
    const color2 = getElementColor(elements[1]);

    return `
      linear-gradient(
        135deg,
        #f1e2be,
        #f1e2be 55%,
        ${color1},
        ${color2}
      )
    `;
  }

  return "#f1e2be";
}

function getMonsterHoverBackground(elements: string[]): string {
  if (elements.length === 1) {
    const color = getElementColor(elements[0]);

    return `
      linear-gradient(
        to bottom,
        #f1e2be,
        ${color}
      )
    `;
  }

  if (elements.length >= 2) {
    const color1 = getElementColor(elements[0]);
    const color2 = getElementColor(elements[1]);

    return `
      linear-gradient(
        135deg,
        ${color1},
        ${color2}
      )
    `;
  }

  return "#f1e2be";
}

function getElementIcons(monster: Monster): string {
  if (!monster.elements || monster.elements.length === 0) {
    return `<span class="element-none">✧</span>`;
  }

  return monster.elements
    .map(
      (element) =>
        `<span class="${getElementClass(element)}" title="${capitalize(element)}">${getElementIcon(element)}</span>`,
    )
    .join(" ");
}

function getWeaknessIcons(monster: Monster): string {
  if (!monster.weaknesses || monster.weaknesses.length === 0) {
    return `<span class="element-default">—</span>`;
  }

  return monster.weaknesses
    .map(
      (weakness) =>
        `<span class="${getElementClass(weakness.element)}" title="${capitalize(weakness.element)}">${getWeaknessIcon(weakness.element)}</span>`,
    )
    .join(" ");
}

function getAllHabitatIcons(monster: Monster): string {
  if (!monster.locations || monster.locations.length === 0) {
    return `<span class="element-default">—</span>`;
  }

  return monster.locations
    .map(
      (location) =>
        `<span title="${location.name}">${getHabitatIcon(location.name)}</span>`,
    )
    .join(" ");
}

export function renderMonsterList(
  monsters: Monster[],
  container: HTMLElement,
  selectedMonsterId?: number,
): void {
  container.innerHTML = "";

  if (monsters.length === 0) {
    container.innerHTML = `<p class="empty-message">No field entries match your notes.</p>`;
    return;
  }

  monsters.forEach((monster) => {
    const card = document.createElement("button");
    card.className = "monster-card";

    const elements = monster.elements ?? [];
    const defaultBg = getMonsterBackground(elements);
    const hoverBg = getMonsterHoverBackground(elements);

    card.style.background = defaultBg;

    card.addEventListener("mouseenter", () => {
      card.style.background = hoverBg;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = defaultBg;
    });

    if (selectedMonsterId === monster.id) {
      card.classList.add("selected");
    }

    card.type = "button";
    card.dataset.id = String(monster.id);

    card.innerHTML = `
      <img
        class="monster-card-image"
        src="${monster.image ?? "/monsters/default.png"}"
        alt="${monster.name}"
        onerror="this.onerror=null; this.src='/monsters/default.png';"
      />

      <h3>${monster.name}</h3>

      <p><strong>Species:</strong> ${capitalize(monster.species)}</p>
      <p><strong>Size:</strong> ${capitalize(monster.type)}</p>

      <div class="monster-icons">
        <div class="icon-row">
          <strong>Elements:</strong>
          <span class="icon-values">${getElementIcons(monster)}</span>
        </div>

        <div class="icon-row">
          <strong>Weaknesses:</strong>
          <span class="icon-values">${getWeaknessIcons(monster)}</span>
        </div>

        <div class="icon-row">
          <strong>Habitats:</strong>
          <span class="icon-values habitat-icon">${getAllHabitatIcons(monster)}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

export function renderMonsterDetails(
  monster: Monster,
  container: HTMLElement,
): void {
  const elementsText =
    monster.elements.length > 0
      ? monster.elements
          .map((element) => `${getElementIcon(element)} ${capitalize(element)}`)
          .join(", ")
      : "None listed";

  const ailmentsText =
    monster.ailments && monster.ailments.length > 0
      ? monster.ailments
          .map(
            (ailment) =>
              `${getAilmentIcon(ailment.name)} ${capitalize(ailment.name)}`,
          )
          .join(", ")
      : "None listed";

  const weaknessesText =
    monster.weaknesses && monster.weaknesses.length > 0
      ? monster.weaknesses
          .map(
            (weakness) =>
              `${getWeaknessIcon(weakness.element)} ${capitalize(weakness.element)} (${weakness.stars}★)`,
          )
          .join(", ")
      : "None listed";

  const locationsText =
    monster.locations && monster.locations.length > 0
      ? monster.locations
          .map(
            (location) => `${getHabitatIcon(location.name)} ${location.name}`,
          )
          .join(", ")
      : "None listed";

  container.innerHTML = `
    <h2>${monster.name}</h2>
    <img
      class="monster-detail-image"
      src="${monster.image ?? "/monsters/default.png"}"
      alt="${monster.name}"
      onerror="this.onerror=null; this.src='/monsters/default.png';"
    />
    <p><strong>Species:</strong> ${capitalize(monster.species)}</p>
    <p><strong>Size:</strong> ${capitalize(monster.type)}</p>
    <p><strong>Elements:</strong> ${elementsText}</p>
    <p><strong>Observed Status Effects:</strong> ${ailmentsText}</p>
    <p><strong>Weaknesses:</strong> ${weaknessesText}</p>
    <p><strong>Known Habitats:</strong> ${locationsText}</p>
    <p><strong>Hunter Notes:</strong> ${monster.description ?? "No notes have been recorded."}</p>
  `;
}

export function renderTypeOptions(
  types: string[],
  selectElement: HTMLSelectElement,
): void {
  selectElement.innerHTML = `<option value="all">All Sizes</option>`;

  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = capitalize(type);
    selectElement.appendChild(option);
  });
}

export function renderSpeciesOptions(
  speciesList: string[],
  selectElement: HTMLSelectElement,
): void {
  selectElement.innerHTML = `<option value="all">All Species</option>`;

  speciesList.forEach((species) => {
    const option = document.createElement("option");
    option.value = species;
    option.textContent = capitalize(species);
    selectElement.appendChild(option);
  });
}

export function renderElementOptions(
  elements: string[],
  selectElement: HTMLSelectElement,
): void {
  selectElement.innerHTML = `<option value="all">All Elements</option>`;

  elements.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = capitalize(element);
    selectElement.appendChild(option);
  });
}

export function renderWeaknessOptions(
  weaknesses: string[],
  selectElement: HTMLSelectElement,
): void {
  selectElement.innerHTML = `<option value="all">All Weaknesses</option>`;

  weaknesses.forEach((weakness) => {
    const option = document.createElement("option");
    option.value = weakness;
    option.textContent = capitalize(weakness);
    selectElement.appendChild(option);
  });
}

export function showStatus(message: string, element: HTMLElement): void {
  element.textContent = message;
}

export function clearStatus(element: HTMLElement): void {
  element.textContent = "";
}
