import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/**
 * In questo file, vado a RENDERIZZARE (o stampare sulla pagina HTML) il
 * mio componente React
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
