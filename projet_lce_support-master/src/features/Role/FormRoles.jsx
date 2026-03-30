import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRole ,fetchRoles} from "../../store/slices/roleSlice";
import Button from "../../component/Button";
import Swal from "sweetalert2";

export default function FormRoles({ role = null }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  // 🔹 Si on est en mode édition, remplir le champ
  useEffect(() => {
    if (role) {
      setTitle(role.title || "");
    }
  }, [role]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (role) {
      // Mode édition
      //console.log("editer",role)
    //   dispatch(updateRole({ id: role.id, name }));
    } else {
      // Mode création
      const response = await dispatch(addRole({ title }));
      if(response.payload.status){
      Swal.fire({
            icon: "success",
            title: "Enregistrer",
            timer: 1500,
            showConfirmButton: false,
          });
          setTitle('')
          await dispatch(fetchRoles())
      }
      //console.log("responseROLEADD",response.payload.status)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Ajouter un role"
        className="border rounded-lg px-4 py-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        disabled={!title}
        type="submit"
        label={role ? "Modifier" : "Ajouter+"}
      />
    </form>
  );
}
