import { Trash2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { ExpensesTableProps } from "../types";

const ExpensesTable = ({
  expenses,
  onDelete,
  onUpdate,
}: ExpensesTableProps) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<{
    name: string;
    amount: number | string;
    vigencia?: string | null;
    indefinido?: boolean;
  }>({ name: "", amount: 0, vigencia: null, indefinido: false });

  if (expenses.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4">
        No hay gastos registrados
      </p>
    );
  }

  const formatVigencia = (vigencia?: string | null, indefinido?: boolean) => {
    if (indefinido || !vigencia) return "-";
    return vigencia; // keep as YYYY-MM-DD; adjust formatting if needed
  };

  const startEdit = (id: number) => {
    const e = expenses.find((ex) => ex.id === id);
    if (!e) return;
    setEditingId(id);
    setDraft({
      name: e.name,
      amount: e.amount,
      vigencia: e.vigencia ?? null,
      indefinido: e.indefinido ?? false,
    });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = (id: number) => {
    const original = expenses.find((ex) => ex.id === id);
    if (!original) return;
    const amountNum =
      typeof draft.amount === "string"
        ? parseFloat(draft.amount) || 0
        : draft.amount;
    onUpdate({
      ...original,
      name: draft.name,
      amount: amountNum,
      vigencia: draft.indefinido ? null : draft.vigencia ?? null,
      indefinido: !!draft.indefinido,
    });
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-3 text-left">Nombre</th>
            <th className="py-2 px-3 text-left">Vigencia</th>
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
              {editingId === expense.id ? (
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
                  <td className="py-2 px-3 text-left">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        disabled={!!draft.indefinido}
                        className="bg-gray-700 text-white rounded px-2 py-1"
                        value={draft.vigencia ?? ""}
                        onChange={(e) =>
                          setDraft((d) => ({ ...d, vigencia: e.target.value }))
                        }
                      />
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={!!draft.indefinido}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              indefinido: e.target.checked,
                            }))
                          }
                        />
                        Indefinido
                      </label>
                    </div>
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
                      onClick={() => saveEdit(expense.id)}
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
                  <td className="py-2 px-3">{expense.name}</td>
                  <td className="py-2 px-3 text-left">
                    {formatVigencia(expense.vigencia, expense.indefinido)}
                  </td>
                  <td className="py-2 px-3 text-right">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right flex justify-end gap-1">
                    <button
                      onClick={() => startEdit(expense.id)}
                      className="text-blue-400 hover:text-blue-300 p-1 rounded-full hover:bg-blue-400/20"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
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
        <tfoot>
          <tr className="font-bold">
            <td className="py-2 px-3">Total</td>
            <td className="py-2 px-3"></td>
            <td className="py-2 px-3 text-right">${total.toFixed(2)}</td>
            <td className="py-2 px-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpensesTable;
