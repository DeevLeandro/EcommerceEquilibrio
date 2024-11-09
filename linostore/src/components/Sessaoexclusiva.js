import { Link } from "react-router-dom"; 
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Sessaoexclusiva() {
  return (
    <div className="sessao-exclusiva">
      <div className="page-inner-content">
        <div className="content">
          <div className="left-side">

            <h2>Promoção do dia!</h2>
            <p>"Imperdível não perca essa oferta"</p>
            <Link to="/produtos" className="btnveragora1">
              <span>Ver Agora</span>
              <FontAwesomeIcon icon={faChevronCircleRight} />
            </Link>
          </div>
          <div className="right-side">
            <img src="/images/Exclusive2.png" alt="NAO PERCA" />
          </div>
        </div>
      </div>
    </div>
  );
}