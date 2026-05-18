import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <img
        src={product.image}
        alt={product.title}
        style={styles.img}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <h4
        style={styles.title}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.title.substring(0, 50)}...
      </h4>
      <p style={styles.price}>${product.price}</p>
      <button style={styles.btn} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd', borderRadius: '8px',
    padding: '16px', width: '220px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '10px',
    backgroundColor: '#fff',
  },
  img: { width: '120px', height: '120px', objectFit: 'contain', cursor: 'pointer' },
  title: { fontSize: '14px', textAlign: 'center', cursor: 'pointer' },
  price: { fontWeight: 'bold', color: '#e44d26' },
  btn: {
    padding: '8px 16px', backgroundColor: '#222',
    color: 'white', border: 'none',
    borderRadius: '4px', cursor: 'pointer',
  },
};

export default ProductCard;