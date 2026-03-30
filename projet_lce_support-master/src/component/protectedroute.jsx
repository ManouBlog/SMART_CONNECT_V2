import React from "react";
import { Navigate } from "react-router-dom";

// children = le composant que l'on veut afficher si l'utilisateur est connecté
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // on récupère le token

  if (!token) {
    // si pas de token => redirection vers login
    return <Navigate to="/" replace />;
  }

  // sinon on affiche le composant demandé
  return children;
};

export default ProtectedRoute;
