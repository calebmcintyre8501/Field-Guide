# 🐉 Hunter’s Field Guide

An interactive Monster Hunter: World field guide that allows users to browse, filter, and explore monster data with a clean, immersive UI inspired by in-game hunter notes.

---

## 📖 Overview

The Hunter’s Field Guide is a web application that fetches monster data from a third-party API and presents it in a visually rich, user-friendly format.

Users can search, filter, and sort monsters while viewing detailed information such as:

- Species and size
- Elements and weaknesses
- Status effects
- Habitats
- Descriptions (Hunter Notes)

The UI is styled to resemble a physical field journal, enhancing immersion and usability.

---

## 🚀 Features

### 🔍 Search & Filtering

- Search monsters by name
- Filter by:
  - Size
  - Species
  - Element
  - Weakness

- Sort alphabetically (A → Z, Z → A)
- Clear all filters instantly

---

### 📊 Monster Data Display

- Interactive monster cards
- Detailed side panel with full monster information
- Emoji-based icon system for:
  - Elements
  - Weaknesses
  - Habitats
  - Status effects

---

### 🎨 UI & UX Enhancements

- Book-style “field guide” layout
- Sticky panels for filters and details
- Dynamic gradient backgrounds based on monster elements
  - Supports dual-element blending

- Hover effects and visual feedback
- Responsive layout for smaller screens

---

### ⚙️ Technical Implementation

- Built with \*_TypeScript + Vite_
- Uses **fetch + async/await** for API requests
- Strongly typed with custom TypeScript interfaces
- Modular structure:
  - `api.ts` → data fetching
  - `filters.ts` → filtering/sorting logic
  - `render.ts` → UI rendering
  - `main.ts` → application logic

---

## 🛠️ Installation & Setup

1. Clone the repository
   git clone <your-repo-url>
   cd <your-project-folder>

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

4. Open in browser
   Navigate to:
   http://localhost:5173

## 🌐 API Usage

This project uses a Monster Hunter API to retrieve monster data.

Data is fetched using fetch with async/await

Responses are validated using response.ok

Errors are handled gracefully with user feedback

## 📜 Credits

Monster Hunter data sourced from a public API

UI inspired by Monster Hunter: World field guide design

## 🏁 Final Notes

This project fulfills all base requirements and includes multiple bonus features to enhance usability and presentation.

Designed to feel less like a tool — and more like a hunter’s personal field journal.

===================================
USER STORIES
===================================

As a user, I want to filter monsters by size, so I can distinguish between large and small monsters.

As a user, I want to filter monsters by species, so I can explore similar creature types.

As a user, I want to filter monsters by element, so I can find monsters with specific elemental traits.

As a user, I want to filter monsters by weakness, so I can plan hunts more effectively.

As a user, I want to sort monsters alphabetically, so I can browse in an organized way.

As a user, I want to clear all filters, so I can reset the view easily.

As a user, I want to see icons for elements, weaknesses, and habitats, so I can quickly scan important info.

As a user, I want the UI to feel like a Monster Hunter field guide, so the experience is immersive.

As a user, I want element-based color gradients on cards, so I can visually identify monster types.

===================================
KANBAN BOARD
===================================

++++++++++++++++++++++++
TO DO
++++++++++++++++++++++++

<!-- Set up project structure (Vite + TS)

Connect to Monster Hunter API

Define TypeScript interfaces for Monster data

Render basic monster list

Create monster detail panel

Add search functionality

Add size filter

Add species filter

Add element filter

Add weakness filter

Add sorting (A–Z / Z–A)

Add clear filters button

Add loading + error handling -->

++++++++++++++++++++++++
IN PROGRESS
++++++++++++++++++++++++

++++++++++++++++++++++++
DONE
++++++++++++++++++++++++

Set up project structure (Vite + TS)

Connect to Monster Hunter API

Define TypeScript interfaces for Monster data

Render basic monster list

Create monster detail panel

Add search functionality

Add size filter

Add species filter

Add element filter

Add weakness filter

Add sorting (A–Z / Z–A)

Add clear filters button

Add loading + error handling

Emoji-based icon system (elements, weaknesses, habitats)

Dynamic element gradients (including dual-element support)

Hover effects on cards

Sticky panels (controls + details)

Image system for monsters

Habitat visualization with icons

Clean UI hierarchy

++++++++++++++++++++++++
EXTRA
++++++++++++++++++++++++

<!-- Emoji-based icon system (elements, weaknesses, habitats)

Dynamic element gradients (including dual-element support)

Hover effects on cards

Sticky panels (controls + details)

Image system for monsters

Habitat visualization with icons

Clean UI hierarchy -->
