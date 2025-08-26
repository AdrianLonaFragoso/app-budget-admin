import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import ExpensesTable from "./components/ExpensesTable";
import IncomesTable from "./components/IncomesTable";
import ProgressBar from "./components/ProgressBar";
import { Expense, Income } from "./types";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const addExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const addIncome = (incomeData: Omit<Income, "id">) => {
    const newIncome: Income = {
      ...incomeData,
      id: Date.now(),
    };

    setIncomes([...incomes, newIncome]);

    // Actualizar el ingreso total
    if (incomeData.type === "total") {
      setTotalIncome(incomeData.amount);
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const deleteIncome = (id: number) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const expensePercentage =
    totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-600">
          Control de Gastos Gamer
        </h1>
        <p className="text-gray-400 mt-2">
          Mantén tus finanzas bajo control con estilo
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Formulario de Gastos */}
        <div className="gamer-border rounded-lg p-6 bg-gray-800">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Agregar Gasto Fijo
          </h2>
          <ExpenseForm onSubmit={addExpense} />
        </div>

        {/* Formulario de Ingresos */}
        <div className="gamer-border rounded-lg p-6 bg-gray-800">
          <h2 className="text-2xl font-bold text-purple-500 mb-4">
            Agregar Ingreso
          </h2>
          <IncomeForm onSubmit={addIncome} />
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
          items={incomes.filter((income) => income.type !== "total")}
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
          <ExpensesTable expenses={expenses} onDelete={deleteExpense} />
        </div>

        {/* Tabla de Ingresos */}
        <div className="gamer-border rounded-lg p-6 bg-gray-800">
          <h2 className="text-2xl font-bold text-purple-500 mb-4">Ingresos</h2>
          <IncomesTable incomes={incomes} onDelete={deleteIncome} />
        </div>
      </div>

      {/* Resumen */}
      <div className="mt-8 p-6 gamer-border rounded-lg bg-gray-800">
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
    </div>
  );
}

export default App;
