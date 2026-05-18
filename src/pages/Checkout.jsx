import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.pincode) {
      alert('Please fill all fields!');
      return;
    }
    setPlaced(true);
  };

  if (cartItems.length === 0 && !placed) {
    return (
      <div style={{ padding: '24px' }}>
        <h2>Nothing to checkout 🛒</h2>
        <button onClick={() => navigate('/')} style={styles.btn}>
          Go Shopping
        </button>
      </div>
    );
  }

  if (placed) {
    return (
      <div style={styles.success}>
        <h1>🎉 Order Placed!</h1>
        <p>Thank you <strong>{form.name}</strong>!</p>
        <p>Your order will be delivered to <strong>{form.address}, {form.city}</strong></p>
        <button style={styles.btn} onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Order Summary */}
      <div style={styles.summary}>
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} style={styles.summaryItem}>
            <img src={item.image} alt={item.title} style={styles.img} />
            <div>
              <p style={styles.itemTitle}>{item.title.substring(0, 40)}...</p>
              <p>Qty: {item.quantity} × ${item.price}</p>
              <p><strong>${(item.price * item.quantity).toFixed(2)}</strong></p>
            </div>
          </div>
        ))}
        <hr />
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>

      {/* Delivery Form */}
      <div style={styles.form}>
        <h3>Delivery Details</h3>
        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />
        <button style={styles.btn} onClick={handleOrder}>
          Place Order 🎉
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', gap: '32px',
    padding: '32px', flexWrap: 'wrap',
  },
  summary: {
    flex: 1, minWidth: '280px',
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '20px',
  },
  summaryItem: {
    display: 'flex', gap: '12px',
    marginBottom: '12px', alignItems: 'center',
  },
  img: { width: '60px', height: '60px', objectFit: 'contain' },
  itemTitle: { fontWeight: 'bold', fontSize: '13px' },
  form: {
    flex: 1, minWidth: '280px',
    display: 'flex', flexDirection: 'column', gap: '12px',
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '20px',
  },
  input: {
    padding: '10px', borderRadius: '4px',
    border: '1px solid #ccc', fontSize: '14px',
  },
  btn: {
    padding: '12px', backgroundColor: '#222',
    color: 'white', border: 'none',
    borderRadius: '4px', cursor: 'pointer',
    fontSize: '16px', marginTop: '8px',
  },
  success: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    height: '70vh', gap: '16px', textAlign: 'center',
  },
};

export default Checkout;