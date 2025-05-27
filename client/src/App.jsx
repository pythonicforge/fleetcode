import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Signuplogin from './components/Auth/Signuplogin';
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
