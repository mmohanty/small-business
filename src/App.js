// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Loan from './components/Loan';
import MintToken from './components/MintToken';
import LoanWareHousing from './components/LoanWareHousing';
import AssetManager from './components/AssetManager';
import CreateTemplate from './components/CreateTemplate';
import BulkUpload from './components/BulkUpload';

const App = () => {
  return (
    <Router>
      
      <div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/loans" element={<Loan />} />
            <Route path="/mint" element={<MintToken/>} />
            <Route path="/lwh" element={<LoanWareHousing/>} />
            <Route path="/am" element={<AssetManager/>} />
            <Route path="/create-template" element={<CreateTemplate />} />
            <Route path ="/bulk-upload" element={<BulkUpload />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
