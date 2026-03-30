import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTypeTickets ,fetchTypeTickets,updateTypeTickets} from "../../store/slices/typeTickets";
import { closeModal } from "../../store/slices/modalSlice";
import Button from "../../component/Button";
import Swal from "sweetalert2";

export default function FormTypeTicket({ typeTicket = null }) {
  const dispatch = useDispatch();

  const [label, setLabel] = useState("");
  const [description,setDescription] = useState("");

  // 🔹 Si on est en mode édition, remplir le champ
  useEffect(() => {
    if (typeTicket) {
      setLabel(typeTicket.label || "");
      setDescription(typeTicket.description || "");
    }
  }, [typeTicket]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!label.trim()) return;

    if (typeTicket) {
      // Mode édition
      //console.log("editer",{ id: typeTicket.id, label })
      const response = await dispatch(updateTypeTickets({ id: typeTicket.id, dataForUpdate:{label,description} }));
      //console.log("REPONSE_EDIT",response)
      if(response.payload.status){
      Swal.fire({
            icon: "success",
            title: "Enregistrer",
            timer: 1500,
            showConfirmButton: false,
          });
          await dispatch(fetchTypeTickets())
          dispatch(closeModal());
      }
    } else {
      // Mode création
      const response = await dispatch(addTypeTickets({label,description}));
      //console.log("RESPONSE_ADD_typeTicket",response)
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
          await dispatch(fetchTypeTickets())
      }
      //console.log("responseROLEADD",response.payload.status)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6 flex-col">
      <input
        type="text"
        placeholder="Libellé"
        className="border rounded-lg px-4 py-2 w-full"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <textarea name="" id=""
      type="text"
        placeholder="Description"
        className="border rounded-lg px-4 py-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <Button
        disabled={!label || !description}
        type="submit"
        label={typeTicket ? "Modifier" : "Ajouter"}
      />
    </form>
  );
}


