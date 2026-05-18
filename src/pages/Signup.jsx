import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }
    signup(name, email, password);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.btn} onClick={handleSignup}>Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', height: '80vh',
  },
  box: {
    display: 'flex', flexDirection: 'column', gap: '12px',
    padding: '32px', border: '1px solid #ddd',
    borderRadius: '8px', width: '320px',
  },
  input: {
    padding: '10px', borderRadius: '4px',
    border: '1px solid #ccc', fontSize: '14px',
  },
  btn: {
    padding: '10px', backgroundColor: '#222',
    color: 'white', border: 'none',
    borderRadius: '4px', cursor: 'pointer', fontSize: '16px',
  },
  error: { color: 'red', fontSize: '13px' },
};

export default Signup;