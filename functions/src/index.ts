/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import functions from "firebase-functions";
import axios from "axios";
import cors from "cors";

const MERCADO_PAGO_ACCESS_TOKEN = "SEU_ACCESS_TOKEN_SECRET"; // NUNCA use no front!

const processPayment = functions.https.onRequest((req, res) => {
  cors()(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Método não permitido");
      return;
    }

    const {
      token,
      transactionAmount,
      description,
      installments,
      paymentMethodId,
      payer,
    } = req.body;

    try {
      const response = await axios.post(
        "https://api.mercadopago.com/v1/payments",
        {
          token,
          transaction_amount: Number(transactionAmount),
          description,
          installments,
          payment_method_id: paymentMethodId,
          payer,
        },
        {
          headers: {
            Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        console.error((error as any).response?.data || (error as any).message);
      } else {
        console.error(error);
      }
      res.status(500).json({ error: "Erro ao processar pagamento" });
    }
  });
});

export default processPayment;
