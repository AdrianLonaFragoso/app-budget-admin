import { Trash2 } from "lucide-react";
import { ExpensesTableProps } from "../types";

const ExpensesTable = ({ expenses, onDelete }: ExpensesTableProps) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (expenses.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4">
        No hay gastos registrados
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-3 text-left">Nombre</th>
            <th className="py-2 px-3 text-right">Monto</th>
            <th className="py-2 px-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-700 hover:bg-gray-750"
            >
              <td className="py-2 px-3">{expense.name}</td>
              <td className="py-2 px-3 text-right">
                ${expense.amount.toFixed(2)}
              </td>
              <td className="py-2 px-3 text-right">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-red-500/20"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="py-2 px-3">Total</td>
            <td className="py-2 px-3 text-right">${total.toFixed(2)}</td>
            <td className="py-2 px-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
