import { useEffect, useState } from "react";
import { collection, query, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";

interface ConfirmedGuest {
  userName: string;
  userEmail: string;
  guestsCount: number;
  confirmedAt: Timestamp;
  status: "confirmed" | "canceled";
  otherGuests?: string[]; // new field
}

export function ConfirmedGuests() {
  const [guests, setGuests] = useState<ConfirmedGuest[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfirmedGuests() {
      try {
        const q = query(collection(db, "presenceConfirmations"));
        const querySnapshot = await getDocs(q);

        const confirmedGuests: ConfirmedGuest[] = [];
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data() as ConfirmedGuest;
          confirmedGuests.push(data);
          total += data.guestsCount;
        });

        setGuests(confirmedGuests);
        setTotalGuests(total);
      } catch (error) {
        console.error("Error fetching confirmed guests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfirmedGuests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-pink-700 text-center mb-8">
        Presenças Confirmadas
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <p className="text-center text-lg font-medium text-gray-700">
          Total de Convidados Confirmados:
          <span className="text-pink-600 ml-2">{totalGuests}</span>
        </p>
      </div>

      <div className="grid gap-4">
        {guests.map((guest, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            {/* User email */}
            <p className="font-medium text-gray-700">
              {guest.userName} - {guest.userEmail}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Confirmado em:{" "}
              {guest.confirmedAt.toDate().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Guest names */}
            {guest.otherGuests && guest.otherGuests.length > 0 && (
              <ul className="list-disc list-inside text-gray-600 mb-2">
                {guest.otherGuests.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            )}

            {/* Badge with count */}
            <div className="bg-pink-100 text-pink-700 inline-block px-3 py-1 rounded-full font-medium">
              {guest.guestsCount}{" "}
              {guest.guestsCount === 1 ? "pessoa" : "pessoas"}
            </div>
          </div>
        ))}

        {guests.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhuma presença confirmada ainda.
          </p>
        )}
      </div>
    </section>
  );
}
