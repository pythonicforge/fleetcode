import { useEffect, useState } from 'react';
import { supabase } from './../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Signuplogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Session error:', error.message);
      } else if (data.session) {
        navigate('/dashboard');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/dashboard');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async () => {
    setError(null);
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        alert('Sign up successful! Please check your email for confirmation.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.error('Login error:', error.message);
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h2>{isSignUp ? 'Create your account' : 'Sign in to FleetCode 🚀'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '100%' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '8px', width: '100%' }}
      />

      <button
        onClick={handleAuth}
        style={{
          padding: '10px 20px',
          margin: '10px 0 20px 0',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: isSignUp ? '#34A853' : '#4285F4',
          color: 'white',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>

      <p style={{ cursor: 'pointer', color: '#555', textDecoration: 'underline' }} onClick={() => {
        setError(null);
        setIsSignUp(!isSignUp);
      }}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      </p>

      <hr />

      <button
        onClick={handleGoogleLogin}
        style={{
          padding: '12px 24px',
          marginTop: '20px',
          border: 'none',
          borderRadius: '6px',
          backgroundColor: '#4285F4',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Sign in with Google
      </button>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}
    </div>
  );
}
