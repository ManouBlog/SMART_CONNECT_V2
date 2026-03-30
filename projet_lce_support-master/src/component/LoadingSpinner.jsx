export default function LoadingSpinner({ text = "Chargement..." }) {
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40">
      <div className="flex flex-col items-center space-y-4">

        {/* Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>

        {/* Texte */}
        <p className="text-white text-sm font-medium tracking-wide">
          {text}
        </p>

      </div>
    </div>
  );
}
