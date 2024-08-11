import React, { useState } from "react";
import "../css/CartSummary.css";
import "../css/Carts.css";
import Modal from "./Modal";
import EmptyCarts from "../assets/images/illustration-empty-cart.svg";
import CarbonIcon from "../assets/images/icon-carbon-neutral.svg";
import RemoveIcon from "./RemoveIcon";

const CartSummary = ({ cart = {}, removeItem, confirmOrder }) => {
  const items = Object.values(cart) || [];
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="cartSummary">
      <h1 className="cartInfo">Your Cart ({totalItems})</h1>
      {totalItems === 0 ? (
        <div>
          <div className="emptyCart">
            <img src={EmptyCarts} alt="Empty Cart" />
            <br />
          </div>
          <p className="emptyCartDesc">Your added items will appear here.</p>
        </div>
      ) : (
        <div>
          <ul className="cartItems">
            {items.map((item) => (
              <li key={item.alt} className="cartItem">
                <div className="cartItemList">
                  <div>
                    <h2 className="itemTitle titleLine">{item.name}</h2>
                    <br />
                    <span className="itemQuantity priceLine">
                      {item.quantity}X
                    </span>
                    <span className="itemPrice nameLine">
                      @ ${item.price.toFixed(2)}
                    </span>
                    <span className="itemTotal">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <RemoveIcon
                      className="removeIcon"
                      onClick={() => removeItem(item.alt)}
                    />
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
          <div>
            <h2 className="orderTotal">
              <span className="orderTotalDesc">Order Total</span>{" "}
              <span className="orderTotalPrice">${orderTotal.toFixed(2)}</span>
            </h2>
          </div>
          <button className="carbonBtn">
            <img src={CarbonIcon} alt="Carbon Neutral Icon" />
            <p>
              This is a <span className="itemTotal">carbon-neutral</span>{" "}
              delivery
            </p>
          </button>
          <button className="confirmBtn" onClick={confirmOrder}>
            <p>Confirm Order</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
