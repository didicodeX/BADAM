export default function ProgressBar({ value = 0 }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-md bg-background-50 rounded-xl shadow-lg p-6 space-y-4 text-center">
        <p className="text-text-800 font-medium">Téléversement en cours…</p>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-cta-500 transition-all duration-300 ease-in-out"
            style={{ width: `${value}%` }}
          />
        </div>

        <p className="text-sm text-text-500">{value}%</p>
      </div>
    </div>
  );
}
