import React, { useState } from "react";

import Filters from "./Filters";
import Condition from "./Condition";
import MainSearch from "./tiposBusquedas/MainSearch";
import SearchNewProducts from "./tiposBusquedas/SearchNewProducts";
import SearchUsedProducts from "./tiposBusquedas/SearchUsedProducts";
import CostoEnvio from "./CostoEnvio";
import ProdCostoEnvioGratis from "./tiposBusquedas/ProdCostoEnvioGratis";

const Search = () => {
  const [producto, setProducto] = useState("");
  const [arrayProductos, setArrayProductos] = useState([]);

  const [sortRelevance, setSortRelevance] = useState();
  const [arrayAvailableSorts, setArrayAvailableSorts] = useState([]);
  const [conditionProduct, setConditionProduct] = useState("");

  const [arrayFiltradoProdNuevo, setArrayFiltradoProdNuevo] = useState([]);
  const [arrayFiltradoProdUsado, setArrayFiltradoProdUsado] = useState([]);
  const [arrayFiltradoCostoEnvioGratis, setArrayFiltradoCostoEnvioGratis] =
    useState([]);

  const [relevante, setRelevante] = useState(false);
  const [menorPrecio, setMenorPrecio] = useState(false);
  const [mayorPrecio, setMayorPrecio] = useState(false);

  const [activeMainSearch, setActiveMainSearch] = useState(false);

  const [activeArrayNewProduct, setActiveArrayNewProduct] = useState(false);
  const [activeArrayUsedProduct, setActiveArrayUsedProduct] = useState(false);
  const [activeArrayEnvioGratis, setActiveArrayEnvioGratis] = useState(false);

  const APImeliSearch = `https://api.mercadolibre.com/sites/MLA/search?q=${producto}`;

  const obtenerDatosAPI = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(APImeliSearch);
      const data = await res.json();

      const arrayData = data.results.map((item) => ({
        id: item.id,
        imgProduct: item.thumbnail,
        titleProduct: item.title,
        priceProduct: item.price,
        currencyID: item.currency_id,
        cantCuotas: item.installments.quantity,
        montoCuota: item.installments.amount,
        cantDisponible: item.available_quantity,
        cantVendidos: item.sold_quantity,
        permalink: item.permalink,
        envioProducto: item.shipping.free_shipping,
        productCondition: item.condition,
      }));

      console.log(`Array data: ${arrayData.length}`);

      setArrayProductos(arrayData);

      console.log(
        `Array buscado: ${arrayProductos} \n Longitud array productos: ${arrayProductos.length}`
      );

      setActiveMainSearch(!false);

      setSortRelevance(data.sort);
      setArrayAvailableSorts(data.available_sorts);
      setConditionProduct(data.results.condition);
      setRelevante(false);
      setMenorPrecio(false);
      setMayorPrecio(false);

      const longitudNuevosProductos = arrayData
        .map((item) => item)
        .filter((prod) => prod.productCondition === "new");
      setArrayFiltradoProdNuevo(longitudNuevosProductos);

      const longitudUsadosProductos = arrayData
        .map((item) => item)
        .filter((prod) => prod.productCondition === "used");
      setArrayFiltradoProdUsado(longitudUsadosProductos);

      const longitudCostoEnvioGratis = arrayData
        .map((item) => item)
        .filter((item) => item.envioProducto === true);
      setArrayFiltradoCostoEnvioGratis(longitudCostoEnvioGratis);
    } catch (error) {
      console.log(error);
    }
  };

  const manipularAvailable = (e) => {
    console.log(e.target.value);
    e.preventDefault();

    if (e.target.value === "relevance") {
      console.log("Precio más relevante? TRUE");
      setRelevante(!false);

      setMenorPrecio(false);
      setMayorPrecio(false);
    }

    if (e.target.value === "price_asc") {
      console.log("Precio ascendente? TRUE");

      const arrayPrecios = arrayProductos
        .map((item) => item)
        .sort((a, b) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayProductos(arrayPrecios);

      const filtradoProdNuevos = arrayFiltradoProdNuevo
        .map((item) => item)
        .sort((a, b) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoProdNuevo(filtradoProdNuevos);

      const filtradoProdUsados = arrayFiltradoProdUsado
        .map((item) => item)
        .sort((a, b) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoProdUsado(filtradoProdUsados);

      const filtradoEnvioGratis = arrayFiltradoCostoEnvioGratis
        .map((item) => item)
        .sort((a, b) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoCostoEnvioGratis(filtradoEnvioGratis);

      setMenorPrecio(!false);
      setMayorPrecio(false);
      setRelevante(false);
    }

    console.log(
      "nuevo array ordenado ascendente: \n" +
        arrayProductos +
        "\n Longitud: " +
        arrayProductos.length
    );

    if (e.target.value === "price_desc") {
      console.log("Precio descendente? TRUE");

      const arrayPrecios = arrayProductos
        .map((item) => item)
        .sort((b, a) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayProductos(arrayPrecios);

      const filtradoProdNuevos = arrayFiltradoProdNuevo
        .map((item) => item)
        .sort((b, a) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoProdNuevo(filtradoProdNuevos);

      const filtradoProdUsados = arrayFiltradoProdUsado
        .map((item) => item)
        .sort((b, a) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoProdUsado(filtradoProdUsados);

      const filtradoEnvioGratis = arrayFiltradoCostoEnvioGratis
        .map((item) => item)
        .sort((b, a) => {
          if (a.priceProduct < b.priceProduct) {
            return -1;
          }

          if (a.priceProduct > b.priceProduct) {
            return 1;
          }

          return 0;
        });
      setArrayFiltradoCostoEnvioGratis(filtradoEnvioGratis);

      setMayorPrecio(!false);

      setMenorPrecio(false);
      setRelevante(false);

      console.log(
        "nuevo array ordenado descendente: \n" +
          arrayProductos +
          "\n Longitud: " +
          arrayProductos.length
      );
    }
  };

  const handleConditionProduts = (e) => {
    console.log("CONDITION PRODUCT: " + e.target.value);
    if (e.target.value === "new") {
      setActiveMainSearch(false);
      setActiveArrayUsedProduct(false);
      setActiveArrayEnvioGratis(false);

      console.log("Hiciste click en el item NUEVO");
      setActiveArrayNewProduct(!false);

      console.log(
        `LONGITUD array productos NUEVOS: ${arrayFiltradoProdNuevo.length}`
      );
    }

    if (e.target.value === "used") {
      setActiveMainSearch(false);
      setActiveArrayNewProduct(false);
      setActiveArrayEnvioGratis(false);

      console.log("Hiciste click en el item USADO");
      setActiveArrayUsedProduct(!false);

      console.log(
        `LONGITUD array productos USADOS: ${arrayFiltradoProdUsado.length}`
      );
    }
  };

  const handleCostoEnvioGratis = (e) => {
    if (e.target.value === "gratis") {
      setActiveMainSearch(false);
      setActiveArrayNewProduct(false);
      setActiveArrayUsedProduct(false);

      setActiveArrayEnvioGratis(!false);

      console.log(
        `LONGITUD array productos envio gratis ${arrayFiltradoCostoEnvioGratis.length}`
      );
    }
  };

  return (
    <div>
      <section className="section-formulario d-flex justify-content-center">
        <form className="d-flex align-items-center justify-content-center">
          <h2 className="title-APImeli">API - Meli</h2>
          <input
            type="text"
            placeholder="Buscar producto, marcas y más..."
            className="form-control rounded-0"
            onChange={(e) => setProducto(e.target.value)}
            value={producto}
          />
          <button
            className="button-search btn btn-sm rounded-0"
            type="submit"
            style={{ position: "relative", top: 0 }}
            onClick={(e) => obtenerDatosAPI(e)}
          >
            <i className="fa-solid fa-magnifying-glass text-secondary"></i>
          </button>
        </form>
      </section>
      <div className="container__condition-section-producto">
        {arrayProductos.length > 0 ? (
          <div className="container-filtrosCondicion">
            <Condition
              newProduct={arrayFiltradoProdNuevo.length}
              usedProduct={arrayFiltradoProdUsado.length}
              clickItemConditionProduct={(e) => handleConditionProduts(e)}
            />
            <CostoEnvio
              longitudCostoEnvio={arrayFiltradoCostoEnvioGratis.length}
              clickItemCostoEnvioGratis={(e) => handleCostoEnvioGratis(e)}
            />
          </div>
        ) : null}
        <section className="section-producto mt-5 pt-2">
          {arrayProductos.length ||
          arrayFiltradoProdNuevo.length ||
          arrayFiltradoProdUsado.length ||
          arrayFiltradoCostoEnvioGratis.length > 0 ? (
            <Filters
              APIsearchAvailableSorts={arrayAvailableSorts}
              APIsearchSort={sortRelevance}
              handleAvailable={(e) => manipularAvailable(e)}
              relevantProps={relevante}
              lowerPriceProps={menorPrecio}
              higherPriceProps={mayorPrecio}
            />
          ) : null}
          <ul>
            {activeMainSearch ? (
              <MainSearch arrayBusqPrincipal={arrayProductos} />
            ) : activeArrayNewProduct ? (
              <SearchNewProducts
                arrayProductosNuevos={arrayFiltradoProdNuevo}
              />
            ) : activeArrayUsedProduct ? (
              <SearchUsedProducts
                arrayProductosUsados={arrayFiltradoProdUsado}
              />
            ) : activeArrayEnvioGratis ? (
              <ProdCostoEnvioGratis
                arrayProductosEnvioGratis={arrayFiltradoCostoEnvioGratis}
              />
            ) : null}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Search;
