import React from "react";
import { Chart } from "primereact/chart";

const StatistiquesCard = ({
  title,
  type = "bar",
  data,
  height = "300px",
  className = "justify-center w-full",
  company=[]
}) => {

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    }
  }
};

  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [selectedPeriod, setSelectedPeriod] = React.useState("");

  return (
    <div className={`p-4 rounded-xl ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-3">
          {title}
        </h3>
      )}

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Select Company */}
        <div className="flex flex-col">
          <label className="block mb-1 text-sm font-medium">
            Entreprise
          </label>

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="border rounded-lg px-4 py-2 w-auto focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Sélectionner une entreprise</option>

            {company?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Period */}
       <div>
  <label className="block mb-1 text-sm font-medium">
    Période
  </label>

  <select
    value={selectedPeriod}
    onChange={(e) => setSelectedPeriod(e.target.value)}
    className="border rounded-lg px-4 py-2 w-auto focus:outline-none focus:ring-2 focus:ring-orange-400"
  >
    <option value="">Choisir une période</option>
    <option value="year">Année</option>
    <option value="month">Mois</option>
    <option value="week">Semaine</option>
    <option value="day">Jour</option>
  </select>
  
</div>
<div style={{marginTop:'1em'}}>
  
  {selectedPeriod === "year" && (
    <input
      type="number"
      placeholder="Entrer une année"
      className="border rounded-lg px-4 py-2"
    />
  )}

  {selectedPeriod === "month" && (
    <input
      type="month"
      className="border rounded-lg px-4 py-2"
    />
  )}

  {selectedPeriod === "week" && (
    <input
      type="week"
      className="border rounded-lg px-4 py-2"
    />
  )}

  {selectedPeriod === "day" && (
    <input
      type="date"
      className="border rounded-lg px-4 py-2"
    />
  )}
</div>
      </div>

      <Chart
        type={type}
        data={data}
        className="w-full"
        options={chartOptions}
        style={{ height }}
      />
    </div>
  );
};

export default StatistiquesCard;