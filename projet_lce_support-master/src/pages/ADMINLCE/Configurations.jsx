import { useState } from "react";

import TabButton from "../../component/TabButton";
import SectionCard from "../../component/SectionCard";

import AddRole from "./features/configuration/AddRole"
import NiveauDifficult from "./features/configuration/NiveauDifficult";
import Formules from "./features/configuration/Formules";
import Time_treatment from "./features/configuration/Time_treatment";
import TypesTickets from "./features/configuration/TypesTickets";
import Products from './features/configuration/Products';
export default function Configuration() {
  const [activeTab, setActiveTab] = useState("Products");

  // const [config, setConfig] = useState({
  //   roles: [],
  //   treatmentTime: "",
  //   ticketTypes: [],
  //   subscriptionFormule: [],
  //   difficultyLevels: [],
  // });

  // const handleChange = (field, value) => {
  //   setConfig((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  return (
  
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">

        <h1 className="text-2xl font-bold mb-6">Configurations</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b pb-3 mb-6">
           <TabButton
            label="Produits"
            isActive={activeTab === "Products"}
            onClick={() => setActiveTab("Products")}
          />
          <TabButton
            label="Roles"
            isActive={activeTab === "roles"}
            onClick={() => setActiveTab("roles")}
          />
          <TabButton
            label="Temps de traitements"
            isActive={activeTab === "treatment"}
            onClick={() => setActiveTab("treatment")}
          />
          <TabButton
            label="Types de tickets"
            isActive={activeTab === "tickets"}
            onClick={() => setActiveTab("tickets")}
          />
          <TabButton
            label="Formules de souscription"
            isActive={activeTab === "subscription"}
            onClick={() => setActiveTab("subscription")}
          />
          <TabButton
            label="Niveau de Sévérité"
            isActive={activeTab === "difficulty"}
            onClick={() => setActiveTab("difficulty")}
          />
          
        </div>

        {/* Content */}
        {activeTab === "roles" && (
          <SectionCard title="Gestionnaires de roles">
           <AddRole />
          </SectionCard>
        )}

        {activeTab === "treatment" && (
          <SectionCard title="Temps de traitement">
          <Time_treatment />
          </SectionCard>
        )}

        {activeTab === "tickets" && (
          <SectionCard title="Gestion des types de tickets">
           <TypesTickets />
          </SectionCard>
        )}

        {activeTab === "subscription" && (
          <SectionCard title="Formules de souscription">
            <Formules />
          </SectionCard>
        )}

        {activeTab === "difficulty" && (
          <SectionCard title="Niveau de Sévérité">
            <NiveauDifficult />
          </SectionCard>
        )}
          {activeTab === "Products" && (
          <SectionCard title="Produits">
            <Products />
          </SectionCard>
        )}
      </div>
    </div>
  );
}




