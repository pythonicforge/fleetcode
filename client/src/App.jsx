import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Landingpage from './components/Landingpage';
import Signuplogin from './components/Signuplogin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signuplogin" element={<Signuplogin />} />

      </Routes>
    </>
  );
}

export default App;

