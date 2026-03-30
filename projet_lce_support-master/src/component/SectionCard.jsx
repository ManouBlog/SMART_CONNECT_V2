export default function SectionCard({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}