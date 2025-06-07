import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { db } from "../../../firebase";

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
          `https://api.mercadopago.com/v1/payments/${paymentId}`,
          {
            headers: {
              Authorization: `Bearer SEU_ACCESS_TOKEN_AQUI`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "approved") {
          await updateDoc(doc(db, "payments", paymentDocId), {
            status: "approved",
            mpPaymentId: paymentId,
          });

          setStatus("approved");
        } else {
          setStatus("pending"); // pode ser rejected, in_process etc
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    checkPaymentStatus();
  }, [searchParams, paymentDocId]);

  return (
    <div className="text-center py-20 px-4">
      {status === "loading" && <p>Verificando pagamento...</p>}
      {status === "approved" && (
        <>
          <h1 className="text-3xl font-bold mb-4">🎉 Pagamento aprovado!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Obrigado pela sua contribuição.
          </p>
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

      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default PaymentSuccess;
