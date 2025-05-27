import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './Protectedroute';
import { useUser } from './components/client/Usercontext';
import './App.css';

function App() {
  const { user } = useUser();

  return (
    <>
      <Routes>
<Route
  path="/"
  element={user ? <Navigate to="/dashboard" /> : <Hero />}
/>

        {/* Protect dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Redirect logged-in users away from login/signup */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;
