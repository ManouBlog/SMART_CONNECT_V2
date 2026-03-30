import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../store/slices/modalSlice";
// import { adduser,fetchuser,updateuser } from "../../../store/slices/userSlice";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../../../component/Button";
import { fetchRoles } from "../../../../store/slices/roleSlice";

export default function ScreenUpdate({ user = null }) {
  const dispatch = useDispatch();
  const {roles}=useSelector(state=>state.roles)
  const [loading, setLoading] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password,setPassword] = useState('');
  const [matricule,setMatricule] = useState("");
   const [job_profile,setJob_profile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
  dispatch(fetchRoles())
  },[dispatch])

  // 🔹 Pré-remplissage si édition
  useEffect(() => {
    if (user) {
    setEmail(user.email || "");
      setNom(user.first_name || "");
      setPrenom(user.last_name || "");
      setRoleId(user.role?.id || "");
      setMatricule(user?.matricule || "");
      setJob_profile(user?.job_profile || "");
    }
    
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !prenom || !email) return;

    const data = {
      first_name: nom,
      last_name: prenom,
      email: email,
      password:password,
      matricule:matricule,
      job_profile:job_profile
    };
  //console.log("Données à envoyer :", data); // Debug
    try {
      setLoading(true);

      let response;

      if (user) {
        // 🔹 Mode édition
        response = await dispatch(
          updateuser({
            id: user.id,
            dataForUpdate: data,
          })
        );
      } else {
        // 🔹 Mode création
        response = await dispatch(adduser(data));
      }

      if (response.payload?.status) {
        Swal.fire({
          icon: "success",
          title: "Enregistré avec succès",
          timer: 1500,
          showConfirmButton: false,
        });

        await dispatch(fetchuser());
        dispatch(closeModal());

        // Reset si création
        if (!user) {
          setEmail("");
          setNom("");
          setPrenom("");
            setRoleId("");
            setPassword("");
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
  className="flex flex-wrap p-4"
>
    {user?.role_id === 4 &&  <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Matricule
    </label>
   <input
  type="text"
  value={matricule}
  onChange={(e) => setMatricule(e.target.value)}
  disabled={user?.role_id === 4} // ou votre condition de désactivation
  className={`
    w-full px-4 py-2 border rounded-lg text-sm
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
    transition-all duration-200
    
    ${user?.role_id === 4
      ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
      : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
    }
  `}
/>
  </div>}
 
  {/* Nom */}
  <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Nom
    </label>
    <input
      type="text"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>

  {/* Prénoms */}
  <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Prénoms
    </label>
    <input
      type="text"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>

  {/* Email */}
  <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Email
    </label>
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
    {/* matricule */}
    {
      user.role_id === 3 && 
      <>
      <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Matricule
    </label>
    <input
      type="text"
      value={matricule}
      onChange={(e) => setMatricule(e.target.value)}
     disabled
     className="border rounded-lg
      disabled:bg-gray-100
      disabled:text-gray-400
      disabled:border-gray-200
      disabled:cursor-not-allowed
      px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
   <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Poste
    </label>
    <input
      type="text"
      value={job_profile}
      onChange={(e) => setJob_profile(e.target.value)}
      disabled
     className="border rounded-lg
      disabled:bg-gray-100
      disabled:text-gray-400
      disabled:border-gray-200
      disabled:cursor-not-allowed
      px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
  </>
    }
 

  {/* Role */}
  <div className="w-full md:w-1/2 pr-2 mb-4">
    <label className="block mb-1 text-sm font-medium">
      Role
    </label>
    <select
      disabled
      className="border rounded-lg
      disabled:bg-gray-100
      disabled:text-gray-400
      disabled:border-gray-200
      disabled:cursor-not-allowed
      px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      value={roleId}
      onChange={(e) => setRoleId(e.target.value)}
    >
      <option value="">Choisir une formule</option>
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.title}
        </option>
      ))}
    </select>
  </div>

    {/* password */}
 <div className="w-full md:w-1/2 pr-2 mb-4">
  <label className="block mb-1 text-sm font-medium">
    Mot de passe
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>

  {/* Button */}
  <div className="w-full flex justify-center mt-2">
    <Button
      disabled={!nom || !prenom || !email || loading}
      type="submit"
      label={
        loading
          ? "Enregistrement..."
          : user
          ? "Modifier"
          : "Ajouter"
      }
    />
  </div>
</form>
  );
}
