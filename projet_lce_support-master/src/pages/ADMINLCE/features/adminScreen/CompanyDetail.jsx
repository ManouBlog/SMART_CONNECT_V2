import React from "react";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import Swal from "sweetalert2";
import { approvedPerson,disapprovedPerson,fetchCompany,renouvelerContrat } from "../../../../store/slices/companySlice";
import { useDispatch,useSelector } from "react-redux";
// import {lien} from '../../../../config/apiconfig'
import { fetchFormules } from "../../../../store/slices/formuleSlice";
import { closeModal } from "../../../../store/slices/modalSlice";
import {fetchProduct} from '../../../../store/slices/productSlice'

// import { Dialog } from 'primereact/dialog';
        
import dayjs from "dayjs";
// import { FilePenLine,Eye,Trash } from 'lucide-react';
export default function CompanyDetail({ company = null }) {
  const dispatch = useDispatch()
const [modalVisible, setModalVisible] = React.useState(false);
const [selectedContract,setSelectedContract] = React.useState("");
   const [activeTab, setActiveTab] = React.useState("pending");
   const [showNewProductModal, setShowNewProductModal] = React.useState(false)
   //console.log("company", company);
const {
  name = "",
  email = "",
  phone = "",
  location = "",
  logo = null,
  users = [],
  pending_users = []
} = company || {};

const columnProducts = [
    { field: "name", header: "Produit"},
    { field: "id", header: "Statut", body: (row) => <span>{row?.subscription?.some(item => item.status == 'active') ? 'Actif' : 'Inactif'}</span>},
    // { field: "logo", header: "Date de début",body: (row) => <span>{dayjs(row?.subscription?.find(item => item.status == 'active').starts_at).format('DD/MM/YYYY')}</span>},
    // { field: "location", header: "Date de fin",body: (row) => <span>{dayjs(row?.subscription?.find(item => item.status == 'active').ends_at).format('DD/MM/YYYY')}</span>},
  
];

   const columnsApproved = [
    { field: "first_name", header: "Nom & prénoms" ,body: (row) => row.first_name+' '+ row.last_name},
   
     { field: "email", header: "Email" },
     { field: "phone", header: "Téléphone" },
      { field: "matricule", header: "matricule",body: (row) => (
      <span>{row.matricule ? row.matricule :'-'}</span>
     ) },
     { field: "job_profile", header: "Poste",body: (row) => (
      <span>{row.job_profile ? row.job_profile :'-'}</span>
     ) },
     { field:"role.title", header: "Role",body: (row) => (
      <span>{row.role.title ? row.role.title :'-'}</span>
     ) },
  ];
   const columnsPending = [
    { field: "first_name", header: "Nom & prénoms" ,body: (row) => row.first_name+' '+ row.last_name},
   
     { field: "email", header: "Email" },
     { field: "phone", header: "Téléphone" },
     { field: "matricule", header: "matricule",body: (row) => (
      <span>{row.matricule ? row.matricule :'-'}</span>
     ) },
     { field: "job_profile", header: "Poste",body: (row) => (
      <span>{row.job_profile ? row.job_profile :'-'}</span>
     ) },
     { field: "role.title", header: "Role" },
  ];

  const handleSelected = async (person)=>{
        //console.log("PERSONN",person.map(item=> item.id))
  const result = await Swal.fire({
    title: "Confirmation ?",
    // text: `Voulez-vous vraiment approuver ${person.name} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
  });

  if (result.isConfirmed) {
    try {
      // 👉 Ici ton appel API
      // await approvePerson(person.id);

      Swal.fire({
        title: "Approuvé !",
        text: "La personne a été approuvée avec succès.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue.",
        icon: "error",
      });
    }
  }
  }

  const handleApprovedPersonn = async (person) => {
    //console.log("PERSONN",[person.id])
  const result = await Swal.fire({
    title: "Confirmer l'approbation ?",
    text: `Voulez-vous vraiment approuver ${person.last_name} ${person.first_name} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, approuver",
    cancelButtonText: "Annuler",
  });

  if (result.isConfirmed) {
    try {
        const data = {
      ids:[person.id]
    }
    //console.log("DATA",data)
    const response =  await dispatch(approvedPerson(data))
    //console.log("handleApprovedPersonn",response)
     Swal.fire({
        title: response?.payload.status ? "Approuvé !":"",
        text: response?.payload.message,
        icon: response?.payload?.status ? "success":"info",
        timer: 2000,
        showConfirmButton: false,
      });
    if(response?.payload?.status){
      dispatch(fetchCompany())
     dispatch(closeModal())
    }
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue.",
        icon: "error",
      });
    }
  }
};

const handleDissapprovedPersonn = async (person) => {
    //console.log("PERSONN",[person.id])
  const result = await Swal.fire({
    title: "Confirmer l'approbation ?",
    text: `Voulez-vous vraiment rejeter ${person.last_name} ${person.first_name} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui",
    cancelButtonText: "Annuler",
  });

   if (result.isConfirmed) {
    const data = {
      ids:[person.id]
    }
    //console.log("DATA",data)
    try {
    const response =  await dispatch(disapprovedPerson(data))
    //console.log("handleApprovedPersonn",response)
    if(response.payload.status){
   Swal.fire({
        title: "Approuvé !",
        text: response.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
     dispatch(closeModal())
    }
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue.",
        icon: "error",
      });
    }
  }
};
  const openModal = (contract) => {
    setSelectedContract(contract);
    setModalVisible(true);
  };

  const closeModalContract = () => {
    setModalVisible(false);
    setSelectedContract(null);
  };
  const actionsTemplate = (row) => (
    <div className="flex gap-2 justify-center">
        <Button  
        label={'Approuvé'}
        className="bg-green-500"
        onClick={()=>handleApprovedPersonn(row)}
        />
         <Button  
        label={'Rejeté'}
        className="bg-red-500"
        onClick={()=>handleDissapprovedPersonn(row)}
        />
    </div>
  );
  const actionsTemplateProducts = (row)=>(
 <div className="flex gap-2 justify-center">
         <Button  
        label={'Voir les contrats'}
        className="bg-green-500"
       onClick={() => {
      //console.log("CONTRAT",row.subscription)
        openModal(row)
      }}
        />
    </div>
  );
  return (
    <div className="w-full space-y-6">     
      <ModalDetail 
        contracts={selectedContract} 
        visible={modalVisible} 
        onClose={closeModalContract} 
      />
       {/* MODAL FIXED PLEIN ÉCRAN */}
      {showNewProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNewProductModal(false)}
          />

          {/* Contenu modal */}
          <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Nouveau contrat</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewProductModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Mets ici ton formulaire de création de contrat */}
            <NewProduitForm 
            onClose={() => setShowNewProductModal(false)}
             onSubmit={async (data) => {
  const formData = new FormData()
  formData.append('plan_id', data.plan_id)
  formData.append('company_id', contracts?.pivot?.company_id)
  formData.append('contract_type', data.contract_type)
  formData.append("starts_at",data.starts_at)
  formData.append("ends_at",data.ends_at)
  if (data.contract_attachment) {
    formData.append('contract_attachment', data.contract_attachment)
  }
  
 const response = await dispatch(renouvelerContrat({
    idProduct: data.product_id,
    data: formData
  }))
  //console.log("renouvelerContrat2",response)
  Swal.fire({
          icon: response?.payload?.status ? "success":"info",
          title: response?.payload?.message,
          showConfirmButton: true,
        });
}}/>
          </div>
        </div>
      )}
      {/* ====== HEADER ENTREPRISE ====== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-orange-500 to-orange-400 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
              {logo ? (
                <img
                  src={logo.path}
                  alt="logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
                  {name?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Infos */}
        <div className="pt-16 pb-6 px-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm">

            <div>
              <p className="text-gray-500 mb-1">Email</p>
              <p className="text-gray-800 font-medium">{email}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Téléphone</p>
              <p className="text-gray-800 font-medium">
                {phone || "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Localisation</p>
              <p className="text-gray-800 font-medium">
                {location || "Non renseigné"}
              </p>
            </div>
          </div>
        </div>
      </div>
       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 py-3">
            Produits
          </h3>
           <button className="bg-orange-500 text-white font-semibold rounded cursor-pointer p-1"
                  onClick={() => setShowNewProductModal(true)}
           >Nouveau Produit+</button>
        </div>
      
  <CustomDataTable 
        data={company.products}
        showSearch
        columns={columnProducts}
        actionsTemplate={actionsTemplateProducts}
        paginator
        rows={5}
        />       
      </div>

      {/* ====== TABLEAU UTILISATEURS ====== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 py-3">
            Employés
          </h3>
 {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("pending")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "pending" ? "#ff8904" : "#ddd",
            color: activeTab === "pending" ? "#fff" : "#000"
          }}
        >
          En attente ({pending_users.length})
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "approved" ? "#ff8904" : "#ddd",
            color: activeTab === "approved" ? "#fff" : "#000"
          }}
        >
          Approuvés ({users.length})
        </button>
      </div>
        <div className="flex justify-between items-center mb-4">
         
        </div>
        {activeTab === 'approved' &&  <CustomDataTable 
        data={users}
        showSearch
        columns={columnsApproved}
        // actionsTemplate={actionsTemplate}
        paginator
        rows={5}
        /> }

        {activeTab === 'pending' && <CustomDataTable 
        isColunmSelected
        onDeleteSelected={(rows)=>handleSelected(rows)}
        data={pending_users}
        showSearch
        columns={columnsPending}
        actionsTemplate={actionsTemplate}
        paginator
        rows={5}
        />}
       
      </div>
    </div>
  );
}

const ModalDetail = ({ contracts, visible, onClose }) => {
    //console.log('ModalDetail',contracts)
    const dispatch = useDispatch();
   const [showNewContractModal, setShowNewContractModal] = React.useState(false)
  if (!visible || !contracts?.subscription.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-8 pb-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Détails des Contrats</h2>
              <p className="text-sm text-gray-500 mt-1">
                {contracts?.subscription?.length} contrat{contracts?.subscription?.length > 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-500 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* MODAL FIXED PLEIN ÉCRAN */}
      {showNewContractModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNewContractModal(false)}
          />

          {/* Contenu modal */}
          <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Nouveau contrat</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewContractModal(false)}
              >
                ✕
              </button>
            </div>

            {/* Mets ici ton formulaire de création de contrat */}
            <NewContractForm 
            onClose={() => setShowNewContractModal(false)}
             onSubmit={async (data) => {
  const formData = new FormData()
  formData.append('plan_id', data.plan_id)
   formData.append('company_id', contracts?.pivot?.company_id)
  formData.append('contract_type', data.contract_type)
  formData.append('starts_at', data.starts_at)
  formData.append('ends_at', data.ends_at)
  if (data.contract_attachment) {
    formData.append('contract_attachment', data.contract_attachment)
  }
  
  const response = await dispatch(renouvelerContrat({
    idProduct: contracts?.id || contracts?.pivot?.product_id,
    data: formData
  }))
  //console.log("renouvelerContrat1",response)
    Swal.fire({
          icon: response?.payload?.status ? "success":"info",
          title: response?.payload?.message,
          showConfirmButton: true,
        });
}}/>
          </div>
        </div>
      )}

        {/* Liste avec .map() */}
        <div className="overflow-y-auto flex-1 p-8 space-y-6">

          <div className="flex justify-end w-full">
            <button className="bg-orange-500 text-white p-1 cursor-pointer rounded-lg"
             onClick={() => setShowNewContractModal(true)}
            >Nouveau contrat</button>
          </div>
          {contracts?.subscription?.map((contract) => (
            <div key={contract.id} className="group hover:shadow-xl transition-all duration-300 p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl hover:-translate-y-1">
              
              {/* Header contrat */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Contrat
                  </h3>
                  <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mt-1">
                    {contract.contract_type}
                  </span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  contract.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {contract.status === 'active' ? 'Actif':'Inactif'}
                </span>
              </div>

              {/* Grid infos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Produit</span>
                    <span className="font-semibold text-gray-900">{contract?.product?.name}</span>
                  </div>
                
                </div>

                <div className="space-y-3">
                  {contract.plan && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">Formule d'abonnement</span>
                        <span className="font-semibold text-gray-900">{contract.plan.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500">Durée</span>
                        <span className="font-semibold text-gray-900">{contract.plan.duration_days} jours</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Dates BRUTES ISO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <span className="block text-xs font-medium text-blue-700 uppercase tracking-wide">Début</span>
                  <span className="text-lg font-bold text-gray-900 block mt-1 break-all">
                    {dayjs(contract.starts_at).format('DD/MM/YYYY')}
                  </span>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <span className="block text-xs font-medium text-green-700 uppercase tracking-wide">Fin</span>
                  <span className="text-lg font-bold text-gray-900 block mt-1 break-all">
                    {dayjs(contract.ends_at).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>

              {/* Fichier */}
              {contract.contract_file_url && (
               <ContractFile 
               contract={contract?.contract_file_url}
               />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function ContractFile({ contract }) {
  const [showFile, setShowFile] = React.useState(false);

  const fileUrl = contract;
  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className="pt-4 border-t border-gray-100 space-y-4">

      <button
        onClick={() => setShowFile(!showFile)}
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
      >
        {showFile ? "Fermer" : "Voir le fichier"}
      </button>

      {showFile && (
        <>
          {isPdf ? (
            <iframe
              src={fileUrl}
              title="PDF Contrat"
              className="w-full h-[600px] border rounded-lg"
            />
          ) : (
            <img
              src={fileUrl}
              alt="Contrat"
              className="max-w-full rounded-lg shadow"
            />
          )}
        </>
      )}

    </div>
  );
}

const NewContractForm = ({ onClose, onSubmit }) => {
   const {Formules} = useSelector((state)=>state.formules)
   const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    plan_id: '',
    contract_type: '',
    contract_attachment: null,
    starts_at:new Date().toISOString().split('T')[0],
    ends_at:null
  })
 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    onClose()
  }

  const isFormValid = formData.plan_id && formData.contract_type && formData.contract_attachment

    React.useEffect(()=>{
    dispatch(fetchFormules())
      // dispatch(fetchProduct());
    },[dispatch])

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
      {/* Plan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Formule d'abonnement *
        </label>
        <select
          value={formData.plan_id}
          onChange={(e) => setFormData({ ...formData, plan_id: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Sélectionnez un plan</option>
          {Formules.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type de contrat */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de contrat *
        </label>
        <select
          value={formData.contract_type}
          onChange={(e) => setFormData({ ...formData, contract_type: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Sélectionnez un type</option>
        <option value="normal">Normal (1 an)</option>
        <option value="loi">LOI (3 mois)</option>
        </select>
      </div>

     <div className="grid grid-cols-2 gap-4">
  {/* Date de début */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Date de début *
    </label>
    <input
      type="date"
      min={new Date().toISOString().split('T')[0]}
      value={formData.starts_at || ""}
      onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      required
    />
  </div>

  {/* Date de fin */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Date de fin *
    </label>
    <input
      type="date"
      min={formData.starts_at}
      value={formData.ends_at || ""}
      onChange={(e) => setFormData({ ...formData, ends_at: e.target.value })}
      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      required
    />
  </div>
</div>


      {/* Fichier */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fichier contrat *
        </label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, contract_attachment: e.target.files[0] })}
          className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-all"
          required
        />
        {formData.contract_attachment && (
          <p className="text-xs text-green-600 mt-1">
            {formData.contract_attachment.name} sélectionné
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-4 border border-red-600 text-white rounded-xl bg-red-400 transition-all font-medium"
        >
          Annuler
        </button>
         <button
          type="submit"
          disabled={!isFormValid}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            isFormValid
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } disabled`}
        >
          Enregistrer
        </button>
      </div>
    </form>
  )
}

const NewProduitForm = ({ onClose, onSubmit }) => {
  const {Formules} = useSelector((state)=>state.formules) // Ajout de Products
  const {Products} = useSelector((state)=>state.products)
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    product_id: '', // Ajout du champ
    plan_id: '',
    contract_type: '',
    contract_attachment: null,
    starts_at:new Date().toISOString().split('T')[0],
    ends_at:null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    onClose()
  }

  const isFormValid = formData.product_id && formData.plan_id && formData.contract_type && formData.contract_attachment

  React.useEffect(()=>{
    dispatch(fetchFormules())
    dispatch(fetchProduct()) // Décommente et ajoute
  },[dispatch])

  return (
    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[80vh]">
      {/* Produit - NOUVEAU */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Produit *
        </label>
        <select
          value={formData.product_id}
          onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Sélectionnez un produit</option>
          {Products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          )) || <option>Aucun produit disponible</option>}
        </select>
      </div>

      {/* Plan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Formule d'abonnement *
        </label>
        <select
          value={formData.plan_id}
          onChange={(e) => setFormData({ ...formData, plan_id: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Sélectionnez un plan</option>
          {Formules.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.label}
            </option>
          ))}
        </select>
      </div>

      {/* Type de contrat */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type de contrat *
        </label>
        <select
          value={formData.contract_type}
          onChange={(e) => setFormData({ ...formData, contract_type: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          required
        >
          <option value="">Sélectionnez un type</option>
          <option value="normal">Normal (1 an)</option>
          <option value="loi">LOI (3 mois)</option>
        </select>
      </div>
<div className="grid grid-cols-2 gap-4">
  {/* Date de début */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Date de début *
    </label>
    <input
      type="date"
      min={new Date().toISOString().split('T')[0]}
      value={formData.starts_at || ""}
      onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      required
    />
  </div>

  {/* Date de fin */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Date de fin *
    </label>
    <input
      type="date"
      min={formData.starts_at}
      value={formData.ends_at || ""}
      onChange={(e) => setFormData({ ...formData, ends_at: e.target.value })}
      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      required
    />
  </div>
</div>

      {/* Fichier */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fichier contrat *
        </label>
        <input
          type="file"
          onChange={(e) => setFormData({ ...formData, contract_attachment: e.target.files[0] })}
          className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition-all"
          required
        />
        {formData.contract_attachment && (
          <p className="text-xs text-green-600 mt-1">
            {formData.contract_attachment.name} sélectionné
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-4 border border-red-600 text-white rounded-xl bg-red-400 transition-all font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            isFormValid
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } disabled`}
        >
          Enregistrer
        </button>
      </div>
    </form>
  )
}



