import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '24px' }}>
        <h2>Your cart is empty 🛒</h2>
        <Link to="/">← Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} style={styles.item}>
          <img src={item.image} alt={item.title} style={styles.img} />
          <div style={styles.info}>
            <p style={styles.title}>{item.title.substring(0, 50)}...</p>
            <p>${item.price}</p>
            <div style={styles.qty}>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button style={styles.remove} onClick={() => removeFromCart(item.id)}>
            ✕ Remove
          </button>
        </div>
      ))}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <Link to="/checkout">
        <button style={styles.checkoutBtn}>Proceed to Checkout →</button>
      </Link>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  item: {
    display: 'flex', alignItems: 'center', gap: '16px',
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '12px', marginBottom: '12px',
  },
  img: { width: '80px', height: '80px', objectFit: 'contain' },
  info: { flex: 1 },
  title: { fontWeight: 'bold', marginBottom: '4px' },
  qty: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' },
  remove: {
    background: 'none', border: '1px solid red',
    color: 'red', padding: '6px 10px', cursor: 'pointer', borderRadius: '4px',
  },
  checkoutBtn: {
    marginTop: '16px', padding: '12px 24px',
    backgroundColor: '#222', color: 'white',
    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px',
  },
};

export default Cart;