export interface Expense {
  id: number;
  name: string;
  amount: number;
}

export interface Income {
  id: number;
  name: string;
  amount: number;
  type: "regular" | "total";
}

export interface ProgressBarProps {
  items: Array<Expense | Income>;
  total: number;
  type: "expenses" | "incomes";
}

export interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id">) => void;
}

export interface IncomeFormProps {
  onSubmit: (income: Omit<Income, "id">) => void;
}

export interface ExpensesTableProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export interface IncomesTableProps {
  incomes: Income[];
  onDelete: (id: number) => void;
}
