import React from "react";
import Carts from "./components/Carts.jsx";
import Desc from "./components/Desc.jsx";
import "./index.css";

const App = () => {
  return (
    <>
      <div className="cartShop">
        <div>
          <div>
            <Desc />
          </div>
          <div className="cartShop">
            <Carts />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
