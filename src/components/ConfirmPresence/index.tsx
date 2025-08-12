import { useState } from "react";
import { Dialog } from "@mui/material";

type ConfirmPresenceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onConfirm: (guests: number) => void;
};

export function ConfirmPresenceModal({
  isOpen,
  onClose,
  userEmail,
  onConfirm,
}: ConfirmPresenceModalProps) {
  const [guests, setGuests] = useState(1);

  const handleConfirm = () => {
    onConfirm(guests);
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
      <div className="text-2xl font-bold text-pink-700 text-center mb-6">
        Confirmação de Presença
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-gray-700 font-medium">Seu e-mail:</span>
          <p className="text-pink-600 mt-1">{userEmail}</p>
        </div>

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
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-8">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-colors duration-200"
        >
          Confirmar Presença
        </button>
      </div>
    </Dialog>
  );
}
