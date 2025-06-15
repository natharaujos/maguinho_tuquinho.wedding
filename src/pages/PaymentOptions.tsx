import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MT_API } from "../constants/urls";

export type LocationState = {
  docRefId: string;
  giftTitle: string;
  giftPrice: number;
  buyerName: string;
};

export default function PaymentOptions() {
  const { state } = useLocation();
  const { docRefId, giftTitle, giftPrice, buyerName } = state as LocationState;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handlePix = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${MT_API}/api/createPreferencePix`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          external_reference: docRefId,
          items: [
            {
              title: giftTitle,
              quantity: 1,
              currency_id: "BRL",
              unit_price: giftPrice,
            },
          ],
          payer: { name: buyerName },
          payment_method_id: "pix",
        }),
      });
      const data = await res.json();

      navigate("/pix-checkout", {
        state: {
          qrCode: data.point_of_interaction.transaction_data.qr_code,
          initPoint: data.init_point,
          docRefId,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar preferência PIX");
      setLoading(false);
    }
  };

  const chooseCredit = () => {
    // navigate to a CreditCardForm page, passing the same state
    navigate(`/gift/${docRefId}/card`, { state });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Como você deseja pagar?</h2>
        <p className="mb-6">
          <strong>{giftTitle}</strong> — R$ {giftPrice.toFixed(2)}
        </p>
        <button
          onClick={handlePix}
          disabled={loading}
          className="w-full mb-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Aguarde…" : "Pagar com PIX"}
        </button>
        <button
          onClick={chooseCredit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Pagar com Cartão de Crédito
        </button>
      </div>
    </div>
  );
}
