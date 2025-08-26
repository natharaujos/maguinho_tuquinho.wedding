import { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { checkPaymentStatus } from "../../services/checkPaymentStatus";

interface Payment {
  id?: string;
  amount: number;
  buyerName: string;
  buyerEmail: string;
  createdAt: Timestamp;
  giftId: string;
  giftTitle: string;
  mpPaymentId: string;
  status: "approved" | "pending" | "rejected" | "cancelled" | "error";
}

function AllContributions() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchAndUpdatePayments() {
      try {
        const q = query(collection(db, "payments"));
        const querySnapshot = await getDocs(q);

        const allPayments: Payment[] = [];
        const updatePromises: Promise<void>[] = [];
        let total = 0;

        for (const item of querySnapshot.docs) {
          const data = { ...item.data(), id: item.id } as Payment;
          allPayments.push(data);

          if (data.status === "approved") {
            total += data.amount;
          }

          if (data.mpPaymentId && data.status !== "approved") {
            const statusCheckPromise = async () => {
              try {
                const newStatus = await checkPaymentStatus(data.mpPaymentId);
                if (newStatus !== data.status) {
                  await updateDoc(doc(db, "payments", data?.id || ""), {
                    status: newStatus,
                  });
                  data.status = newStatus;
                  if (newStatus === "approved") {
                    total += data.amount;
                  }
                }
              } catch (error) {
                console.error(
                  `Error checking status for payment ${data.id}:`,
                  error
                );
              }
            };
            updatePromises.push(statusCheckPromise());
          }
        }

        await Promise.all(updatePromises);
        setPayments(
          allPayments.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAndUpdatePayments();
  }, []);

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: Payment["status"]) => {
    const statusMap = {
      approved: "Aprovado",
      pending: "Pendente",
      rejected: "Rejeitado",
      cancelled: "Cancelado",
      error: "Erro",
    };
    return statusMap[status];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-pink-700 text-center mb-8">
        Todos os Presentes
      </h2>

      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Resumo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total de Presentes</p>
            <p className="text-2xl font-bold text-pink-700">
              {payments.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Presentes Aprovados</p>
            <p className="text-2xl font-bold text-green-700">
              {payments.filter((p) => p.status === "approved").length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Valor Total Aprovado</p>
            <p className="text-2xl font-bold text-blue-700">
              R$ {totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row justify-between gap-4"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-700">{payment.giftTitle}</p>
              <p className="text-sm text-gray-500">
                Comprador: {payment.buyerName} ({payment.buyerEmail})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Data:{" "}
                {payment.createdAt.toDate().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-500">
                Valor: R$ {payment.amount.toFixed(2)}
              </p>
            </div>
            <div
              className={`${getStatusColor(
                payment.status
              )} px-3 py-1 rounded-full font-medium self-start sm:self-center`}
            >
              {getStatusText(payment.status)}
            </div>
          </div>
        ))}

        {payments.length === 0 && (
          <p className="text-center text-gray-500">
            Nenhum presente foi comprado ainda.
          </p>
        )}
      </div>
    </section>
  );
}

export default AllContributions;
