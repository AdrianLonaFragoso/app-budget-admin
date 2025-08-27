import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { ExpenseFormProps } from "../types";

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [vigencia, setVigencia] = useState<string>("");
  const [indefinido, setIndefinido] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    onSubmit({
      name,
      amount: parseFloat(amount),
      vigencia: indefinido ? null : vigencia || null,
      indefinido,
    });

    setName("");
    setAmount("");
    setVigencia("");
    setIndefinido(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del Gasto
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          placeholder="Ej: Alquiler, Internet, etc."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monto</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          placeholder="0.00"
          step="0.01"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Vigencia</label>
          <input
            type="date"
            value={vigencia}
            onChange={(e) => setVigencia(e.target.value)}
            disabled={indefinido}
            className={`w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 ${
              indefinido ? "opacity-50 cursor-not-allowed" : ""
            }`}
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <input
            id="indefinido"
            type="checkbox"
            checked={indefinido}
            onChange={(e) => setIndefinido(e.target.checked)}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded"
          />
          <label htmlFor="indefinido" className="text-sm font-medium">
            Indefinido
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full gamer-button py-2 px-4 rounded font-bold flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        Agregar Gasto
      </button>
    </form>
  );
};

export default ExpenseForm;
