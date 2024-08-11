import React from "react";
import "../css/Modal.css";
import ModalIcon from "../assets/images/icon-order-confirmed.svg";

const Modal = ({ cart = {}, onClose, clearCart }) => {
  const items = Object.values(cart) || [];
  const orderTotal = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleStartNewOrder = () => {
    clearCart();
    onClose(); 
  };

  return (
    <div className="modalOverlay">
      <div className="modalWrapper">
        <img src={ModalIcon} alt="Order Confirmed" className="modalIcon" />
        <h1 className="modalHeader">Order Confirmed</h1>
        <p>We hope you enjoy your food!</p>
        <div className="cartItemDesc">
          <ul className="cartItemsModal">
            {items.map((item, index) => (
              <li key={index} className="modalListed">
                <div className="cartItemModal">
                  <div className="cartItemModalList">
                    <div className="modalList">
                      <img
                        src={item.src}
                        alt={item.name}
                        className="dessertImage"
                      />
                      <div>
                        <h2 className="titleLine modalTitle">{item.name}</h2>
                        <br />
                        <span className="itemQuantity priceLine">
                          {item.quantity}X
                        </span>
                        <span className="itemPrice nameLine">
                          @ ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="itemTotal">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
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
        </div>
        <button className="closeModalBtn" onClick={handleStartNewOrder}>
          <p>Start new order</p>
        </button>
      </div>
    </div>
  );
};

export default Modal;
