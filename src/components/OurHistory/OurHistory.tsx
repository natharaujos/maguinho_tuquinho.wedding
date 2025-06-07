import foto from "../../assets/foto.jpg";

interface OurHistoryProps {
  title?: string;
  story?: string;
  images?: string[];
}

function OurHistory({
  title = "Nossa História",
  story = `Tudo começou há alguns anos, quando Maguinha e Tuquinho se encontraram por acaso em um café. Desde então, começaram uma linda jornada de amor, companheirismo e aventuras juntos. Cada momento é especial e queremos compartilhar essa história com vocês.`,
  images = [`${foto}`, `${foto}`, `${foto}`, `${foto}`],
}: OurHistoryProps) {
  return (
    <section id="historia" className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Texto */}
        <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed">
          {story.split("\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

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
