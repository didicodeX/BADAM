export default function Statistique({ title, count }) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow flex-shrink min-w-72 basis-52 max-w-[400px] w-full  h-[150px]  bg-cta-200  rounded-lg">
      <p className=" text-cta-500 font-bold ">{title}</p>
      <p className=" text-cta-500 font-bold ">{count}</p>
    </div>
  );
}
