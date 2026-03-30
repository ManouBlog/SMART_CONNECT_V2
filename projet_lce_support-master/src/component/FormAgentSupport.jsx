import React, { useState, useEffect } from "react";
import { addagentSupport,fetchagentSupport,updateagentsupport } from "../store/slices/agentSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { closeModal } from "../store/slices/modalSlice";

const FormAgentSupport = ({ agentSupport = null}) => {
  const isEditMode = !!agentSupport;
 const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role_id: 4,
    password:"",
    matricule:""
  });

  // 👇 Pré-remplissage si company existe
useEffect(() => {
  if (agentSupport && Object.keys(agentSupport).length > 0) {
    setFormData(prev => ({
      ...prev,
      first_name: agentSupport.first_name || agentSupport.name || "",
      last_name: agentSupport.last_name || "",
      email: agentSupport.email || "",
      phone: agentSupport.phone || "",
      role_id: agentSupport.role_id, 
      matricule: agentSupport.matricule || ""
    }));
  }
}, [agentSupport]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
  e.preventDefault();
  
  // Transformation formData → JSON simple
  const dataForUpdate = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    role_id: formData.role_id,
    password: formData.password,
    matricule: formData.matricule,
  };

  // Nettoyage des valeurs vides (même logique)
  Object.keys(dataForUpdate).forEach(key => {
    if (dataForUpdate[key] === null || dataForUpdate[key] === undefined || dataForUpdate[key] === "") {
      delete dataForUpdate[key];
    }
  });

  if(agentSupport){
    const response = await dispatch(updateagentsupport({id:agentSupport.id, dataForUpdate}))
    Swal.fire('Info', response.payload.message, 'info');
    if(response.payload.status){
      dispatch(fetchagentSupport())
      dispatch(closeModal())
    }
  } else {
    //console.log('add', dataForUpdate)
    const response = await dispatch(addagentSupport(dataForUpdate))
    Swal.fire('Info', response.payload.message, 'info');
    if(response.payload.status){
      dispatch(fetchagentSupport())
      dispatch(closeModal())
    }
    //console.log("handleSubmit_registre entreprise", response)
  }
};


//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const payload = new FormData();
//   Object.entries({
//   first_name: formData.first_name,
//   last_name: formData.last_name,
//   email: formData.email,
//   phone: formData.phone,
//   role_id: formData.role_id,
//   password: formData.password,
//   matricule: formData.matricule,
// }).forEach(([key, value]) => {
//   if (value !== null && value !== undefined && value !== "") {
//     payload.append(key, value);
//   }
// });
//     if(agentSupport){
//          const response = await dispatch(updateagentsupport({id:agentSupport.id,dataForUpdate:payload}))
//     Swal.fire('Info', response.payload.message, 'info');
//     if(response.payload.status){
//       dispatch(fetchagentSupport())
//       dispatch(closeModal())
//     }
//     }else{
//     //console.log('add',payload)
//     const response = await dispatch(addagentSupport(payload))
//     Swal.fire('Info', response.payload.message, 'info');
//     if(response.payload.status){
//       dispatch(fetchagentSupport())
//       dispatch(closeModal())
//     }
//     //console.log("handleSubmit_registre entreprise",response)
//     }
//   };

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
  disabled={formData.first_name}
  name="first_name"
  value={formData.first_name}
  onChange={handleChange}
  required
  className={`
    w-full px-4 py-2 border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all
    ${formData.first_name 
      ? 'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed'
      : 'bg-white hover:border-gray-400 shadow-sm'
    }
  `}
  placeholder="Pierre"
/>

    </div>
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Nom <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="last_name"
        disabled={formData.last_name}
        value={formData.last_name}
        onChange={handleChange}
        required
      
 className={`
    w-full px-4 py-2 border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-[#E27B1B] focus:border-transparent transition-all
    ${formData.last_name 
      ? 'disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed'
      : 'bg-white hover:border-gray-400 shadow-sm'
    }
  `}
        placeholder="Kadjo"
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
        placeholder="pierre.kadjo@support.ci"
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
        placeholder="01 23 45 67"
      />
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
     <div>
      <label className="block text-gray-700 text-sm font-medium mb-2">
        matricule <span className="text-red-500">*</span>
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
    {!agentSupport && <div>
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
    </div> }
  </div>
  {/* 👇 UNIQUEMENT le bouton submit (pas de reset) */}
  <div className="flex justify-end py-5">
    <button
      type="submit"
      className="px-8 py-2 bg-[#E27B1B] text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
    >
      {isEditMode ? "Modifier" : "Enregistrer"}
    </button>
  </div>
</form>

  );
};

export default FormAgentSupport;