import { useState } from 'react'
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Films from "./pages/Films";
import Actors from "./pages/Actors";
import Customers from "./pages/Customers";


export default function App() {
  return (
     <BrowserRouter>
      {/* Navigation */}
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* your Routes go here */}
    
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:title" element={<Films />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:actor" element={<Actors />} />
        <Route path="/customers" element={<Customers/>}/> 
        
      </Routes>
      </Container>

      {/* Routes */}
      
    </BrowserRouter>
  );
}