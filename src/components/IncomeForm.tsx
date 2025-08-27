import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { IncomeFormProps } from "../types";

const IncomeForm = ({ onSubmit }: IncomeFormProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    onSubmit({
      name,
      amount: parseFloat(amount),
      type: "extra",
    });

    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del Ingreso
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="Ej: Salario, Freelance, etc."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monto</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          placeholder="0.00"
          step="0.01"
        />
      </div>
      <button
        type="submit"
        className="w-full gamer-button py-2 px-4 rounded font-bold flex items-center justify-center gap-2"
      >
        <PlusCircle size={20} />
        Agregar Ingreso
      </button>
    </form>
  );
};

export default IncomeForm;
