import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Gift } from "../store/giftSlice";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";

function GiftCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [gift, setGift] = useState<Gift | null>(null);

  let docRef: DocumentReference<DocumentData>;

  useEffect(() => {
    const getGiftDetails = async () => {
      if (id) {
        const giftDoc = await getDoc(doc(db, "gifts", id));
        const giftData = giftDoc.data();
        setGift(giftData as Gift);
      }
    };

    getGiftDetails();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    if (!buyerName.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }
    setLoading(true);
    try {
      const paymentRecord = {
        giftId: id,
        giftTitle: gift?.title,
        buyerName,
        amount: gift?.price,
        mpPaymentId: "",
        status: "pending",
        createdAt: new Date(),
      };
      const response = await addDoc(collection(db, "payments"), paymentRecord);
      docRef = response;
    } catch (error) {
      console.error(error);
      alert(
        `Erro ao iniciar sessão de pagamento. Entre em contato com os noivos.`
      );
    } finally {
      setLoading(false);
    }

    if (gift) {
      navigate(`/gift/${id}/options`, {
        state: {
          docRefId: docRef.id,
          giftTitle: gift.title,
          giftPrice: gift.price,
          buyerName,
        },
      });
    }
    setLoading(false);
  };

  if (!gift) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700 font-medium">
          Presente não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <img
        src={gift.image}
        alt={gift.title}
        className="w-50 rounded-md mb-6 mx-auto"
      />
      <h2 className="text-2xl font-bold">{gift.title}</h2>
      <p className="text-lg text-gray-600 mb-4">R$ {gift.price.toFixed(2)}</p>

      <input
        type="text"
        placeholder="Seu nome"
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
        className="border border-gray-300 px-4 py-2 w-full rounded-md mb-4"
        required
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition disabled:opacity-50"
      >
        {loading ? "Redirecionando..." : "Contribuir com este presente"}
      </button>
    </div>
  );
}

export default GiftCheckout;
