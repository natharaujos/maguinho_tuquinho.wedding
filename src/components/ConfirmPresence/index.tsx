import { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

type ConfirmPresenceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onConfirm: (guestsCount: number, guestNames: string[]) => void;
};

export function ConfirmPresenceModal({
  isOpen,
  onClose,
  userEmail,
  onConfirm,
}: ConfirmPresenceModalProps) {
  const [guestsCount, setGuestsCount] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

  useEffect(() => {
    async function checkExistingConfirmation() {
      if (!userEmail) return;

      setLoading(true);
      try {
        const q = query(
          collection(db, "presenceConfirmations"),
          where("userEmail", "==", userEmail)
        );

        const querySnapshot = await getDocs(q);
        setAlreadyConfirmed(!querySnapshot.empty);
      } catch (error) {
        console.error("Erro ao verificar confirmação:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      checkExistingConfirmation();
    }
  }, [userEmail, isOpen]);

  // Handle change in number of guests
  const handleGuestsCountChange = (count: number) => {
    setGuestsCount(count);

    if (count > guestNames.length) {
      setGuestNames([
        ...guestNames,
        ...Array(count - guestNames.length).fill(""),
      ]);
    } else {
      setGuestNames(guestNames.slice(0, count));
    }
  };

  // Handle change in guest name
  const handleNameChange = (index: number, value: string) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const handleConfirm = () => {
    if (alreadyConfirmed) return;
    onConfirm(guestsCount, guestNames);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "p-6 rounded-lg",
      }}
    >
      <div className="text-2xl font-bold text-[#D4AF7F] text-center mb-6">
        Confirmação de Presença
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-gray-700 font-medium">Seu e-mail:</span>
          <p className="text-[#D4AF7F] mt-1">{userEmail}</p>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF7F] mx-auto"></div>
          </div>
        ) : alreadyConfirmed ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-yellow-800">
            Você já confirmou sua presença anteriormente.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Number of guests */}
            <div>
              <label
                htmlFor="guests"
                className="block text-gray-700 font-medium mb-2"
              >
                Quantas pessoas vão na festa com você?
              </label>
              <input
                id="guests"
                type="number"
                min={1}
                max={10}
                value={guestsCount}
                onChange={(e) =>
                  handleGuestsCountChange(Number(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Guest names */}
            <div className="space-y-2">
              {guestNames.map((name, index) => (
                <div>
                  <input
                    key={index}
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Nome do convidado ${index + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          {alreadyConfirmed ? "Fechar" : "Cancelar"}
        </button>
        {!alreadyConfirmed && (
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-[#D4AF7F] rounded-md hover:bg-[#F4D4C1] transition-colors duration-200 cursor-pointer"
          >
            Confirmar Presença
          </button>
        )}
      </div>
    </Dialog>
  );
}
