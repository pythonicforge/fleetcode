import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Signuplogin from './components/Signuplogin';
import Hero from './components/Hero';
import './App.css'; 
import Navbar from './components/Navbar';
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

