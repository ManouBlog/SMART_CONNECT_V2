import { useEffect, useRef, useState } from "react";
import { Chart } from "@antv/g2";
import dayjs from "dayjs";
import { fetchCompany } from "../store/slices/companySlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistique } from "../store/slices/statistiqueSlice";
import { Calendar } from 'primereact/calendar';

export default function CallsChart() {
  const chartRef = useRef();
  const dispatch = useDispatch();
  const {company} = useSelector((state)=>state.Company)
  const {user} = useSelector((state)=>state.authUser)
  const [selectedCompany, setSelectedCompany] = useState("");
const [selectedPeriod, setSelectedPeriod] = useState("annee");
  const [selectedDate, setSelectedDate] = useState(null);

  

  // Rendu de l'input en fonction de la période sélectionnée
  const renderDateInput = () => {
    switch (selectedPeriod) {
      case "jour":
        return (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "semaine":
        return (
          <input
            type="week"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "mois":
        return (
          <input
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "annee":
        return (
          <Calendar value={selectedDate} onChange={(e) => setSelectedDate(e.value)} view="year" dateFormat="yy" />
          // <input
          //   type="number"
          //   value={selectedDate}
          //   onChange={(e) => setSelectedDate(e.target.value)}
          //   placeholder="Année"
          //   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          // />
        );
      default:
        return null;
    }
  };

  useEffect(()=>{
   dispatch(fetchCompany())
  },[dispatch])

useEffect(() => {
  let chart;

  const launchStatistique = async () => {
    const periodMapping = {
  'annee': 'year',
  'mois': 'month',
  'semaine': 'week',
  'jour': 'day'
  // 'period': 'period'  // Ajoute si besoin
};
const now = new Date();  
const periodConfig = {
  'annee': { type: 'year', value: selectedDate ? dayjs(selectedDate).format("YYYY") : now.getFullYear().toString()  },
  'mois': { type: 'month', value: selectedDate },  // Mois actuel ou depuis state
  'semaine': { type: 'week', value: selectedDate }, // Numéro semaine actuelle
  'jour': { type: 'date', value: selectedDate }     // Jour actuel
};
const filterType = periodMapping[selectedPeriod];
const config = periodConfig[selectedPeriod];
    try {
     const res = await dispatch(
  fetchStatistique({
    userRoleId: user.role_id,
    dataSend: { 
     [config.type]: config.value, 
      company_id: selectedCompany, 
      type: filterType  // Remplace le hardcodé 'year'
    },
  })
);

      const statistiques =
        res.payload.data.map((item) => {
          return {
            label: item.label,
            closed: item.closed_percent,
            total: item.total,
            open: item.open,
            resolved: item.resolved,
            rejected: item.rejected
          };
        }) || [];

      if (!chartRef.current) return;

      chart = new Chart({
        container: chartRef.current,
        autoFit: true,
        height: 300,
      });

      const intervalData = statistiques;

      chart.data(intervalData);

      // BARRES OPEN
      chart
        .interval()
        .encode("x", "label")
        .encode("y", "open")
        .encode("color", () => "open")
        .encode("series", () => "open")
        .axis("y", { title: null })
        .scale("y", { nice: true })
        .scale("color", {
          domain: ["total", "open", "closed", "resolved","rejected"],
          range: ["#4f39f6", "#2b7fff", "#2ca02c", "#eecf02","#ca0101"],
        });

         chart
        .interval()
        .encode("x", "label")
        .encode("y", "resolved")
        .encode("color", () => "resolved")
        .encode("series", () => "resolved")
        .axis("y", { title: null })
        .scale("y", { nice: true });

          chart
        .interval()
        .encode("x", "label")
        .encode("y", "rejected")
        .encode("color", () => "rejected")
        .encode("series", () => "rejected")
        .axis("y", { title: null })
        .scale("y", { nice: true });
       

      // BARRES TOTAL
      chart
        .interval()
        .encode("x", "label")
        .encode("y", "total")
        .encode("color", () => "total")
        .encode("series", () => "total")
        .axis("y", { title: null })
        .scale("y", { nice: true });

        

      // LIGNE CLOSED + % + TOOLTIP
      chart
        .line()
        .encode("x", "label")
        .encode("y", "closed")
        .encode("color", () => "closed")
        .scale("series", { independent: true })
        .scale("y", { key: "2" })
        .axis("y", {
          title: "Pourcentage %",
          position: "right",
          key: "right",
        })
        .tooltip({
          title: (d) => d.label,
          items: [
            {
              field: "closed",
              name: "Closed",
              valueFormatter: (v) => `${v}%`,
            },
          ],
        })
        .label({
          text: "closed",
          formatter: (d) => (d === 0 ? "" : d + "%"),
          position: "top",
          offset: 5,
          style: {
            fill: "#000000",
            fontSize: 12,
            fontWeight: "bold",
          },
        });
        
      chart.render();
    } catch (error) {
      console.error("Erreur statistiques:", error);
    }
  };

  if (user?.role_id) {
    launchStatistique();
  }
  //console.log("selectedDate",selectedDate)
  return () => {
    if (chart) chart.destroy();
  };
}, [selectedDate, dispatch, user?.role_id,selectedCompany]);

  return (
    <div className="p-4">
      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        {/* Select Entreprise */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Entreprise
          </label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
          >
             <option  value={""}>
                sélectionne une entreprise
              </option>
            {company.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Période */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Période
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value)
              // setSelectedDate(null)
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            <option value="jour">Jour</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
            <option value="annee">Année</option>
          </select>
        </div>

        {/* Input contextuel */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {selectedPeriod === "jour" && "Sélectionner un jour"}
            {selectedPeriod === "semaine" && "Sélectionner une semaine"}
            {selectedPeriod === "mois" && "Sélectionner un mois"}
            {selectedPeriod === "annee" && "Sélectionner une année"}
          </label>
          {renderDateInput()}
        </div>
      </div>

      {/* Graphique */}
      <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
    </div>
  );
}