import { useState } from "react";

export default function InputField({ placeholder, onAdd }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="input-style"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 rounded-lg"
      >
        Add
      </button>
    </div>
  );
}