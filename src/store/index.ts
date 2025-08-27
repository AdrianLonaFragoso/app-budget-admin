import { configureStore } from "@reduxjs/toolkit";
import budgetReducer, { type BudgetState } from "./budgetSlice";
import { loadState, saveState } from "./persist";

export interface RootStateShape {
  budget: BudgetState;
}

const migrate = (
  state: RootStateShape | undefined
): RootStateShape | undefined => {
  if (!state) return state;
  const incomes = state.budget.incomes.map((i) =>
    // @ts-expect-error legacy value "regular"
    i.type === "regular" ? { ...i, type: "extra" } : i
  );
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
