import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThankYou from './pages/ThankYou';
import './styles/global.css';
import './styles/animations.css';
import './styles/utilities.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
