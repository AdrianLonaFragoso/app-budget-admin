import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Expense, Income } from "../types";

export interface BudgetState {
  expenses: Expense[];
  incomes: Income[];
  totalIncome: number;
}

const initialState: BudgetState = {
  expenses: [],
  incomes: [],
  totalIncome: 0,
};

const nextId = () => Date.now();

const sumIncomes = (incomes: Income[]) =>
  incomes.reduce((s, i) => s + i.amount, 0);

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, "id">>) => {
      const newExpense: Expense = { id: nextId(), ...action.payload };
      state.expenses.push(newExpense);
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },
    addIncome: (state, action: PayloadAction<Omit<Income, "id">>) => {
      const newIncome: Income = { id: nextId(), ...action.payload };
      state.incomes.push(newIncome);
      state.totalIncome = sumIncomes(state.incomes);
    },
    deleteIncome: (state, action: PayloadAction<number>) => {
      state.incomes = state.incomes.filter((i) => i.id !== action.payload);
      state.totalIncome = sumIncomes(state.incomes);
    },
    hydrate: (state, action: PayloadAction<BudgetState>) => {
      return action.payload;
    },
  },
});

export const { addExpense, deleteExpense, addIncome, deleteIncome, hydrate } =
  budgetSlice.actions;

export default budgetSlice.reducer;
