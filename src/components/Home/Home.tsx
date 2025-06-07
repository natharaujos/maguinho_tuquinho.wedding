import Button from "../Button/Button";
import Countdown from "../Countdown/Countdown";

function Home() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-12 sm:px-6 md:px-8">
      <img
        src="/fotos/casal.jpg"
        alt="Casal"
        className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover"
      />

      <h1 className="text-3xl md:text-5xl font-bold mt-6">
        Bem-vindos ao nosso casamento!
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mt-4">
        Com muito amor, convidamos você para celebrar conosco.
      </p>

      <div className="mt-6 text-base md:text-lg">
        <p>
          <strong>Data:</strong> 20 de Dezembro de 2025
        </p>
        <p>
          <strong>Local:</strong> Espaço Jardim Secreto, São Paulo
        </p>
      </div>

      <Countdown targetDate="2025-10-25T17:00:00" />

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button text="Nossa História" link="#historia" />
        <Button text="Lista de Presentes" link="#presentes" />
        <Button text="Confirme Presença" link="#rsvp" />
      </div>
    </div>
  );
}

export default Home;
