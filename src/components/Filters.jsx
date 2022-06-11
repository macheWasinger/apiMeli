import React, { useState } from "react";

const Filters = (props) => {
  const [activarSectionDesplegable, setActivarSectionDesplegable] =
    useState(false);

  const [hideMenu, setHideMenu] = useState(true);

  const [cont, setCont] = useState(0);

  const menuSectionDesplegar = () => {
    setCont(cont + 1);

    if (cont % 2 == 0) {
      setActivarSectionDesplegable(!false);
      setHideMenu(!true);
    } else {
      setActivarSectionDesplegable(false);
    }

    console.log(cont);
  };

  const esconderMenuDesplegable = () => {
    setHideMenu(true);
    setActivarSectionDesplegable(false);
    setCont(cont - 1);
  };

  return (
    <div className="main-container-Filters">
      <section className="text-ordenar__select d-flex mt-4 mb-2">
        <p
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginRight: "0.7vw",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          Ordenar por
        </p>

        <p
          className="text-options"
          style={{ fontSize: "14px", cursor: "pointer" }}
          onClick={() => menuSectionDesplegar()}
        >
          {props.relevantProps === false &&
          props.lowerPriceProps === false &&
          props.higherPriceProps === false
            ? "Más relevantes"
            : props.relevantProps
            ? "Más relevantes"
            : props.lowerPriceProps
            ? "Menor precio"
            : props.higherPriceProps
            ? "Mayor precio"
            : ""}
        </p>

        <i
          style={{ cursor: "pointer" }}
          onClick={() => menuSectionDesplegar()}
          className={`fa-solid fa-angle-down ml-2 text-primary ${
            cont % 2 !== 0 ? "girarArrow" : "backPositionArrow"
          }`}
        ></i>
      </section>

      {activarSectionDesplegable ? (
        <div
          style={{
            border: "none",
            fontSize: 14,
            backgroundColor: "#fff",
            borderRadius: "4px",
            border: "none",
          }}
          className="lead buttons-option-container"
          onClick={() => esconderMenuDesplegable()}
        >
          <button
            className={`lead relevante-borde ${
              (props.relevantProps === false &&
                props.lowerPriceProps === false &&
                props.higherPriceProps === false) ||
              props.relevantProps
                ? "text-primary font-weight-bold border-relevant fondoGris"
                : "fondoBlancoRelevante"
            }`}
            value={props.APIsearchSort.id}
            selected
            onClick={props.handleAvailable}
            style={{ backgroundColor: "#ededed", fontSize: 14 }}
          >
            {props.APIsearchSort.name === "More relevant"
              ? "Más relevantes"
              : ""}
          </button>

          <button
            className={`lead lower-borde ${
              props.lowerPriceProps
                ? "text-primary font-weight-bold border-lower fondoGris"
                : ""
            }`}
            value={props.APIsearchAvailableSorts[0].id}
            key={props.APIsearchAvailableSorts[0].id}
            onClick={props.handleAvailable}
            style={{ fontSize: 14 }}
          >
            {props.APIsearchAvailableSorts[0].name === "Lower price"
              ? "Menor precio"
              : ""}
          </button>

          <button
            className={`lead higher-borde ${
              props.higherPriceProps
                ? "text-primary font-weight-bold border-higher fondoGris"
                : ""
            }`}
            value={props.APIsearchAvailableSorts[1].id}
            key={props.APIsearchAvailableSorts[1].id}
            onClick={props.handleAvailable}
            style={{ fontSize: 14 }}
          >
            {props.APIsearchAvailableSorts[1].name === "Higher price"
              ? "Mayor precio"
              : ""}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Filters;
