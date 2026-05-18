import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';

function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${id}`
  );
  const { addToCart } = useCart();

  if (loading) return <h2 style={{ padding: '24px' }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: '24px' }}>Error: {error}</h2>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.img} />
      <div style={styles.info}>
        <h2>{product.title}</h2>
        <p style={styles.category}>Category: {product.category}</p>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.desc}>{product.description}</p>
        <p>⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
        <button style={styles.btn} onClick={() => addToCart(product)}>
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', gap: '40px', padding: '40px',
    flexWrap: 'wrap',
  },
  img: { width: '280px', height: '280px', objectFit: 'contain' },
  info: { flex: 1, minWidth: '260px' },
  category: { color: 'gray', textTransform: 'capitalize', marginBottom: '8px' },
  price: { fontSize: '24px', fontWeight: 'bold', color: '#e44d26' },
  desc: { lineHeight: '1.6', margin: '12px 0' },
  btn: {
    marginTop: '16px', padding: '12px 24px',
    backgroundColor: '#222', color: 'white',
    border: 'none', borderRadius: '4px',
    cursor: 'pointer', fontSize: '16px',
  },
};

export default ProductDetail;