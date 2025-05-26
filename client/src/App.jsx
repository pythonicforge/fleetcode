import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Signuplogin from './components/Signuplogin';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Signuplogin />} />
      </Routes>
    </>
  );
}

export default App;
