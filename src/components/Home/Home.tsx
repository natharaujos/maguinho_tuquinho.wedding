import Button from "../Button/Button";
import Countdown from "../Countdown/Countdown";
import foto from "../../assets/main_pic_mtwedding.jfif";
import { useState } from "react";
import { ConfirmPresenceModal } from "../ConfirmPresence";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { savePresenceConfirmation } from "../../services/savePresenceConfirmation";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <section
      id="home"
      className="min-h-screen pt-24 px-4 py-12 sm:px-6 md:px-8 bg-pink-50"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <img
          src={foto}
          alt="Casal"
          className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover shadow-lg"
        />

        <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mt-6">
          Bem-vindos ao nosso casamento!
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-xl">
          Com muito amor, convidamos você para celebrar conosco esse momento tão
          especial.
        </p>

        <div className="mt-6 text-base md:text-lg text-gray-800 space-y-1">
          <p>
            <strong>Data:</strong> 25 de Outubro de 2025
          </p>
          <p>
            <strong>Local:</strong> Igreja Nossa Senhora Aparecida
          </p>
        </div>

        <Countdown targetDate="2025-10-25T17:00:00" />

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button text="Nossa História" link="#historia" />
          <Button text="Lista de Presentes" link="#presentes" />
          <Button
            text="Confirme Presença"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      <ConfirmPresenceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={user?.email || ""}
        onConfirm={(guests) => {
          savePresenceConfirmation({
            userEmail: user?.email || "",
            guestsCount: guests,
            confirmedAt: new Date(),
            status: "confirmed",
          });
        }}
      />
    </section>
  );
}

export default Home;
