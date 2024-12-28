import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './Layout'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addresses" element={<div>Saved Addresses Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
