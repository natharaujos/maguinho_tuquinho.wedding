import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { db } from "../../../firebase";
import { MT_API } from "../../constants/urls";

function PaymentSuccess() {
  const { paymentDocId } = useParams();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<
    "loading" | "approved" | "pending" | "error"
  >("loading");

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");

    const checkPaymentStatus = async () => {
      if (!paymentId || !paymentDocId) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(
          `${MT_API}/api/checkPaymentStatus/?${paymentId}`
        );

        const data = await response.json();

        if (data.status === "approved") {
          await updateDoc(doc(db, "payments", paymentDocId), {
            status: "approved",
            mpPaymentId: paymentId,
          });

          setStatus("approved");
        } else {
          setStatus("pending");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    checkPaymentStatus();
  }, [searchParams, paymentDocId, status]);

  return (
    <div className="text-center py-20 px-4">
      {status === "loading" && <p>Verificando pagamento...</p>}
      {status === "approved" && (
        <>
          <h1 className="text-3xl font-bold mb-4">🎉 Pagamento aprovado!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Obrigado pela sua contribuição.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
          >
            Voltar para a página inicial
          </Link>
        </>
      )}
      {status === "pending" && (
        <>
          <h1 className="text-2xl font-bold text-yellow-600">
            Pagamento em análise
          </h1>
          <p className="text-gray-600 mt-2">
            Aguarde a confirmação do Mercado Pago.
          </p>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">
            Erro ao verificar pagamento
          </h1>
          <p className="text-gray-600 mt-2">
            Verifique seu e-mail ou entre em contato com os noivos.
          </p>
        </>
      )}
    </div>
  );
}

export default PaymentSuccess;
