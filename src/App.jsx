import React, { useState } from "react";

import Search from "./components/Search";

import "./css/App.css";
import "../src/css/Search.css";
import "../src/css/Filters.css";
import "../src/css/Condition.css";
import "../src/css/CostoEnvio.css";

function App() {
  return (
    <div className="main-container">
      <Search />
    </div>
  );
}

export default App;
