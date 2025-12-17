import { Navigate } from 'react-router';

/**
 * Realizzo un componente react che mi va a reindirizzare alla pagina di login se 
 * non ho un token di autenticazione
 * 
 * COMPONENTE PER PROTEGGERE LE ROTTE CHE RICHIEDONO AUTENTICAZIONE
 * 
 * NOTA: NON è REALE SICUREZZA, PERCHé QUELLA LA GESTISCO LATO BACKEND CON SPRING SECURITY DENTRO
 * LE CONFIGURAZIONI DI SECURITYCONFIG.JAVA
 */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authentication_token');

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute;