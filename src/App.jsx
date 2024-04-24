import { useState, useEffect } from "react";
import Guitarra from "./components/Guitarra.jsx";
import Header from "./components/Header.jsx";
import { db } from "./data/db.js";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    handleSaveLocalStorage();
  }, [cart]);

  const handleAddCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].cantidad >= MAX_ITEMS) return;

      const updateCart = [...cart];
      updateCart[itemExist].cantidad++;
      setCart(updateCart);
    } else {
      item.cantidad = 1;
      setCart([...cart, item]);
    }
  };

  const handleRemoveItemCart = (id) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const handleAddCantidad = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad < MAX_ITEMS) {
        return { ...item, cantidad: item.cantidad + 1 };
      }

      return item;
    });

    setCart(updateCart);
  };

  const handleRemoveCantidad = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad > MIN_ITEMS) {
        return { ...item, cantidad: item.cantidad - 1 };
      }

      return item;
    });

    setCart(updateCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSaveLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Header
        cart={cart}
        fncRemoveItem={handleRemoveItemCart}
        fncAddCantidad={handleAddCantidad}
        fncRemoveCantidad={handleRemoveCantidad}
        fncClearCart={handleClearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitarra
                key={guitar.id}
                guitar={guitar}
                addCart={handleAddCart}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
