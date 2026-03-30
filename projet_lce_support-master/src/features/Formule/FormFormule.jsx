import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFormule ,fetchFormules,updateFormule} from "../../store/slices/formuleSlice";
import { closeModal } from "../../store/slices/modalSlice";
import Button from "../../component/Button";
import Swal from "sweetalert2";

export default function FormFormule({ formule = null }) {
  const dispatch = useDispatch();

  const [label, setLabel] = useState("");
  const [description,setDescription] = useState("");
  // const [duration_days,setDuration_days] = useState("");

  // 🔹 Si on est en mode édition, remplir le champ
  useEffect(() => {
    if (formule) {
      setLabel(formule.label || "");
      setDescription(formule.description || "");
      // setDuration_days(formule.duration_days || "");
    }

  }, [formule]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!label.trim()) return;

    if (formule) {
      // Mode édition
      //console.log("editer",{ id: formule.id, label })
      const response = await dispatch(updateFormule({ id: formule.id, dataForUpdate:{label,description} }));
      //console.log("REPONSE_EDIT",response)
      Swal.fire({
            icon: response?.payload?.status ? "success":"info",
            title: response?.payload?.message,
            timer: 1500,
            showConfirmButton: false,
          });
      if(response.payload.status){
          await dispatch(fetchFormules())
          dispatch(closeModal());
      }
    } else {
      // Mode création
      const response = await dispatch(addFormule({label,description}));
      //console.log("RESPONSE_ADD_FORMULE",response)
      if(response.payload.status){
      Swal.fire({
            icon: "success",
            title: "Enregistrer",
            timer: 1500,
            showConfirmButton: false,
          });
            setLabel("");
      setDescription("");
           dispatch(closeModal());
          await dispatch(fetchFormules())
      }
      //console.log("responseROLEADD",response.payload.status)
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
            Libellé
          </label>
           <input
      type="text"
      placeholder="Libellé"
      className="border rounded-lg px-4 py-2 w-full"
      value={label}
      onChange={(e) => setLabel(e.target.value)}
    />
         
        </div>
    
        {/* Temps de résolution */}
        {/* <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block mb-1 text-sm font-medium">
            Echéance (Jour)
          </label>
          <input
      type="number"
      placeholder="Échéance"
      className="border rounded-lg px-4 py-2 w-full"
      value={duration_days}
      onChange={(e) => setDuration_days(e.target.value)}
    />
        </div> */}
    
        {/* Formule */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block mb-1 text-sm font-medium">
            Description
          </label>
           <textarea
      placeholder="Description"
      className="border rounded-lg px-4 py-2 w-full"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></textarea>
        </div>

    <div className="w-full flex justify-center">
    <Button
      disabled={!label || !description || !duration_days}
      type="submit"
      label={formule ? "Modifier" : "Ajouter"}
    />
  </div>
      </div>
      
    </form>
  );
}


