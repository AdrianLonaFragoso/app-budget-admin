import { Trash2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { IncomesTableProps } from "../types";

const IncomesTable = ({ incomes, onDelete, onUpdate }: IncomesTableProps) => {
  const extraIncomes = incomes.filter((income) => income.type === "extra");
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; amount: number | string }>(
    {
      name: "",
      amount: 0,
    }
  );

  const startEdit = (id: number) => {
    const inc = extraIncomes.find((i) => i.id === id);
    if (!inc) return;
    setEditingId(id);
    setDraft({ name: inc.name, amount: inc.amount });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = (id: number) => {
    const original = incomes.find((i) => i.id === id);
    if (!original) return;
    const amountNum =
      typeof draft.amount === "string"
        ? parseFloat(draft.amount) || 0
        : draft.amount;
    onUpdate({ ...original, name: draft.name, amount: amountNum });
    setEditingId(null);
  };

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
                {editingId === income.id ? (
                  <>
                    <td className="py-2 px-3">
                      <input
                        className="w-full bg-gray-700 text-white rounded px-2 py-1"
                        value={draft.name}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, name: e.target.value }))
                        }
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        className="w-24 text-right bg-gray-700 text-white rounded px-2 py-1"
                        type="number"
                        step="0.01"
                        value={draft.amount}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, amount: e.target.value }))
                        }
                      />
                    </td>
                    <td className="py-2 px-3 text-right flex justify-end gap-1">
                      <button
                        onClick={() => saveEdit(income.id)}
                        className="text-green-500 hover:text-green-400 p-1 rounded-full hover:bg-green-500/20"
                        title="Guardar"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-400 hover:text-gray-300 p-1 rounded-full hover:bg-gray-500/10"
                        title="Cancelar"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-3">{income.name}</td>
                    <td className="py-2 px-3 text-right">
                      ${income.amount.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-right flex justify-end gap-1">
                      <button
                        onClick={() => startEdit(income.id)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-400/20"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(income.id)}
                        className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-red-500/20"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncomesTable;
