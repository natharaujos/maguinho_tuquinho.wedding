import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Gift } from "../store/giftSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

function GiftCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const gifts = useSelector((state: RootState) => state.gifts.gifts);
  const currentGift = gifts.find((gift) => gift.id === Number(id));

  const giftRef = useRef<Gift>(currentGift);

  const [buyerName, setBuyerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    if (!buyerName.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }
    setLoading(true);
    try {
      const paymentRecord = {
        giftId: currentGift?.id,
        giftTitle: currentGift?.title,
        buyerName,
        amount: currentGift?.price,
        mpPaymentId: "",
        status: "pending",
        createdAt: new Date(),
      };
      await addDoc(collection(db, "payments"), paymentRecord);
    } catch (error) {
      console.error(error);
      alert("Erro na conexão com o banco de dados.");
    } finally {
      setLoading(false);
    }

    if (currentGift) {
      navigate(`/gift/${id}/options`, {
        state: {
          docRefId: id,
          giftTitle: currentGift.title,
          giftPrice: currentGift.price,
          buyerName,
        },
      });
    }
    setLoading(false);
  };

  if (!giftRef.current) return <p>Presente não encontrado.</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <img
        src={giftRef.current.image}
        alt={giftRef.current.title}
        className="w-50 rounded-md mb-6 mx-auto"
      />
      <h2 className="text-2xl font-bold">{giftRef.current.title}</h2>
      <p className="text-lg text-gray-600 mb-4">
        R$ {giftRef.current.price.toFixed(2)}
      </p>

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
