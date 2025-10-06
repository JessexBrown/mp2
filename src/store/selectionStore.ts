import { FIRST_GEN_IDS } from "../api/poke";

const STORAGE_KEY = "selection:list:v1";
const INDEX_KEY = "selection:index:v1";

let currentIds: (string | number)[] = [];
let currentIndex = 0;

/** Load from localStorage (if present) */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const idx = localStorage.getItem(INDEX_KEY);
    if (raw) currentIds = JSON.parse(raw);
    if (idx) currentIndex = Math.max(0, parseInt(idx, 10) || 0);
  } catch {
    // ignore
  }
}

/** Save to localStorage */
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentIds));
    localStorage.setItem(INDEX_KEY, String(currentIndex));
  } catch {
    // ignore
  }
}

/** Ensure we always have a list (default to 1..151) */
function ensureDefaultList() {
  if (!currentIds || currentIds.length === 0) {
    currentIds = [...FIRST_GEN_IDS];
    currentIndex = 0;
  }
}

loadFromStorage();
ensureDefaultList();

export const selectionStore = {
  /** Set entire list (persists) */
  setList(ids: (string | number)[]) {
    currentIds = ids && ids.length ? ids : [...FIRST_GEN_IDS];
    if (currentIndex >= currentIds.length) currentIndex = 0;
    saveToStorage();
  },
  /** Get current list (never empty; falls back to first gen) */
  getList() {
    ensureDefaultList();
    return currentIds;
  },
  /** Set active index (persists) */
  setIndex(i: number) {
    ensureDefaultList();
    currentIndex = Math.min(Math.max(0, i), currentIds.length - 1);
    saveToStorage();
  },
  getIndex() {
    ensureDefaultList();
    return currentIndex;
  },
  nextId() {
    ensureDefaultList();
    if (!currentIds.length) return undefined;
    currentIndex = (currentIndex + 1) % currentIds.length;
    saveToStorage();
    return currentIds[currentIndex];
    },
  prevId() {
    ensureDefaultList();
    if (!currentIds.length) return undefined;
    currentIndex = (currentIndex - 1 + currentIds.length) % currentIds.length;
    saveToStorage();
    return currentIds[currentIndex];
  },
};
