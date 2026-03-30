import React, { useState, useEffect } from "react";
import { addUtilisateur,fetchUtilisateurs,updateUtilisateurs } from "../store/slices/utilisateurSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { closeModal } from "../store/slices/modalSlice";

const FormeUtilisateurs = ({ Utilisateurs = null}) => {
  const isEditMode = !!Utilisateurs;
  const {user} = useSelector(state=>state.authUser)
 const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_profile: "",
    matricule:"",
    company_id:user.company_id
  });

  // 👇 Pré-remplissage si company existe
useEffect(() => {
  if (Utilisateurs && Object.keys(Utilisateurs).length > 0) {
    setFormData(prev => ({
      ...prev,
      first_name: Utilisateurs.first_name || Utilisateurs.name || "",
      last_name: Utilisateurs.last_name || "",
      email: Utilisateurs.email || "",
      phone: Utilisateurs.phone || "",
      matricule: Utilisateurs.matricule || "",
      job_profile:  Utilisateurs.job_profile || "",
      company_id: Utilisateurs.company_id || ""
    }));
  }
}, [Utilisateurs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = new FormData();
  Object.entries({
  first_name: formData.first_name,
  last_name: formData.last_name,
  email: formData.email,
  phone: formData.phone,
   matricule: formData.matricule,
  job_profile: formData.job_profile,
  company_id: formData.company_id,
}).forEach(([key, value]) => {
  if (value !== null && value !== undefined && value !== "") {
    payload.append(key, value);
  }
});
    if(Utilisateurs){
         const response = await dispatch(updateUtilisateurs({id:Utilisateurs.id,dataForUpdate:payload}))
    Swal.fire('Info', response.payload.message, 'info');
    if(response.payload.status){
      dispatch(fetchUtilisateurs())
      dispatch(closeModal())
    }
    }else{
    //console.log('add',payload)
    const response = await dispatch(addUtilisateur(payload))
    Swal.fire('Info', response.payload.message, 'info');
    if(response.payload.status){
      dispatch(fetchUtilisateurs())
      dispatch(closeModal())
    }
    //console.log("handleSubmit_registre entreprise",response)
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className=" mx-auto bg-white rounded-lg p-8 shadow-lg"
>
  {/* 👇 Champs ingénieurs UNIQUEMENT */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Prénoms <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
       
      />
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Nom <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
       
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
      
      />
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Téléphone <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
     
      />
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Matricule<span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="matricule"
        value={formData.matricule}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
     
      />
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Profile <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="job_profile"
        value={formData.job_profile}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
     
      />
    </div>
  </div>
  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Mot de passe <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={!isEditMode}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all"
        placeholder={isEditMode ? "Laisser vide" : "Minimum 8 caractères"}
      />
    </div>
  </div> */}
  {/* 👇 UNIQUEMENT le bouton submit (pas de reset) */}
  <div className="flex justify-end py-5">
    <button
  disabled={
    !formData.first_name ||
    !formData.last_name ||
    !formData.email ||
    !formData.phone ||
    !formData.company_id
  }
  type="submit"
  className={`px-8 py-3 rounded-2xl transition-all font-medium shadow-lg
  ${
    !formData.first_name ||
    !formData.last_name ||
    !formData.email ||
    !formData.phone ||
    !formData.company_id
      ? "bg-gray-400 cursor-not-allowed opacity-60"
      : "bg-[#E27B1B] text-white hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-0.5"
  }`}
>
 {isEditMode ? "Modifier" : "Enregistrer"}
</button>
 
  </div>
</form>

  );
};

export default FormeUtilisateurs;
