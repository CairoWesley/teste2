import './App.css';
import { Checkout } from './components/Checkout';
import { Multiselect } from './components/multiselect';
import React from "react";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (

    <>
      <Routes>
        <Route path="/links" element={< Multiselect />} />
        <Route path="/checkout/:id/:vendedor" element={< Checkout />} />
      </Routes>
    </>


  );
}

export default App;
