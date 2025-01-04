import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './Layout'; 
import AddressProvider from './context/AddressContext';
import { useErrorLogger } from './errorLogger';


function App() {


useErrorLogger();

// throw new Error('Test Error');

  return (
    <AddressProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="addresses" element={<div>Saved Addresses Page</div>} />
        </Route>
      </Routes>
    </Router>
    </AddressProvider>
  );
}

export default App;
