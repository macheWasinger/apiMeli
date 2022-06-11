import React from "react";

const MainSearch = (props) => {
  const conversorMoneda = (valor, moneda) => {
    return Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: moneda,
    }).format(valor);
  };

  return (
    <div>
      {props.arrayBusqPrincipal.map((item) => (
        <li className="border-bottom pl-3" key={item.id}>
          <div className="container-product p-3 text-center">
            <article className="container-imgProducto">
              <a href={item.permalink} target="_blank">
                <img src={item.imgProduct} alt="" width="160" height="160" />
              </a>
            </article>

            <article className="container_info-product pt-2">
              <a
                href={item.permalink}
                target="_blank"
                className="title-product"
                title={item.titleProduct}
              >
                <h2 className="lead">{item.titleProduct}</h2>
              </a>
              <p className="price-product h4">
                {conversorMoneda(item.priceProduct, item.currencyID)}
              </p>
              <p className="cuotasProducto lead">
                Hasta {item.cantCuotas} cuotas
              </p>
              {item.envioProducto ? (
                <p className="envio-producto">Envío gratis</p>
              ) : null}
              <p className="product-condition">
                {item.productCondition === "new"
                  ? "Nuevo"
                  : item.productCondition === "used"
                  ? "Usado"
                  : ""}
              </p>
            </article>
          </div>
        </li>
      ))}
    </div>
  );
};

export default MainSearch;
