import { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from './../client/supabaseclient';
import './auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else setMessage('Login successful!');
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className='daddy'>
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          onChange={handleChange}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}
        <button type="submit" className="auth-btn-primary">Login</button>
      </form>

      <div className="auth-or">OR</div>

      <button
        onClick={() => handleOAuthLogin('google')}
        className="auth-btn-oauth auth-btn-google"
      >
        Continue with Google
      </button>
      <button
        onClick={() => handleOAuthLogin('github')}
        className="auth-btn-oauth auth-btn-github"
      >
        Continue with GitHub
      </button>

      <p className="auth-or">
        Don't have an account?{' '}
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
    </div>
  );
}
