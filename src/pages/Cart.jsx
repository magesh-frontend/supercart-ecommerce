import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty 😢</h2>;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.map((item, index) => (
        <div key={index}>
          <h4>{item.title}</h4>
          <p>₹{item.price}</p>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}

export default Cart;