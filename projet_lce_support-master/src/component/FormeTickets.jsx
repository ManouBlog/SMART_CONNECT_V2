import React, { useState, useEffect } from "react";
import { addTickets, fetchTickets } from "../store/slices/ticketsSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { closeModal } from "../store/slices/modalSlice";
import { fetchNiveauDifficult } from "../store/slices/niveauDifficult";
import {fetchTypeTickets} from "../store/slices/typeTickets";
import { fetchProduct } from "../store/slices/productSlice";

const FormeTickets = ({ tickets = null }) => {
  const isEditMode = !!tickets;
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authUser)
  const {typeTickets} = useSelector((state)=>state.typeTickets);
  const {niveauDifficulte} = useSelector((state)=>state.niveauDifficult);
  const {Products} = useSelector((state)=>state.products);

  const [formData, setFormData] = useState({
    severity_id: "",
    title: "",
    description: "",
    // company_id:user.company_id,
    ticket_type_id:"",
    product_id:"",
  });

  const [attachments, setAttachments] = useState([]);

  // Pré-remplissage si tickets existe
  useEffect(() => {
    if (tickets) {
      setFormData({
        severity_id: tickets.severity_id || "",
        title: tickets.title || "",
        description: tickets.description || "",
        //  company_id:tickets.company_id || "",
         ticket_type_id:tickets.ticket_type_id  || '',
         product_id:tickets.product_id || '',
         flag:tickets.flag || 0
      });
    }
  }, [tickets]);

  useEffect(()=>{
   dispatch(fetchNiveauDifficult())
   dispatch(fetchTypeTickets());
   dispatch(fetchProduct());
  },[dispatch])

  //console.log("niveauDifficulte",niveauDifficulte)

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttachmentsUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    // Champs simples
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        payload.append(key, value);
      }
    });

    // Attachments[]
    attachments.forEach((file) => {
      payload.append("attachments[]", file);
    });

    if (tickets) {
      const response = await dispatch(
        updateCompany({ id: tickets.id, dataForUpdate: payload, method: "post" })
      );

      Swal.fire("Info", response.payload.message, "info");

      if (response.payload.status) {
        dispatch(fetchTickets());
        dispatch(closeModal());
      }
    } else {
      const response = await dispatch(addTickets(payload));

      Swal.fire("Info", response.payload.message, "info");

      if (response.payload.status) {
        dispatch(fetchTickets());
        dispatch(closeModal());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-lg p-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    {/* Colonne 1: Severity + Titre */}
    <div className="space-y-6">
       {/* produits */}
      <div>
  <label className="block text-gray-700 text-sm font-medium mb-3">
    Produits *
  </label>
  <select
    name="product_id"
    value={formData.product_id}
    onChange={handleChange}
    disabled={!Products?.length}
    className={`
      w-full px-4 py-3 border border-gray-300 rounded-xl 
      focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
      transition-all bg-white
      ${!Products?.length 
        ? 'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200'
        : 'hover:border-gray-400 shadow-sm'
      }
    `}
  >
    {Products?.filter((item) =>
      item?.companies?.some(
        (compa) => compa?.pivot?.company_id == user?.company_id
      )
    ).length > 0 ? (
    <>
  <option value="">-- Sélectionner un produit --</option>

  {Products
    ?.filter((item) =>
      item?.companies?.some(
        (compa) => compa?.pivot?.company_id == user?.company_id
      )
    )
    .map((produit) => (
      <option key={produit.id} value={produit.id}>
        {produit.name}
      </option>
    ))}
</>
    ) : (
      <option value="" disabled>
        Aucun produit disponible
      </option>
    )}
  </select>
</div>

      {/* Severity */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Niveau de Sévérité *
        </label>
        <select
          name="severity_id"
          value={formData.severity_id}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
        >
          <option value="">-- Sélectionner un Niveau de Sévérité --</option>
          {niveauDifficulte?.map((severity) => (
            <option key={severity.id} value={severity.id}>
              {severity.label}
            </option>
          ))}
        </select>
      </div>
   
    </div>

    <div  className="space-y-6">
  {/* Severity */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Type de ticket *
        </label>
        <select
          name="ticket_type_id"
          value={formData.ticket_type_id }
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all bg-white"
        >
          <option value="">-- Sélectionner un type de ticket --</option>
          {typeTickets?.map((typeTicket) => (
            <option key={typeTicket.id} value={typeTicket.id}>
              {typeTicket.label}
            </option>
          ))}
        </select>
      </div>
      {/* Titre */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Objet *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
        />
      </div>
    </div>

    <div className="space-y-6">
   {/* Colonne 2: Description + Attachments */}
    <div>
      {/* Description */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all resize-vertical"
        />
      </div>

     
    </div>
    {/* Attachments */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Pièces jointes
        </label>
        <input
          type="file"
          multiple
          onChange={handleAttachmentsUpload}
          className="border p-3 cursor-pointer border-gray-300 rounded-xl w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 transition-all"
        />
      </div>
    </div>

  </div>

  {/* Bouton Submit */}
  <div className="flex justify-center pt-6">
  <button
  disabled={
    !formData.severity_id ||
    !formData.title ||
    !formData.description ||
    // !formData.company_id ||
    !formData.ticket_type_id
  }
  type="submit"
  className={`px-8 py-3 rounded-2xl transition-all font-medium shadow-lg
  ${
    !formData.severity_id ||
    !formData.title ||
    !formData.description ||
    // !formData.company_id ||
    !formData.ticket_type_id
      ? "bg-gray-400 cursor-not-allowed opacity-60"
      : "bg-[#E27B1B] text-white hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-0.5"
  }`}
>
  {isEditMode ? "Mettre à jour" : "Enregistrer"}
</button>
  </div>
</form>

  );
};

export default FormeTickets;