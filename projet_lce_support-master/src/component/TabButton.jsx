export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
}
