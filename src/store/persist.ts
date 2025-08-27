const STORAGE_KEY = "app-budget-state";

export function loadState<T>(): T | undefined {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized) as T;
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return undefined;
  }
}

export function saveState<T>(state: T) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.warn("Failed to save state to localStorage", e);
  }
}
