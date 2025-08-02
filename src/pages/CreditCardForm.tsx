import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { LocationState } from "./PaymentOptions";
import { IMaskInput } from "react-imask";

const TEST_KEY = "";

interface FormData {
  cardNumber: string;
  cardholderName: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  cpf: string;
  email: string;
}

const schema = yup
  .object({
    cardNumber: yup
      .string()
      .required("Número do cartão é obrigatório")
      .matches(/^\d{13,19}$/, "Número do cartão inválido."),
    cardholderName: yup
      .string()
      .required("Nome no cartão é obrigatório")
      .min(3, "Nome muito curto. Informe seu nome completo."),
    expMonth: yup
      .string()
      .required("Mês de validade é obrigatório")
      .matches(
        /^(0[1-9]|1[0-2])$/,
        "Mês inválido. Informe um valor entre 01 e 12."
      ),
    expYear: yup
      .string()
      .required("Ano de validade é obrigatório")
      .matches(
        /^\d{4}$/,
        "Ano inválido. Informe o ano com 4 dígitos, ex: 2025."
      )
      .test(
        "year-valid",
        "Ano deve ser igual ou maior que o ano atual.",
        (val) => val !== undefined && Number(val) >= new Date().getFullYear()
      ),
    cvv: yup
      .string()
      .required("CVV é obrigatório")
      .matches(
        /^\d{3,4}$/,
        "CVV inválido. Informe 3 ou 4 números encontrados no verso do cartão."
      ),
    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .matches(
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        "CPF inválido. Informe no formato 000.000.000-00."
      ),
    email: yup
      .string()
      .required("Email é obrigatório")
      .email("Email inválido. Informe um endereço de email válido."),
  })
  .required();

export default function CreditCardForm() {
  const { state } = useLocation();
  const { docRefId, giftTitle, giftPrice, buyerName } = state as LocationState;
  const navigate = useNavigate();

  const [mp, setMp] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (window.MercadoPago) {
      const mpInstance = new window.MercadoPago(TEST_KEY!, {
        locale: "pt-BR" as any,
      });
      setMp(mpInstance);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!mp) return;

    setLoading(true);
    setError(null);

    try {
      // Remove máscara do CPF antes de enviar
      const cpfNumber = data.cpf.replace(/\D/g, "");

      // Gerar token
      const cardData = {
        cardNumber: data.cardNumber,
        cardholderName: data.cardholderName,
        cardExpirationMonth: data.expMonth,
        cardExpirationYear: data.expYear,
        securityCode: data.cvv,
        identificationType: "CPF",
        identificationNumber: cpfNumber,
      };
      const result = await mp.cardToken.create(cardData);

      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Falha ao gerar token");
      }
      const token = result.body.id;

      const res = await fetch(
        "https://mt-backend.vercel.app/api/processPayment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            transactionAmount: giftPrice,
            description: giftTitle,
            installments: 1,
            paymentMethodId: result.body.payment_method_id,
            payer: {
              name: buyerName,
              email: data.email,
              identification: { type: "CPF", number: cpfNumber },
            },
            external_reference: docRefId,
          }),
        }
      );
      const responseData = await res.json();
      if (responseData.status === "approved") {
        navigate(`/success/${docRefId}`);
      } else {
        throw new Error(`Status: ${responseData.status}`);
      }
    } catch {
      setError("Erro no pagamento");
    } finally {
      setLoading(false);
    }
  };

  const baseInputClass =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 transition";

  const errorInputClass = "border-red-500";

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="max-w-md mx-auto my-auto p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Pagamento com Cartão
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              {...register("cardNumber")}
              placeholder="Número do cartão"
              maxLength={19}
              className={`${baseInputClass}  ${
                errors.cardNumber ? errorInputClass : "border-gray-300"
              }`}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
              {errors.cardNumber ? errors.cardNumber.message : ""}
            </p>
          </div>

          <div>
            <input
              {...register("cardholderName")}
              placeholder="Nome no cartão"
              className={`${baseInputClass} ${
                errors.cardholderName ? errorInputClass : "border-gray-300"
              }`}
              type="text"
              autoComplete="cc-name"
            />
            <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
              {errors.cardholderName ? errors.cardholderName.message : ""}
            </p>
          </div>

          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                {...register("expMonth")}
                placeholder="Mês (MM)"
                maxLength={2}
                className={`${baseInputClass} ${
                  errors.expMonth ? errorInputClass : "border-gray-300"
                }`}
                type="text"
                inputMode="numeric"
              />
              <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
                {errors.expMonth ? errors.expMonth.message : ""}
              </p>
            </div>

            <div className="flex-1">
              <input
                {...register("expYear")}
                placeholder="Ano (YYYY)"
                maxLength={4}
                className={`${baseInputClass} ${
                  errors.expYear ? errorInputClass : "border-gray-300"
                }`}
                type="text"
                inputMode="numeric"
              />
              <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
                {errors.expYear ? errors.expYear.message : ""}
              </p>
            </div>
          </div>

          <div>
            <input
              {...register("cvv")}
              placeholder="CVV"
              maxLength={4}
              className={`${baseInputClass} ${
                errors.cvv ? errorInputClass : "border-gray-300"
              }`}
              type="password"
              inputMode="numeric"
            />
            <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
              {errors.cvv ? errors.cvv.message : ""}
            </p>
          </div>

          <div>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000.000.000-00"
                  placeholder="CPF do titular"
                  className={`${baseInputClass} ${
                    errors.cpf ? errorInputClass : "border-gray-300"
                  }`}
                  onAccept={(value: any) => field.onChange(value)}
                />
              )}
            />
            <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
              {errors.cpf ? errors.cpf.message : ""}
            </p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Seu e‑mail"
              className={`${baseInputClass} ${
                errors.email ? errorInputClass : "border-gray-300"
              }`}
              type="email"
              autoComplete="email"
            />
            <p className="text-red-600 text-sm mt-1 min-h-[1.5rem]">
              {errors.email?.message}
            </p>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? "Processando…" : `Pagar R$ ${giftPrice.toFixed(2)}`}
          </button>

          {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
