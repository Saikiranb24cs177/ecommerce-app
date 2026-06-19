import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("User")
  

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");
const [orders, setOrders] = useState([]);
useEffect(() => {
  const savedUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  setUsers(savedUsers);
}, []);

useEffect(() => {
  const savedProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  if (savedProducts.length > 0) {
    setProducts(savedProducts);
  }
}, []);
  const [products, setProducts] = useState([
    {

    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 50000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
  },
  {
    id: 2,
    name: "Mobile",
    category: "Electronics",
    price: 20000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
  {
    id: 3,
    name: "Headphones",
    category: "Accessories",
    price: 3000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
]);

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

  const addProduct = () => {
    if (!newProduct || !newPrice) return;

    const product = {
      id: Date.now(),
      name: newProduct,
      price: Number(newPrice),
      image:
        "https://via.placeholder.com/200?text=" +
        encodeURIComponent(newProduct),
    };

    const updatedProducts = [...products, product];

setProducts(updatedProducts);

localStorage.setItem(
  "products",
  JSON.stringify(updatedProducts)
);
    setNewProduct("");
    setNewPrice("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  const handleRegister = () => {
  const newUser = {
    name,
    email,
    password,
    role: "User"
  };

  const updatedUsers = [...users, newUser];

setUsers(updatedUsers);

localStorage.setItem(
  "users",
  JSON.stringify(updatedUsers)
);

  alert("Registration Successful");

  setName("");
  setEmail("");
  setPassword("");
};
   const handleLogin = () => {
  const user = users.find(
    (u) =>
      u.email === loginEmail &&
u.password === loginPassword
  );

  if (user) {
    setIsLoggedIn(true);
    setRole(user.role);

    alert("Login Successful");
  } else {
    alert("Invalid Email or Password");
  }
};
  return (
    <div>
      <nav className="navbar">
        <h2>🛒 ShopNest</h2>

        <h3>Cart ({cart.length})</h3>

        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>

      <div className="container">
        <h1>Welcome to ShopNest</h1>
        <p>
  Total Products: {products.length}
</p>

        <p>
          Status: {isLoggedIn ? "Logged In" : "Guest User"}
        </p>

        {isLoggedIn && (
          <div>
            <label>Select Role: </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>User</option>
              <option>Admin</option>
            </select>

            <p>Current Role: {role}</p>
          </div>
        )}

        {isLoggedIn && role === "Admin" && (
          <div>
            <hr />
            <h2>Admin Panel</h2>

            <input
              type="text"
              placeholder="Product Name"
              value={newProduct}
              onChange={(e) =>
                setNewProduct(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={newPrice}
              onChange={(e) =>
                setNewPrice(e.target.value)
              }
            />

            <button onClick={addProduct}>
              Add Product
            </button>
          </div>
        )}

        <hr />
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="All">All Products</option>
  <option value="Electronics">Electronics</option>
  <option value="Accessories">Accessories</option>
</select>
<hr />

<h2>Register</h2>

<input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<button onClick={handleRegister}>
  Register
</button>
<br /><br />



<div className="products"></div>
<br /><br />
 
 <h2>Login</h2>

<input
  type="email"
  placeholder="Email"
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
/>

<button onClick={handleLogin}>
  Login
</button>
<br /><br />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="products">

      {products
  .filter(
    (product) =>
      category === "All" ||
      product.category === category
  )
  .filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
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

              <button
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>

              {role === "Admin" && (
                <button
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  Delete Product
                </button>
              )}
            </div>
          ))}
           </div>

        <hr />

        <h2>Cart Items</h2>
        <p>
  Items in Cart: {cart.length}
</p>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              <p>
                {item.name} - ₹{item.price}
              </p>

              <button
                onClick={() =>
                  removeFromCart(index)
                }
              >
                Remove
              </button>
            </div>
          ))
        )}

        <h2>Total: ₹{totalPrice}</h2>
<button
  onClick={() => setCart([])}
>
  Clear Cart
</button>
        {isLoggedIn && (
          <button
            onClick={() => setShowCheckout(true)}
          >
            Proceed to Checkout
          </button>
        )}

        {showCheckout && (
          <div>
            <hr />
            <h2>Checkout</h2>

            <input
              type="text"
              placeholder="Enter Name"
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="Enter Address"
            />
            <br />
            <br />

            <input
              type="text"
              placeholder="Enter Phone Number"
            />
            <br />
            <br />

            <button
            onClick={() => {
  setOrderStatus("Order Placed");

  const newOrder = {
    id: Date.now(),
    items: cart.length,
    total: totalPrice,
    status: "Order Placed"
  };

  setOrders([...orders, newOrder]);
}}
            >
              Place Order
            </button>
          </div>
        )}

        {orderStatus && (
          <div>
            <hr />
            <h2>Order Tracking</h2>

            <p>Status: {orderStatus}</p>

            <button
              onClick={() =>
                setOrderStatus("Processing")
              }
            >
              Processing
            </button>

            <button
              onClick={() =>
                setOrderStatus("Delivered")
              }
            >
              Delivered
            </button>
          </div>
        )}
      </div>
          

      {orders.length > 0 && (
        <div className="order-tracking">
          <h2>Order History</h2>

          {orders.map((order) => (
            <div key={order.id}>
              <p>Order #{order.id}</p>
              <p>Items: {order.items}</p>
              <p>Total: ₹{order.total}</p>
              <p>Status: {order.status}</p>

              <hr />
            </div>
          ))}
        </div>
      )}

      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#1e3a8a",
          color: "white",
          textAlign: "center"
        }}
      >
        © 2026 ShopNest | Developed by Saikiran Nagelli
      </footer>

    </div>
  );
}

export default App;