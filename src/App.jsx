import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Films from "./pages/Films";
import Actors from "./pages/Actors";


export default function App() {
  return (
     <BrowserRouter>
      {/* Navigation */}
      <nav style={{ padding: 16 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/films">Films</Link> |{" "}
        <Link to="/actors">Actors</Link>
    
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:title" element={<Films />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:actor" element={<Actors />} />
        
      </Routes>
    </BrowserRouter>
  );
}