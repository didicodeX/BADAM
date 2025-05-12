import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MediaCarousel({ media = [] }) {
  return (
    <div className="relative bg-red-500 w-full max-w-80  sm:max-w-[500px] lg:max-w-[1000px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        className="rounded-lg overflow-hidden w-full"
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video bg-background-50">
              {item.endsWith(".mp4") ? (
                <video
                  src={item}
                  controls
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={item}
                  alt={`media-${index}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination personnalisée */}
      <div className="swiper-pagination-custom mt-3 text-center" />
    </div>
  );
}
