import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import ContactUs from './components/ContactUs';
import ReadMore from './components/ReadMore';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/read-more" element={<ReadMore />} />
      </Routes>
    </Router>
  );
}

export default App;
