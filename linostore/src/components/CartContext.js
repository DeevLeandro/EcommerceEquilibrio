import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);

  const calcularTotal = (produtos) => {
    const novoTotal = produtos.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    console.log("Novo total calculado:", novoTotal); // Debugging
    setTotal(novoTotal);
  };

  const adicionarAoCarrinho = (produto) => {
    setProdutos((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find((item) => item.id === produto.id);
      
      let novoCarrinho;
      if (produtoExistente) {
        novoCarrinho = carrinhoAtual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        novoCarrinho = [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }

      calcularTotal(novoCarrinho);
      return novoCarrinho;
    });
  };

  const removerDoCarrinho = (id) => {
    setProdutos((carrinhoAtual) => {
      const novoCarrinho = carrinhoAtual.filter((item) => item.id !== id);
      calcularTotal(novoCarrinho);
      return novoCarrinho;
    });
  };

  const atualizarQuantidade = (id, quantidade) => {
    setProdutos((carrinhoAtual) => {
      const novoCarrinho = carrinhoAtual.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      );
      calcularTotal(novoCarrinho);
      return novoCarrinho;
    });
  };

  return (
    <CartContext.Provider value={{ produtos, total, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade }}>
      {children}
    </CartContext.Provider>
  );
}
