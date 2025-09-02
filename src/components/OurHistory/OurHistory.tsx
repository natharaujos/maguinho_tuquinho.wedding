import foto from "../../assets/foto.jpg";

interface OurHistoryProps {
  title?: string;
  story?: string;
  images?: string[];
}

function OurHistory({
  images = [`${foto}`, `${foto}`, `${foto}`, `${foto}`],
}: OurHistoryProps) {
  return (
    <section id="historia" className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Imagens */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Nossa história imagem ${idx + 1}`}
              className="rounded-lg object-cover w-full h-48 md:h-56 shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurHistory;
