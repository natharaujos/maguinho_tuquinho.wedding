import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { Gift } from "../../store/giftSlice";

function GiftCheckout() {
  const { id } = useParams();
  const gifts = useSelector((state: RootState) => state.gifts.gifts);
  const currentGift = gifts.find((gift) => gift.id === Number(id));

  const giftRef = useRef<Gift>(currentGift);

  const [buyerName, setBuyerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!buyerName.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer SEU_ACCESS_TOKEN_AQUI",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                title: currentGift?.title,
                quantity: 1,
                currency_id: "BRL",
                unit_price: currentGift?.price,
              },
            ],
            payer: {
              name: buyerName,
            },
            back_urls: {
              success: window.location.origin + "/success",
              failure: window.location.origin + "/fail",
            },
            auto_return: "approved",
          }),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point; // redireciona para pagamento
      } else {
        alert("Erro ao iniciar o pagamento.");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      alert("Erro na conexão com o Mercado Pago.");
    } finally {
      setLoading(false);
    }
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
