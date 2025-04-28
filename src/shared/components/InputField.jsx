export default function InputField({ placeholder, error, ...rest }) {
  return (
    <div className="space-y-1">
      <input
        {...rest}
        className="w-full px-4 py-2 border rounded border-text-200"
        placeholder={placeholder}
      />
      {error && <p className="text-error-700 text-sm">{error.message}</p>}
    </div>
  );
}
