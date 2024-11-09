import React from "react";

export default function Rodape() {
  return (
    <footer>
      <div className="pager-inner-content">
        <div className="download-options">
          <p>Está com dúvida? Entre em contato com Suporte</p>
          {/* Link para o WhatsApp */}
        <a
          href="https://api.whatsapp.com/send?phone=62996891421&text=Preciso%20de%20suporte"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/whatsapp.png" alt="WhatsApp" />
        </a>  
          <p>Nos siga no Instagram e fique por dentro das novidades</p>
                   {/* Link para o Instagram */}
        <a
          href="https://www.instagram.com/riajjy_distribuidora/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/Instagram.png" alt="Instagram" />
        </a>
        </div>

       


        <div>
          <div className="logo-footer">
          <h1 className="logo">
           RIAJJY<span>DISTRIBUIDORA</span>
            </h1>
            <p>
            Agradecemos pela confiança em nossa distribuidora de peças para motos.
            É uma honra contribuir para o sucesso de sua empresa e o desempenho de veículos que levam qualidade e segurança a tantas pessoas. Comprometidos com excelência e inovação, seguimos à disposição para atender suas necessidades e oferecer o melhor suporte.
            Conte sempre com nossa dedicação e parceria para garantir produtos de alta qualidade e um serviço em que você pode confiar. 
            Obrigado por fazer parte de nossa jornada!
            </p>
            </div>
            <hr/>
            <p className="copyright">
             Copyright 2030 - RIAJJY DISTRIBUIDORA - Todos Direitos Reservados 
            </p>
        </div>
      </div>
    </footer>
  );
}
