import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Signuplogin from './components/Auth/Signuplogin';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Signuplogin />} />
        <Route path="/code" element={<CodeEditor />} />
      </Routes>
    </>
  );
}

export default App;
