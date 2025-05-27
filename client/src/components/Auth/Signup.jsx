import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from './../client/supabaseclient';
import { useUser } from '../client/Usercontext';
import './auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const { username, email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return setError('Passwords do not match.');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    setError(error.message);
  } else {
    navigate('/dashboard'); // 🚀 Instant redirect since confirmation is off
  }
};

  const handleOAuthSignup = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className='daddy'>
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          name="username"
          placeholder="Username"
          className="auth-input"
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="auth-input"
          onChange={handleChange}
          required
        />

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-success">{message}</p>}

        <button type="submit" className="auth-btn-primary">
          Sign Up
        </button>
      </form>

      <div className="auth-or">OR</div>

      <button
        onClick={() => handleOAuthSignup('google')}
        className="auth-btn-oauth auth-btn-google"
      >
        Sign up with Google
      </button>
      <button
        onClick={() => handleOAuthSignup('github')}
        className="auth-btn-oauth auth-btn-github"
      >
        Sign up with GitHub
      </button>
      <p className="auth-or">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Login
        </Link>
      </p>
    </div>
    </div>
  );
}
