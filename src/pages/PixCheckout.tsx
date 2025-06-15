import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export default function PixCheckout() {
  const { state } = useLocation();
  const { qrCode, initPoint } = state as { qrCode: string; initPoint: string };

  if (!qrCode) {
    return <p>QR Code não disponível.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Escaneie o QR Code com seu app de banco
      </h2>
      {/* Exibe o QR Code como texto (código PIX) para apps que escaneiam a string */}
      <pre className="bg-gray-100 p-4 rounded mb-4 break-words">{qrCode}</pre>

      {/* Você pode usar um gerador de QR code para transformar a string em imagem */}
      <QRCodeSVG value={qrCode} size={250} />

      <p className="mt-4 text-sm text-gray-700">
        Ou clique no botão abaixo para abrir a página oficial de pagamento do
        Mercado Pago.
      </p>
      <a
        href={initPoint}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Abrir página de pagamento
      </a>
    </div>
  );
}
