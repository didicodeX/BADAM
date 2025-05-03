import clsx from "clsx";

export default function ImageGrid({ images = [], selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(img)}
          className={clsx(
            "border rounded overflow-hidden transition ring-offset-2 focus:outline-none",
            selected === img
              ? "ring-2 ring-cta-500 "
              : "hover:ring-1 ring-text-300"
          )}
        >
          <img
            src={img}
            alt={`option-${index}`}
            className="w-full h-36 object-cover"
          />
        </button>
      ))}
    </div>
  );
}