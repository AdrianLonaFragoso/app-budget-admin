import type { RootState } from "../store";

export function buildBudgetPayload(state: RootState) {
  const { expenses, incomes, totalIncome } = state.budget;
  return {
    expenses: expenses.map((e) => ({
      id: e.id,
      name: e.name,
      amount: e.amount,
    })),
    incomes: incomes.map((i) => ({
      id: i.id,
      name: i.name,
      amount: i.amount,
      type: i.type,
    })),
    totals: {
      totalIncome,
      totalExpenses: expenses.reduce((s, e) => s + e.amount, 0),
      balance: totalIncome - expenses.reduce((s, e) => s + e.amount, 0),
    },
    createdAt: new Date().toISOString(),
  };
}

export async function sendBudget(
  url: string,
  payload: ReturnType<typeof buildBudgetPayload>
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to POST budget: ${res.status}`);
  return res.json();
}
