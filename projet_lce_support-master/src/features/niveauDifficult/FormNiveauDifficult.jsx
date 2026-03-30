import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNiveauDifficult ,fetchNiveauDifficult,updateNiveauDifficult} from "../../store/slices/niveauDifficult";
import { closeModal } from "../../store/slices/modalSlice";
import Button from "../../component/Button";
import Swal from "sweetalert2";

export default function FormNiveauDifficult({ niveau = null }) {
  const dispatch = useDispatch();

  const [label, setLabel] = useState("");

  // 🔹 Si on est en mode édition, remplir le champ
  useEffect(() => {
    if (niveau) {
      setLabel(niveau.label || "");
    }
  }, [niveau]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!label.trim()) return;

    if (niveau) {
      // Mode édition
      //console.log("editer",{ id: niveau.id, label })
      const response = await dispatch(updateNiveauDifficult({ id: niveau.id, dataForUpdate:label }));
      //console.log("REPONSE_EDIT",response)
      if(response.payload.status){
      Swal.fire({
            icon: "success",
            title: "Enregistrer",
            timer: 1500,
            showConfirmButton: false,
          });
          await dispatch(fetchNiveauDifficult())
          dispatch(closeModal());
      }
    } else {
      // Mode création
      const response = await dispatch(addNiveauDifficult({ label }));
      if(response.payload.status){
      Swal.fire({
            icon: "success",
            title: "Enregistrer",
            timer: 1500,
            showConfirmButton: false,
          });
          setLabel('')
          await dispatch(fetchNiveauDifficult())
      }
      //console.log("responseROLEADD",response.payload.status)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Ajouter un niveau"
        className="border rounded-lg px-4 py-2 w-full"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Button
        disabled={!label}
        type="submit"
        label={niveau ? "Modifier" : "Ajouter+"}
      />
    </form>
  );
}

