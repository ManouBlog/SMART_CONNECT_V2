import React, { useState, useEffect } from "react";
import { Steps } from "primereact/steps";
import { addCompany, fetchCompany, updateCompany } from "../store/slices/companySlice";
import Swal from "sweetalert2";
import { closeModal } from "../store/slices/modalSlice";
import { fetchFormules } from "../store/slices/formuleSlice";
import { fetchProduct } from '../store/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import  dayjs  from "dayjs";
import { ContractFile } from "../pages/ADMINLCE/features/adminScreen/CompanyDetail";


const EntrepriseForm = ({ company = null }) => {
  const isEditMode = !!company;
  const dispatch = useDispatch();
    const {Formules} = useSelector((state)=>state.formules)
    const {Products} = useSelector((state)=>state.products)
  const [products, setProducts] = useState([
    {
      name: '',
      plan_id: '',
      contract_type: 'normal',
      contract_attachment: null,
      date_debut: '',
      date_fin: '',
    },
  ]);

  const handleAddItem = () => {
    setProducts([
      ...products,
      {
        name: '',
        plan_id: '',
        contract_type: 'normal',
        contract_attachment: null,
        date_debut: '',
        date_fin: '',
      },
    ]);
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [companyProduct,setCompanyProduct] = useState([])
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    location: "",
    logo: null,
    plan_id: "",
    admin_first_name: "",
    admin_last_name:"",
    admin_email: "",
    date_debut:"",
    date_fin:"",
    pieceJointes:null,
    admin_password: "",
    admin_phone:"",
  });
    const handleRemoveItem = (index) => {
      //console.log("handleRemoveItem",index)
    const newproducts = products.filter((_, i) => i !== index);
    setProducts(newproducts);
  };

  const handleChangeProducts = (index, field, value) => {
    const newproducts = [...products];
    newproducts[index][field] = value;
    setProducts(newproducts);
  };

  const handleFileChange = (index, file) => {
    const newproducts = [...products];
    newproducts[index].contract_attachment = file;
    setProducts(newproducts);
  };

  useEffect(()=>{
  dispatch(fetchFormules())
    dispatch(fetchProduct());
  },[dispatch])

  useEffect(() => {
    if (company) {
      //console.log("company",company)
     const productsOfCompany = company.products.map(item=>item.name)
      setCompanyProduct(productsOfCompany);
      setFormData((prev) => ({
        ...prev,
        company_name: company.name || "",
        company_email: company.email || "",
        company_phone: company.phone || "",
        location: company.location || "",
        admin_first_name: company.users.find(item=>{
          if(item.role_id === 2){
            return item.first_name
          }
         })?.first_name || '',
    admin_last_name:company.users.find(item=>{
          if(item.role_id === 2){
            return item.last_name
          }
         })?.last_name || '',
    admin_email: company.users.find(item=>{
          if(item.role_id === 2){
            return item.email
          }
         })?.email || '',
    admin_phone: company.users.find(item=>{
          if(item.role_id === 2){
            return item.email
          }
         })?.phone || '',
      }));
     const formattedProducts = company.products.flatMap((item) => {
  if (!item.subscription || item.subscription.length === 0) {
    return [
      {
        name: item.name || "",
        plan_id: "",
        contract_type: "normal",
        contract_attachment: null,
        date_debut: "",
        date_fin: "",
      },
    ];
  }

  return item.subscription.map((sub) => ({
    name: item.name || "",
    plan_id: sub?.plan_id || "",
    contract_type: sub?.contract_type || "normal",
    contract_attachment: sub?.contract_file_url || null,
    date_debut: sub?.starts_at
      ? dayjs(sub.starts_at).format("YYYY-MM-DD")
      : "",
    date_fin: sub?.ends_at
      ? dayjs(sub.ends_at).format("YYYY-MM-DD")
      : "",
    contract:true,
  }));
});
//console.log("formattedProducts",formattedProducts)
//console.log('companyProduct',companyProduct)
setProducts(formattedProducts);
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    let newErrors = {};

    if (activeIndex === 0) {
      if (!formData.company_name) newErrors.company_name = "Nom requis";
      if (!formData.company_email) newErrors.email = "Email requis";
      if (!formData.company_phone) newErrors.phone = "Téléphone requis";
      if (!formData.location) newErrors.location = "Localisation requise";
    }
if (activeIndex === 1) {
  const invalidProduct = products.find(item =>
    !item.contract_attachment ||
    !item.plan_id ||
    !item.date_debut ||
    !item.date_fin
  );

  if (invalidProduct) {
    newErrors.products = 'Tous les produits doivent être complets';
  }
}

    if (activeIndex === 2) {
      if (!formData.admin_first_name) newErrors.admin_first_name = "Nom admin requis";
      if(!formData.admin_last_name) newErrors.admin_last_name = "Prénoms admin requis";
      if (!formData.admin_email) newErrors.admin_email = "Email admin requis";
      if (!formData.admin_password) newErrors.admin_password = "Mot de passe requis";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setActiveIndex((prev) => prev - 1);
  };

  const isStepValid = () => {
  if (activeIndex === 0) {
    return (
      formData.company_name &&
      formData.company_email &&
      formData.company_phone &&
      formData.location
    );
  }

  if (activeIndex === 1) {
   return (
  products.some(item =>
    item.name ||
    item.plan_id ||
    item.contract_type ||
    item.contract_attachment ||
    item.date_debut ||
    item.date_fin
  )
   )
  }

  if (activeIndex === 2) {
    return (
      formData.admin_first_name &&
      formData.admin_last_name &&
      formData.admin_email &&
      formData.admin_password
    );
  }

  return false;
};

const handleSubmit = async () => {
  //console.log("products", products);

  if (!validateStep()) return;

  const payload = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value) payload.append(key, value);
  });

  // 🔴 ajout des products dans le FormData
  products.forEach((product, index) => {
    payload.append(`products[${index}][name]`, product.name);
    payload.append(`products[${index}][plan_id]`, product.plan_id);
    payload.append(`products[${index}][contract_type]`, product.contract_type);
    payload.append(`products[${index}][starts_at]`, product.date_debut);
    payload.append(`products[${index}][ends_at]`, product.date_fin);

    if (product.contract_attachment) {
      payload.append(
        `products[${index}][contract_attachment]`,
        product.contract_attachment
      );
    }
  });

  let response;

  if (company) {
    response = await dispatch(
      updateCompany({
        id: company.id,
        dataForUpdate: payload,
        method: "post",
      })
    );
  } else {
    response = await dispatch(addCompany(payload));
  }

  Swal.fire("Info", response?.payload?.message, "info");

  if (response.payload.status) {
   dispatch(fetchCompany());
 
    dispatch(closeModal());
  }
};

  // const handleSubmit = async () => {
  //   //console.log("products",products)
  //   if (!validateStep()) return;

  //   const payload = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (value) payload.append(key, value);
  //   });

    
  //   let response;
  //   if (company) {
  //     response = await dispatch(
  //       updateCompany({ id: company.id, dataForUpdate: payload, method: "post" })
  //     );
  //   } else {
  //     response = await dispatch(addCompany(payload));
  //   }

  //   Swal.fire("Info", response?.payload?.message, "info");

  //   if (response.payload.status) {
  //     dispatch(fetchCompany());
  //     dispatch(closeModal());
  //   }
  // };

  const steps = [
    { label: "Raison sociale" },
    { label: "Choisir la formule" },
    { label: "infos de l'admin" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg">

      {/* Highlight Step actif */}
      <Steps
        model={steps}
        activeIndex={activeIndex}
        readOnly
        selected
        className="mb-8 custom-steps"
      />

      {/* STEP 1 */}
      {activeIndex === 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Paire 1: Nom + Email */}
  <div className="space-y-2">
    <label className="block text-sm mb-2">Entreprise *</label>
    <input
      type="text"
      name="company_name"
      value={formData.company_name}
      onChange={handleChange}
      placeholder="Nom entreprise"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.company_name ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.company_name && <small className="text-red-500 text-sm">{errors.company_name}</small>}
  </div>

  <div className="space-y-2">
    <label className="block text-sm mb-2">Email de l'entreprise *</label>
    <input
      type="email"
      name="company_email"
      value={formData.company_email}
      onChange={handleChange}
      placeholder="Email"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.company_email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.company_email && <small className="text-red-500 text-sm">{errors.company_email}</small>}
  </div>

  {/* Paire 2: Téléphone + Localisation */}
  <div className="space-y-2">
    <label className="block text-sm mb-2">Contact téléphonique *</label>
    <input
      type="tel"
      name="company_phone"
      value={formData.company_phone}
      onChange={handleChange}
      placeholder="Téléphone"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.company_phone ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.company_phone && <small className="text-red-500 text-sm">{errors.company_phone}</small>}
  </div>

  <div className="space-y-2">
    <label className="block text-sm mb-2">Localisation *</label>
    <input
      type="text"
      name="location"
      value={formData.location}
      onChange={handleChange}
      placeholder="Localisation"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.location ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.location && <small className="text-red-500 text-sm">{errors.location}</small>}
  </div>
  <div className="space-y-2">
  <label className="block text-sm mb-2">Logo</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        logo: e.target.files[0],
      }))
    }
    className="w-full border p-2 rounded"
  />
</div>
</div>

      )}

      {/* STEP 2 */}
      {activeIndex === 1 && (
         <>
      {products.map((item, index) => (
        <div key={index} className='my-5'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Produit</label>
               <select
                value={item.name}
                disabled={item?.contract}
                onChange={(e) => handleChangeProducts(index, 'name', e.target.value)}
                className={`mt-1 block w-full border rounded-md shadow-sm p-2
    ${item?.contract 
      ? "bg-gray-300 cursor-not-allowed disabled" 
      : "border-gray-300"}
  `}
              >
                <option value="">--Sélectionne un produit---</option>
                {Products.filter((item)=>{
                  if(!item.companies.length){
                    return item;
                  }
                  if(company){
                    return item
                  }
                })
                .map((item,index)=>(
               <option key={index} 
                 disabled={companyProduct.some(compProduct=>compProduct == item.name)}
                 value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Formule de souscription</label>
               <select
                value={item.plan_id}
                onChange={(e) => handleChangeProducts(index, 'plan_id', e.target.value)}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2
    ${item?.contract 
      ? "bg-gray-300 cursor-not-allowed disabled" 
      : "border-gray-300"}
  `}
              >
                <option value="">--Sélectionne une formule---</option>
                {Formules.map((item,index)=>(
                 <option key={index} 
                 value={item.id}>{item.label}</option>
                ))}
            
              </select>
              
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type de Contrat</label>
              <select
                value={item.contract_type}
                onChange={(e) => handleChangeProducts(index, 'contract_type', e.target.value)}
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2
    ${item?.contract 
      ? "bg-gray-300 cursor-not-allowed disabled" 
      : "border-gray-300"}
  `}
              >
                <option value="normal">Normal</option>
                <option value="loi">LOI</option>
              </select>
            </div>
            {item?.contract ? <ContractFile 
            contract={item?.contract_attachment}
            />:<div>
              <label className="block text-sm font-medium text-gray-700">Pièce Jointe Contrat</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {item.contract_attachment && (
                <p className="text-sm text-gray-500 mt-1">{item.contract_attachment.name}</p>
              )}
            </div>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Début</label>
              <input
                type="date"
                value={item.date_debut}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleChangeProducts(index, 'date_debut', e.target.value)}
               
                  className={`mt-1 block w-full border rounded-md shadow-sm p-2
    ${item?.contract 
      ? "bg-gray-300 cursor-not-allowed disabled" 
      : "border-gray-300"}
  `}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Fin</label>
              <input
                type="date"
                value={item.date_fin}
                min={item.date_debut}
                onChange={(e) => handleChangeProducts(index, 'date_fin', e.target.value)}
               className={`mt-1 block w-full border rounded-md shadow-sm p-2
    ${item?.contract 
      ? "bg-gray-300 cursor-not-allowed disabled" 
      : "border-gray-300"}
  `}
              />
            </div>
          </div>
          {products.length > 1 && (
            
           <button
  onClick={() => handleRemoveItem(index)}
  disabled={item?.contract}
  className={`mt-4 px-4 py-2 rounded-md text-white 
    ${item?.contract 
      ? "bg-red-300 cursor-not-allowed disabled" 
      : "bg-red-500 hover:bg-red-600"}
  `}
>
  Supprimer
</button>
          )}
        </div>
      ))}
      <div className='flex justify-end my-5'>
        <button
        onClick={handleAddItem}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
      >
        Ajouter un autre produit
      </button>
      </div>
      
    </>
      )}

      {/* STEP 3 */}
      {activeIndex === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Paire 1: Nom admin + Email admin */}
  <div className="space-y-2">
    <label className="block text-sm mb-2">Nom</label>
    <input
      type="text"
      name="admin_first_name"
      value={formData.admin_first_name}
      onChange={handleChange}
      placeholder="Nom admin"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.admin_first_name ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.admin_first_name && <small className="text-red-500 text-sm">{errors.admin_first_name}</small>}
  </div>

   <div className="space-y-2">
    <label className="block text-sm mb-2">Prénoms</label>
    <input
      type="text"
      name="admin_last_name"
      value={formData.admin_last_name}
      onChange={handleChange}
      placeholder="Prénoms admin"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.admin_last_name ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.admin_last_name && <small className="text-red-500 text-sm">{errors.admin_last_name}</small>}
  </div>

  <div className="space-y-2">
    <label className="block text-sm mb-2">Email</label>
    <input
      type="email"
      name="admin_email"
      value={formData.admin_email}
      onChange={handleChange}
      placeholder="Email admin"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.admin_email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.admin_email && <small className="text-red-500 text-sm">{errors.admin_email}</small>}
  </div>
   <div className="space-y-2">
    <label className="block text-sm mb-2">Numéro de téléphone</label>
   <input
      type="number"
      name="admin_phone"
      value={formData.admin_phone}
      onChange={handleChange}
      placeholder="Numéro téléphonique"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.admin_email ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
  </div>
<div className="space-y-2">
  <label className="block text-sm mb-2">Mot de passe (au moins 6chiifres)</label>
 <input
      type="password"
      name="admin_password"
      value={formData.admin_password}
      onChange={handleChange}
      placeholder="Mot de passe"
      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.admin_password ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-300'}`}
    />
    {errors.admin_password && <small className="text-red-500 text-sm">{errors.admin_password}</small>}
</div>
  {/* Champ seul: Mot de passe (largeur pleine sur desktop) */}
 
</div>

      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {activeIndex > 0 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Précédent
          </button>
        )}

        {activeIndex < 2 ? (
          <button onClick={nextStep} disabled={!isStepValid()}
  className={`px-4 py-2 rounded text-white transition
    ${
      isStepValid()
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-gray-400 cursor-not-allowed opacity-60"
    }`}>
            Suivant
          </button>
        ) : (
          <button 
          disabled={!isStepValid()}
          onClick={handleSubmit} 
          className={`px-4 py-2 rounded text-white transition
    ${
      isStepValid()
        ? "px-4 py-2 bg-green-600 text-white rounded"
        : "bg-gray-400 cursor-not-allowed opacity-60"
    }`}
    >
            {isEditMode ? "Mettre à jour" : "Enregistrer"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EntrepriseForm;