import { ProgressBarProps } from "../types";

const ProgressBar = ({ items, total }: ProgressBarProps) => {
  // Colores para las diferentes categorías
  const colors = [
    "bg-orange-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  return (
    <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden flex">
      {items.map((item, index) => {
        const percentage = total > 0 ? (item.amount / total) * 100 : 0;
        return (
          <div
            key={item.id}
            className={`h-full ${
              colors[index % colors.length]
            } flex items-center justify-center text-xs font-bold`}
            style={{ width: `${percentage}%` }}
            title={`${item.name}: $${item.amount}`}
          >
            {percentage > 10 ? `${item.name}: $${item.amount}` : ""}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
