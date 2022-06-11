import React from "react";

const Condition = (props) => {
  return (
    <div className="container-condition">
      <h4 className="text-condition">Condición</h4>
      <section className="container-new">
        <button value="new" onClick={props.clickItemConditionProduct}>
          Nuevo
        </button>
        <button
          className="lead"
          value="new"
          onClick={props.clickItemConditionProduct}
        >
          {""}({props.newProduct})
        </button>
      </section>
      <section className="container-used">
        <button value="used" onClick={props.clickItemConditionProduct}>
          Usado
        </button>
        <button
          className="lead"
          value="used"
          onClick={props.clickItemConditionProduct}
        >
          {""}({props.usedProduct})
        </button>
      </section>
    </div>
  );
};
export default Condition;
