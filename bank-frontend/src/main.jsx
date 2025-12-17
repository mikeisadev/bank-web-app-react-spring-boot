import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

/**
 * npm install react-router
 * 
 * PERCHé!? Perché SENZA react-router NON posso rendere la mia web application in REACT
 * navigabile con delle ROTTE che definisco IO e che sono valide SOLO per il FRONTEND
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

/**
 * In questo file, vado a RENDERIZZARE (o stampare sulla pagina HTML) il
 * mio componente React
 * 
 * Voglio che REACT ROUTER definisca delle rotte nel mio frontend per rendere il frontend navigabile.
 * 
 * Ma queste rotte le conosce SOLO il frontend, il backend DOVRà comunque contenere i suoi controller per le REST API (o REST CONTROLLER).
 */
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/** Rotte di login e registrazione. NON SONO PROTETTE PERCHé DEVO PERMETTERE LOGIN E REGISTRAZIONE ALL'UTENTE */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrati" element={<Register />} />

      {/** ROTTE PROTETTE DA LOGIN PERCHé è UN'AREA PRIVATA, USO IL COMPONENTE "ProtectedRoute" */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
