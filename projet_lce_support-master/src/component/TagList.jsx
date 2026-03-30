export default function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className="bg-gray-100 px-3 py-1 rounded-full text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
