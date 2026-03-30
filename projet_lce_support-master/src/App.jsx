import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./pages/ADMINLCE/Dashboard";
import CompteAdmin from "./pages/ADMINLCE/CompteAdmin";
import CompteEntreprise from "./pages/ENTREPRISE/CompteEntreprise";
import Entreprise from "./pages/ENTREPRISE/Entreprise";
import Configurations from "./pages/ADMINLCE/Configurations";
import LoginPage from "./pages/Login";
import CompanySaved from "./pages/ADMINLCE/CompanySaved";
import ProtectedRoute from "./component/protectedroute";
import LoadingSpinner from "./component/LoadingSpinner";
import AdminLayout from "./component/AdminLayout";
import AgentsSupports from "./pages/ADMINLCE/AgentsSupports";
import Utilisateurs from "./pages/ENTREPRISE/Utilisateurs";
import AllTickets from "./pages/USER/AllTickets";
import GlobalMessage from "./component/GlobalMessage";
// import UtilisateurWhoSendTickets from "./pages/USER/UtilisateurWhoSendTickets"
// import UtilisateurWhoTreaTickets from "./pages/USER/UtilisateurWhoTreaTickets";

function App() {
  const loading = useSelector((state) => state.isLoading.isSpinner);
  
  return (
    <div className="App">
      {loading && <LoadingSpinner />}
  
       <GlobalMessage />
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/dashboard_entreprise" element={<Entreprise />} /> */}
          <Route path="/compteadmin" element={<CompteAdmin />} />
          <Route path="/compteentreprise" element={<CompteEntreprise />} />
          <Route path="/Configurations" element={<Configurations />} />
          <Route path="/CompanySaved" element={<CompanySaved />} />
          <Route path="/supports" element={<AgentsSupports />} />
          <Route path="/utilisateurs"  element={<Utilisateurs />} />
          <Route path="/Tickets" element={<AllTickets />} />
          
        </Route>

      </Routes>
    </div>
  );
}

export default App;
