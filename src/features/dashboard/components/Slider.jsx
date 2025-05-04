import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaCarousel({ slides }) {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -560, behavior: "smooth" }); // 550px + marge
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 560, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-1 shadow"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-black rounded-full p-1 shadow"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slides container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-8"
      >
        {slides.map((slide, index) => {
          const isVideo = slide.endsWith(".mp4");
          return (
            <div
              key={index}
              className="flex-none w-[550px] h-[250px] rounded-lg overflow-hidden bg-black shadow"
            >
              {isVideo ? (
                <video
                  src={slide}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  controls
                />
              ) : (
                <img
                  src={slide}
                  alt={`media-${index}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
