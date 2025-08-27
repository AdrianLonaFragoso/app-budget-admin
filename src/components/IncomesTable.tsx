import { Trash2 } from "lucide-react";
import { IncomesTableProps } from "../types";

const IncomesTable = ({ incomes, onDelete }: IncomesTableProps) => {
  const extraIncomes = incomes.filter((income) => income.type === "extra");
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-bold mb-2 text-purple-400">
        Ingreso Total: ${totalIncome.toFixed(2)}
      </h3>

      {extraIncomes.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          No hay ingresos extra registrados
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-3 text-left">Nombre</th>
              <th className="py-2 px-3 text-right">Monto</th>
              <th className="py-2 px-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {extraIncomes.map((income) => (
              <tr
                key={income.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="py-2 px-3">{income.name}</td>
                <td className="py-2 px-3 text-right">
                  ${income.amount.toFixed(2)}
                </td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => onDelete(income.id)}
                    className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-red-500/20"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomesTable;
