import React from "react";

const CostoEnvio = (props) => {
  return (
    <section className="costoEnvio">
      <h4>Costo de envío</h4>
      <div className="container-botones-enviarCantidad">
        <button value="gratis" onClick={props.clickItemCostoEnvioGratis}>
          Gratis
        </button>
        <button
          className="lead"
          value="gratis"
          onClick={props.clickItemCostoEnvioGratis}
        >
          ({props.longitudCostoEnvio})
        </button>
      </div>
    </section>
  );
};

export default CostoEnvio;
