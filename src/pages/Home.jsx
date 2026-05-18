import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

function Home() {
  const { data: products, loading, error } = useFetch(
    'https://fakestoreapi.com/products'
  );
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  if (loading) return <h2 style={{ padding: '24px' }}>Loading products...</h2>;
  if (error) return <h2 style={{ padding: '24px' }}>Error: {error}</h2>;

  // Unique categories from API
  const categories = ['all', ...new Set(products.map(p => p.category))].filter(Boolean);

  // Filter logic
  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'all' || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div style={styles.container}>
      <h2>All Products</h2>

      {/* Search + Filter Bar */}
      <div style={styles.toolbar}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={styles.select}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p style={styles.noResult}>No products found 😕 Try a different search!</p>
      )}

      {/* Product Grid */}
      <div style={styles.grid}>
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  toolbar: {
    display: 'flex',
    gap: '12px',
    margin: '16px 0',
    flexWrap: 'wrap',
  },
  searchInput: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '280px',
  },
  select: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#333',           // இதை சேர்
    minWidth: '160px', 
  },
  noResult: {
    padding: '24px',
    color: 'gray',
    fontSize: '16px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '16px',
  },
};

export default Home;