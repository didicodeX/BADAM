import MediaCarousel from "@/shared/components/MediaCarousel";

const media = [
  "https://res.cloudinary.com/duvjrq5ca/image/upload/v1746188847/projects/BADAM/formations/1746188845514-Frame%2013.png.png",
  "https://res.cloudinary.com/duvjrq5ca/video/upload/v1746188848/projects/BADAM/formations/1746188845974-185787-876545918_small.mp4.mp4",
  "/video/[_Traduction_Française_]_Beautiful_People_-_Ed_Sheeran_ft._Khalid(360p).mp4"
];

export default function TrainingDetailPage() {
  return (
    <div className="padd-x padd-y">
      {/* caroussel */}
      <MediaCarousel media={media} />
    </div>
  );
}
