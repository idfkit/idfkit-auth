import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Authenticate from './pages/Authenticate';
import Authorize from './pages/Authorize';

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/authenticate" element={<Authenticate />} />
    <Route path="/oauth/authorize" element={<Authorize />} />
  </Routes>
);

export default App;
