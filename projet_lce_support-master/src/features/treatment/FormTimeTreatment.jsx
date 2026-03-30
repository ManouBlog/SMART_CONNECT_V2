import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormules,
} from "../../store/slices/formuleSlice";
import { closeModal } from "../../store/slices/modalSlice";
import { addTimeTreatment,fetchTimeTreatment,updateTimeTreatment } from "../../store/slices/timeTreatment";
import Button from "../../component/Button";
import { fetchNiveauDifficult } from "../../store/slices/niveauDifficult";
import Swal from "sweetalert2";

export default function FormTimeTreatment({ timeTreatment = null }) {
  const dispatch = useDispatch();
  const {Formules} = useSelector(state=>state.formules)
  const {niveauDifficulte}=useSelector(state=>state.niveauDifficult)
  const [response_time_minutes, setResponse_time_minutes] = useState("");
  const [resolution_time_minutes, setResolution_time_minutes] = useState("");
  const [severityId, setSeverityId] = useState("");
  const [planId, setPlanId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
  dispatch(fetchNiveauDifficult())
  dispatch(fetchFormules())
  },[dispatch])

  // 🔹 Pré-remplissage si édition
  useEffect(() => {
    if (timeTreatment) {
      setResponse_time_minutes(timeTreatment.response_time_minutes || "");
      setResolution_time_minutes(timeTreatment.resolution_time_minutes || "");
      setSeverityId(timeTreatment.severity_id || "");
      setPlanId(timeTreatment.plan_id || "");
    }
  }, [timeTreatment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!severityId || !planId || !response_time_minutes || !resolution_time_minutes) return;

    if (
  Number(response_time_minutes) > Number(resolution_time_minutes)
) {
  Swal.fire({
    icon: "warning",
    title: "Temps invalide",
    text: "Le temps de réponse ne peut pas être supérieur au temps de résolution",
  });
  return;
}

    const data = {
      severity_id: severityId,
      plan_id: planId,
      response_time_minutes: response_time_minutes || null,
      resolution_time_minutes: resolution_time_minutes || null,
    };
  //console.log("Données à envoyer :", data); // Debug
    try {
      setLoading(true);

      let response;

      if (timeTreatment) {
        // 🔹 Mode édition
        response = await dispatch(
          updateTimeTreatment({
            id: timeTreatment.id,
            dataForUpdate: data,
          })
        );
      } else {
        // 🔹 Mode création
        response = await dispatch(addTimeTreatment(data));
      }

      if (response.payload?.status) {
        Swal.fire({
          icon: "success",
          title: "Enregistré avec succès",
          timer: 1500,
          showConfirmButton: false,
        });

        await dispatch(fetchTimeTreatment());
        dispatch(closeModal());

        // Reset si création
        if (!timeTreatment) {
        
          setResponse_time_minutes("");
          setResolution_time_minutes("");
          setSeverityId("");
          setPlanId("");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-6 p-4"
>
  {/* Champs en deux colonnes */}
  <div className="flex flex-wrap -mx-2">
    
    {/* Temps de réponse */}
    <div className="w-full md:w-1/2 px-2 mb-4">
      <label className="block mb-1 text-sm font-medium">
        Temps de réponse (min)
      </label>
      <input
        type="number"
        value={response_time_minutes}
        onChange={(e) => setResponse_time_minutes(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    {/* Temps de résolution */}
    <div className="w-full md:w-1/2 px-2 mb-4">
      <label className="block mb-1 text-sm font-medium">
        Temps de résolution (min)
      </label>
      <input
        type="number"
        value={resolution_time_minutes}
        onChange={(e) => setResolution_time_minutes(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>

    {/* Formule */}
    <div className="w-full md:w-1/2 px-2 mb-4">
      <label className="block mb-1 text-sm font-medium">
        Formule
      </label>
      <select
        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={planId}
        onChange={(e) => setPlanId(e.target.value)}
      >
        <option value="">Choisir une formule</option>
        {Formules.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.label}
          </option>
        ))}
      </select>
    </div>

    {/* Niveau de Sévérité */}
    <div className="w-full md:w-1/2 px-2 mb-4">
      <label className="block mb-1 text-sm font-medium">
        Niveau de Sévérité
      </label>
      <select
        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={severityId}
        onChange={(e) => setSeverityId(e.target.value)}
      >
        <option value="">Choisir un niveau</option>
        {niveauDifficulte.map((sev) => (
          <option key={sev.id} value={sev.id}>
            {sev.label}
          </option>
        ))}
      </select>
    </div>

  </div>

  {/* Submit */}
  <div className="flex justify-center">
<Button
    disabled={
      !severityId ||
      !planId ||
      !response_time_minutes ||
      !resolution_time_minutes ||
      loading
    }
    type="submit"
    label={
      loading
        ? "Enregistrement..."
        : timeTreatment
        ? "Modifier"
        : "Ajouter"
    }
  />
  </div>
  
</form>
  );
}