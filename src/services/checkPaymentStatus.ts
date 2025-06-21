export async function checkPaymentStatus(
  paymentId: string
): Promise<'approved' | 'rejected' | 'cancelled' | 'pending' | 'error'> {
  try {
    const res = await fetch(`/api/checkPaymentStatus?paymentId=${paymentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) throw new Error('Request failed')

    const responseData = await res.json()

    return responseData
  } catch (err) {
    console.error('Erro ao checar status de pagamento', err)
    return 'error'
  }
}
