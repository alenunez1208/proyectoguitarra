import { useState, useEffect } from "react"
import Guitarra from "./components/Guitarra.jsx"
import Header from "./components/Header.jsx"
import { db } from "./data/db.js"

function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    setData(db)
  }, [])

  const handleAddCart = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExist >= 0) {
      const updateCart = [...cart]
      updateCart[itemExist].cantidad++
      setCart(updateCart)
    } else {
      item.cantidad = 1
      setCart([...cart, item])
    }      
  }
  
  return (
    <>
      <Header cart={cart} />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => {
              return <Guitarra key={guitar.id} guitar={guitar} addCart={handleAddCart} />
            })
          }
            
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
