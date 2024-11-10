import { Link, useNavigate } from "react-router-dom";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { usePesquisa } from "./PesquisaContext";

export default function Sessaoexclusiva() {
  const { setSearchTerm } = usePesquisa();
  const navigate = useNavigate();

  const handleVerAgoraClick = () => {
    setSearchTerm("KIT RELACAO JET 50");  // Define o termo de pesquisa
    navigate("/Produto");  // Redireciona para a página de produtos
  };

  return (
    <div className="sessao-exclusiva">
      <div className="page-inner-content">
        <div className="content">
          <div className="left-side">
            <h2>Promoção do dia!</h2>
            <p>"Imperdível não perca essa oferta"</p>
            <Link to="#" onClick={handleVerAgoraClick} className="btnveragora1">
              <span>Ver Agora</span>
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </Link>
          </div>
          <div className="right-side">
            <img src="/images/Exclusive4.png" alt="NAO PERCA" />
          </div>
        </div>
      </div>
    </div>
  );
}
