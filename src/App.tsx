import { useMemo, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import ExpensesTable from "./components/ExpensesTable";
import IncomesTable from "./components/IncomesTable";
import ProgressBar from "./components/ProgressBar";
import { Expense, Income } from "./types";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  addExpense as addExpenseAction,
  addIncome as addIncomeAction,
  deleteExpense as deleteExpenseAction,
  deleteIncome as deleteIncomeAction,
  updateExpense as updateExpenseAction,
  updateIncome as updateIncomeAction,
} from "./store/budgetSlice";
import { ChevronDown } from "lucide-react";

function App() {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((s) => s.budget.expenses);
  const incomes = useAppSelector((s) => s.budget.incomes);
  const totalIncome = useAppSelector((s) => s.budget.totalIncome);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    dispatch(addExpenseAction(expenseData));
    setShowExpenseForm(false);
  };

  const addIncome = (incomeData: Omit<Income, "id">) => {
    dispatch(addIncomeAction(incomeData));
    setShowIncomeForm(false);
  };

  const deleteExpense = (id: number) => {
    dispatch(deleteExpenseAction(id));
  };

  const deleteIncome = (id: number) => {
    dispatch(deleteIncomeAction(id));
  };

  const editExpense = (expense: Expense) => {
    dispatch(updateExpenseAction(expense));
  };

  const editIncome = (income: Income) => {
    dispatch(updateIncomeAction(income));
  };

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.amount, 0),
    [expenses]
  );
  const expensePercentage = useMemo(
    () => (totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0),
    [totalExpenses, totalIncome]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-5">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/expense-logo-head.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-orange-500 rounded-sm md:bg-transparent md:text-orange-500 md:p-0 dark:text-white md:dark:text-orange-500"
                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          {/* Formulario de Gastos */}
          <div className="gamer-border rounded-lg p-0 bg-gray-800 self-start">
            <button
              type="button"
              onClick={() => setShowExpenseForm((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4"
              aria-expanded={showExpenseForm}
            >
              <h2 className="text-2xl font-bold text-orange-500">
                Agregar Gasto Fijo
              </h2>
              <ChevronDown
                className={`transition-transform ${
                  showExpenseForm ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {showExpenseForm && (
              <div className="px-6 pb-6">
                <ExpenseForm onSubmit={addExpense} />
              </div>
            )}
          </div>

          {/* Formulario de Ingresos */}
          <div className="gamer-border rounded-lg p-0 bg-gray-800 self-start">
            <button
              type="button"
              onClick={() => setShowIncomeForm((v) => !v)}
              className="w-full flex items-center justify-between px-6 py-4"
              aria-expanded={showIncomeForm}
            >
              <h2 className="text-2xl font-bold text-purple-500">
                Agregar Ingreso
              </h2>
              <ChevronDown
                className={`transition-transform ${
                  showIncomeForm ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {showIncomeForm && (
              <div className="px-6 pb-6">
                <IncomeForm onSubmit={addIncome} />
              </div>
            )}
          </div>
        </div>

        {/* Resumen */}
        <div className="mt-8 p-6 gamer-border rounded-lg bg-gray-800 mb-5">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Resumen Financiero
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-gray-400">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-500">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Gastos Totales</p>
              <p className="text-2xl font-bold text-red-500">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Balance</p>
              <p
                className={`text-2xl font-bold ${
                  totalIncome - totalExpenses >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${(totalIncome - totalExpenses).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Barra de Progreso de Gastos */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Progreso de Gastos</h2>
            <span
              className={`text-lg font-bold ${
                expensePercentage > 70
                  ? "text-red-500"
                  : expensePercentage > 50
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {expensePercentage.toFixed(2)}%
            </span>
          </div>
          <ProgressBar items={expenses} total={totalIncome} type="expenses" />
        </div>

        {/* Barra de Progreso de Ingresos */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Progreso de Ingresos</h2>
          <ProgressBar
            items={incomes.filter((income) => income.type === "extra")}
            total={totalIncome}
            type="incomes"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tabla de Gastos */}
          <div className="gamer-border rounded-lg p-6 bg-gray-800">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Gastos Fijos
            </h2>
            <ExpensesTable
              expenses={expenses}
              onDelete={deleteExpense}
              onUpdate={editExpense}
            />
          </div>

          {/* Tabla de Ingresos */}
          <div className="gamer-border rounded-lg p-6 bg-gray-800">
            <h2 className="text-2xl font-bold text-purple-500 mb-4">
              Ingresos
            </h2>
            <IncomesTable
              incomes={incomes}
              onDelete={deleteIncome}
              onUpdate={editIncome}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
