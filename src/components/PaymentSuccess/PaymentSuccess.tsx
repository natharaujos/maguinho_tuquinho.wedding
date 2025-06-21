import { doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../../firebase'
import { checkPaymentStatus } from '../../services/checkPaymentStatus'

const validStatuses = ['approved', 'pending', 'rejected', 'cancelled'] as const
type ValidStatus = (typeof validStatuses)[number]
type PaymentStatus = ValidStatus | 'loading' | 'error'

function PaymentSuccess() {
  const { paymentDocId } = useParams()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<PaymentStatus>('loading')

  useEffect(() => {
    const paymentIdFromSearch = searchParams.get('payment_id')
    const fallbackStatus = searchParams.get('payment_status')

    const check = async () => {
      if (!paymentDocId) {
        setStatus('error')
        return
      }

      if (fallbackStatus && validStatuses.includes(fallbackStatus as any)) {
        if (fallbackStatus === 'approved') {
          await updateDoc(doc(db, 'payments', paymentDocId), {
            status: 'approved',
            mpPaymentId: paymentIdFromSearch || '',
          })
        }
        setStatus(fallbackStatus as PaymentStatus)
        return
      }

      const result = await checkPaymentStatus(paymentDocId)

      if (validStatuses.includes(result as any)) {
        if (result === 'approved') {
          await updateDoc(doc(db, 'payments', paymentDocId), {
            status: 'approved',
            mpPaymentId: paymentIdFromSearch || '',
          })
        }
        setStatus(result as PaymentStatus)
      } else {
        setStatus('error')
      }
    }

    check()
  }, [paymentDocId, searchParams])

  return (
    <div className="text-center py-20 px-4">
      {status === 'loading' && <p>Verificando pagamento...</p>}

      {status === 'approved' && (
        <>
          <h1 className="text-3xl font-bold mb-4">🎉 Pagamento aprovado!</h1>
          <p className="text-lg text-gray-600 mb-6">Obrigado pela sua contribuição.</p>
        </>
      )}

      {status === 'pending' && (
        <>
          <h1 className="text-2xl font-bold text-yellow-600">Pagamento em análise</h1>
          <p className="text-gray-600 mt-2">Aguarde a confirmação do Mercado Pago.</p>
        </>
      )}

      {status === 'rejected' && (
        <>
          <h1 className="text-2xl font-bold text-red-600">Pagamento recusado</h1>
          <p className="text-gray-600 mt-2">
            O pagamento foi recusado. Verifique os dados e tente novamente.
          </p>
        </>
      )}

      {status === 'cancelled' && (
        <>
          <h1 className="text-2xl font-bold text-gray-700">Pagamento cancelado</h1>
          <p className="text-gray-600 mt-2">
            O pagamento foi cancelado. Você pode tentar novamente se desejar.
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <h1 className="text-2xl font-bold text-red-600">Erro ao verificar pagamento</h1>
          <p className="text-gray-600 mt-2">
            Verifique seu e-mail ou entre em contato com os noivos.
          </p>
        </>
      )}

      {validStatuses.includes(status as ValidStatus) && (
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
        >
          Voltar para a página inicial
        </Link>
      )}
    </div>
  )
}

export default PaymentSuccess
