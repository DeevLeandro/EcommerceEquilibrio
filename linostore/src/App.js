import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";
import HomePage from "./components/pages/HomePage";
import Produtopagina from "./components/pages/Produtopagina";
import Pagamento from "./components/Pagamento"; 
import Login from "./components/Login";  // Importação da página de Login
import Registro from "./components/Registro"; // Importe o componente de Registro
import { CartProvider } from "./components/CartContext";
import { PesquisaProvider, usePesquisa } from "./components/PesquisaContext";
import axios from "axios";
import Loading from "./components/Loading"; 

function App() {
  const [produto, setProduto] = useState([]);
  const [erro, setErro] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);
  
  return (
    <CartProvider>
      <PesquisaProvider>
        <Router>
          <div className="App">
            <Navbar /> 
            <MainContent 
              produto={produto} 
              setProduto={setProduto} 
              erro={erro} 
              setErro={setErro} 
              pagina={pagina} 
              setPagina={setPagina} 
              loading={loading}
              setLoading={setLoading}
            />
            <Rodape />
          </div>
        </Router>
      </PesquisaProvider>
    </CartProvider>
  );
}

function MainContent({ produto, setProduto, erro, setErro, pagina, setPagina, loading, setLoading }) {
  const location = useLocation();
  const { searchTerm } = usePesquisa();
  const [limite, setLimite] = useState("4");

  useEffect(() => {
    const novoLimite = searchTerm ? "" : (location.pathname === "/" ? "4" : "12");
    setLimite(novoLimite);
    setLoading(true);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://equilibrioapperp.pontalsistemas.com.br/serverecommerce/PesqProduto',
      headers: {
        'X-Embarcadero-App-Secret': 'DE1BA56B-43C5-469D-9BD2-4EB146EB8473',
        'Content-Type': 'application/json'
      },
      params: {
        Token: "6AOIUZP6AS9I43YPMDVS",
        Grupo: "260",
        Empresa: "564",
        TipoPesquisa: "G",
        Campo: "",
        Valor: searchTerm,
        limite: novoLimite,
        Paginacao: pagina,
      }
    };

    axios.request(config)
      .then((response) => {
        console.log("Resposta da API:", response.data);
        setProduto(response.data.produtos || response.data);
        setErro(null);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setErro(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pagina, location.pathname, searchTerm]);

  const handleProximaPagina = () => setPagina((prev) => prev + 1);
  const handlePaginaAnterior = () => setPagina((prev) => Math.max(prev - 1, 1));

  return (
    <main>
      {loading ? <Loading /> : null} 
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              produto={produto} 
              erro={erro} 
              limite={limite} 
            />
          }
        />
        <Route 
          path="/Produto" 
          element={
            <Produtopagina                
              produto={produto} 
              erro={erro} 
              pagina={pagina} 
              handleProximaPagina={handleProximaPagina} 
              handlePaginaAnterior={handlePaginaAnterior} 
            />} 
        />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="/registro" element={<Registro />} /> {/* Rota para a página de registro */}
      </Routes> 
    </main>
  );
}

export default App;
