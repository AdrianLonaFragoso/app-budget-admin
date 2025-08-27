import { configureStore } from "@reduxjs/toolkit";
import budgetReducer, { type BudgetState } from "./budgetSlice";
import { loadState, saveState } from "./persist";
import type { Income } from "../types";

export interface RootStateShape {
  budget: BudgetState;
}

const migrate = (
  state: RootStateShape | undefined
): RootStateShape | undefined => {
  if (!state) return state;
  const incomes: Income[] = state.budget.incomes.map((i: any) => {
    const rawType = i?.type;
    const normalizedType: Income["type"] =
      rawType === "total" ? "total" : rawType === "extra" ? "extra" : "extra"; // map legacy or unknown to "extra"
    return {
      id: Number(i.id),
      name: String(i.name),
      amount: Number(i.amount),
      type: i.type === "regular" ? "extra" : normalizedType,
    } satisfies Income;
  });
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  return { budget: { ...state.budget, incomes, totalIncome } };
};

const preloaded = migrate(loadState<RootStateShape>());

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => {
  const state = store.getState();
  saveState<RootStateShape>({ budget: state.budget });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
