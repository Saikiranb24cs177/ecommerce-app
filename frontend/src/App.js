import { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: "https://via.placeholder.com/200?text=Laptop"
    },
    {
      id: 2,
      name: "Mobile",
      price: 20000,
      image: "https://via.placeholder.com/200?text=Mobile"
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      image: "https://via.placeholder.com/200?text=Headphones"
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h2>🛒 ShopNest</h2>
        <h3>Cart ({cart.length})</h3>
      </nav>

      <div className="container">
        <h1>Welcome to ShopNest</h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {products
          .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div className="card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                width="200"
              />

              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}

        <hr />

        <h2>Cart Items</h2>

        {cart.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - ₹{item.price}
            </p>

            <button onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        ))}

        <h2>Total: ₹{totalPrice}</h2>
      </div>
    </div>
  );
}

export default App;