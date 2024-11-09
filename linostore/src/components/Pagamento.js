import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Pagamento() {
  const { produtos, total } = useCart(); // Obtém os produtos e o total do carrinho
  const navigate = useNavigate();

  const [tipoPagamento, setTipoPagamento] = useState(""); // Define o tipo de pagamento (PIX neste caso)
  const [erro, setErro] = useState("");
  const [qrCodeBase64, setQrCodeBase64] = useState(null); // Estado para armazenar o QR Code

  const handleFinalizarCompra = async () => {
    if (!tipoPagamento) {
      alert("Por favor, selecione um tipo de pagamento.");
      return;
    }

    const body = {
      transaction_amount: total,
      payment_method_id: tipoPagamento, // Seleção do tipo de pagamento, aqui 'pix'
    };

    try {
      // Faz requisição para o backend, que enviará o pagamento para o Mercado Pago
      const response = await fetch("http://192.168.0.105:8080/ServerPrincipal/PagamentoMercadoPago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        const errorData = await response.json(); // Tenta ler a resposta do erro em JSON
        console.error("Erro ao finalizar a compra:", errorData); // Exibe no console para depuração
        throw new Error(errorData.error || "Erro desconhecido ao finalizar a compra.");
      }

      const paymentData = await response.json();
      console.log("Dados do pagamento:", paymentData);

      if (paymentData.qr_code_base64) {
        // Salva o QR Code base64 para exibição
        setQrCodeBase64(paymentData.qr_code_base64);
        alert("Compra finalizada! Escaneie o QR Code exibido para concluir o pagamento.");
      } else {
        alert("Compra finalizada com sucesso!");
      }

      navigate("/"); // Redireciona após a compra
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      alert(`Erro ao finalizar a compra: ${error.message}`);
      setErro("Erro ao finalizar a compra: " + error.message);
    }
  };

  return (
    <div className="pagamento">
      <h2>Resumo do Pedido</h2>
      <h3>Total: R$ {total.toFixed(2)}</h3>

      <h4>Itens no Carrinho:</h4>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <b>{produto.nome}</b> - Quantidade: {produto.quantidade}
          </li>
        ))}
      </ul>

      <h3>Escolha o Tipo de Pagamento</h3>
      <div className="tipoPagamento">
        <label>
          <input
            type="radio"
            value="pix"
            checked={tipoPagamento === "pix"}
            onChange={(e) => setTipoPagamento(e.target.value)}
          />
          PIX
        </label>
      </div>

      <button className="btnPagamento" onClick={handleFinalizarCompra}>
        Finalizar Compra
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* Exibe o QR Code se disponível */}
      {qrCodeBase64 && (
        <div className="qrCode">
          <h3>Escaneie o QR Code para concluir o pagamento:</h3>
          <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code para pagamento PIX" />
        </div>
      )}
    </div>
  );
}
