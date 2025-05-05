export default function Status({ taken = 0, total = 0, expired = false }) {
  if (expired) {
    return (
      <span className="w-fit mt-2 bg-error-50 text-error-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
        Expirée
      </span>
    );
  }

  if (taken === 0) {
    return (
      <span className="w-fit mt-2 bg-success-50 text-success-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
        Disponible
      </span>
    );
  }

  if (total === 0) {
    return (
      <span className="w-fit mt-2 bg-warning-50 text-warning-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
        Limite non définie
      </span>
    );
  }

  return (
    <span className="w-fit mt-2 bg-success-50 text-success-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
      {taken} / {total} places
    </span>
  );
}
