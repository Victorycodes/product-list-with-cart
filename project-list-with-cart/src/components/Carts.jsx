import React, { useState, useEffect } from "react";
import "../css/Carts.css";
import CartSummary from "./CartSummary";
import Waffles from "../assets/images/image-waffle-desktop.jpg";
import Creme from "../assets/images/image-creme-brulee-desktop.jpg";
import Macaron from "../assets/images/image-macaron-desktop.jpg";
import Tiramisu from "../assets/images/image-tiramisu-desktop.jpg";
import Baklava from "../assets/images/image-baklava-desktop.jpg";
import Meringue from "../assets/images/image-meringue-desktop.jpg";
import Cake from "../assets/images/image-cake-desktop.jpg";
import Brownie from "../assets/images/image-brownie-desktop.jpg";
import Panna from "../assets/images/image-panna-cotta-desktop.jpg";
import Cart from "../assets/images/icon-add-to-cart.svg";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";
import Modal from "./Modal";

const images = [
  {
    src: Waffles,
    alt: "Waffles",
    name: ["Waffle"],
    title: ["Waffle with Berries"],
    price: 6.5,
  },
  {
    src: Creme,
    alt: "Creme Brulee",
    name: ["Creme Brulee"],
    title: ["Vanilla Bean Crème Brûlée"],
    price: 7.0,
  },
  {
    src: Macaron,
    alt: "Macaron",
    name: ["Macaron"],
    title: ["Macaron Mix of Five"],
    price: 8.0,
  },
  {
    src: Tiramisu,
    alt: "Tiramisu",
    name: ["Tiramisu"],
    title: ["Classic Tiramisu"],
    price: 5.5,
  },
  {
    src: Baklava,
    alt: "Baklava",
    name: ["Baklava"],
    title: ["Pistachio Baklava"],
    price: 4.0,
  },
  {
    src: Meringue,
    alt: "Meringue",
    name: ["Meringue"],
    title: ["Lemon Meringue Pie"],
    price: 5.0,
  },
  {
    src: Cake,
    alt: "Cake",
    name: ["Cake"],
    title: ["Red Velvet Cake"],
    price: 4.5,
  },
  {
    src: Brownie,
    alt: "Brownie",
    name: ["Brownie"],
    title: ["Salted Caramel Brownie"],
    price: 5.5,
  },
  {
    src: Panna,
    alt: "Panna Cotta",
    name: ["Panna Cotta"],
    title: ["Vanilla Panna Cotta"],
    price: 6.5,
  },
];

const Carts = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClick = (item) => {
    setCart((prev) => {
      const existingItem = prev[item.alt];
      if (existingItem) {
        return {
          ...prev,
          [item.alt]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        return {
          ...prev,
          [item.alt]: { ...item, quantity: 1 },
        };
      }
    });
  };

  const increment = (alt) => {
    setCart((prev) => ({
      ...prev,
      [alt]: {
        ...prev[alt],
        quantity: (prev[alt]?.quantity || 0) + 1,
      },
    }));
  };

  const decrement = (alt) => {
    setCart((prev) => {
      const currentQuantity = prev[alt]?.quantity || 0;
      if (currentQuantity <= 1) {
        const { [alt]: removedItem, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [alt]: {
            ...prev[alt],
            quantity: currentQuantity - 1,
          },
        };
      }
    });
  };

  const removeItem = (alt) => {
    setCart((prev) => {
      const { [alt]: removedItem, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="box">
        <div className="wrapper">
          {images.map((image) => {
            const itemInCart = cart[image.alt];
            return (
              <div key={image.alt} className="imgHolder">
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`desserts ${itemInCart ? "inCart" : ""}`}
                />
                <div className="name">
                  <p className="nameLine">{image.name}</p>
                </div>
                <div className="title">
                  <h2 className="titleLine">{image.title}</h2>
                </div>
                <div className="price">
                  <h2 className="priceLine">${image.price.toFixed(2)}</h2>
                </div>
                {itemInCart ? (
                  <div className="quantityControls">
                    <MinusIcon
                      className="controlIcon"
                      onClick={() => decrement(image.alt)}
                    />
                    <span className="quantity">{itemInCart.quantity}</span>
                    <PlusIcon
                      className="controlIcon"
                      onClick={() => increment(image.alt)}
                    />
                  </div>
                ) : (
                  <div className="btn" onClick={() => handleClick(image)}>
                    <img src={Cart} alt="Add to Cart" className="AddToCart" />
                    Add to Cart
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="leftWrapper">
          <CartSummary cart={cart} removeItem={removeItem} confirmOrder={openModal} />
        </div>
      </div>
      {showModal && (
        <Modal
          cart={cart}
          onClose={closeModal}
          clearCart={clearCart}
        />
      )}
    </>
  );
};

export default Carts;
