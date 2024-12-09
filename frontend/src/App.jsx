import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddTransaction from './pages/AddTransaction';
import Footer from './components/Footer';
import EditTransaction from './pages/EditTransaction';
const App = () => {
  return (
    <Router>
      <div id="root">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/edit/:id" element={<EditTransaction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
