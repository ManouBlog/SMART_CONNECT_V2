import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUtilisateurs,deleteUtilisateur } from "../../store/slices/utilisateurSlice";
import CustomDataTable from "../../component/CustomDataTable";
import Button from "../../component/Button";
import { openModal} from "../../store/slices/modalSlice";
import Modal from "../../component/Modal";
import FormeUtilisateurs from "../../component/FormeUtilisateurs";
import CardContent from '../../component/CardContent'
import ScreenDelete from "../../component/ScreenDelete";
import Swal from "sweetalert2";
import { closeModal } from "../../store/slices/modalSlice";
import { FilePenLine,Trash } from 'lucide-react';

export default function Utilisateurs() {
  const dispatch = useDispatch();
    const [activeTab, setActiveTab] = React.useState("pending");
  const { loading,utilisateurs } = useSelector((state) => state.utilisateurs);
  //console.log("Utilisateurs12",utilisateurs)
  const {content,btnDelete} = useSelector((state)=>state.modal)
//   const {content,btnDelete} = useSelector((state)=>state.modal)
const [seeContentCompany, setSeeContentCompany] = React.useState(false)

   const columns = [
      { field: "matricule", header: "matricule",body: (row) => (
      <span>{row.matricule ? row.matricule :'-'}</span>
     ) },
    { field: "id", header: "Nom & Prénoms",body:(row)=>row.first_name+' '+row.last_name },
     { field: "email", header: "Email" },
     { field: "phone", header: "Téléphone" },
    { field: "job_profile", header: "Poste",body: (row) => (
      <span>{row.job_profile ? row.job_profile :'-'}</span>
     ) },
  ];

  React.useEffect(() => {
    dispatch(fetchUtilisateurs());
  }, [dispatch]); 

  const actionsRejectedTemplate = (utilisateur) => (
    <div className="flex gap-2 justify-center">
         <Button className="bg-blue-600" 
          onClick={() => {
            setSeeContentCompany(true)
           dispatch(openModal({ title: "Détails",content:company, btnDelete:false}))
          }
           }>
        <Eye className="w-4 h-4" />
        </Button>
        <Button   onClick={() =>{
            setSeeContentCompany(false)
            dispatch(openModal({ title: "Modification", content:utilisateur , btnDelete:false}))
        } }>
            <FilePenLine className="w-4 h-4" />
            </Button>
        <Button className="bg-red-600 hover:bg-red-700" 
        onClick={() => dispatch(openModal({ title: "Suppression",content:utilisateur, btnDelete:true}))}>
        <Trash className="w-4 h-4" />
        </Button>
    </div>
  );

  // Template pour les boutons actions
  const actionsTemplate = (utilisateur) => (
    <div className="flex gap-2 justify-center">
         {/* <Button className="bg-blue-600" 
          onClick={() => {
            setSeeContentCompany(true)
           dispatch(openModal({ title: "Détails de l'entreprise",content:company, btnDelete:false}))
          }
           }>
        <Eye className="w-4 h-4" />
        </Button> */}
        <Button   onClick={() =>{
            setSeeContentCompany(false)
            dispatch(openModal({ title: "Modification", content:utilisateur , btnDelete:false}))
        } }>
            <FilePenLine className="w-4 h-4" />
            </Button>
        <Button className="bg-red-600 hover:bg-red-700" 
        onClick={() => dispatch(openModal({ title: "Suppression",content:utilisateur, btnDelete:true}))}>
        <Trash className="w-4 h-4" />
        </Button>
    </div>
  );

  return (
    <CardContent title="Employés">
    <Modal>
        {(!btnDelete && !seeContentCompany) && <FormeUtilisateurs Utilisateurs={content} />}
        {btnDelete && <ScreenDelete 
            onCancel={()=>dispatch(closeModal())}
            onConfirm={async ()=>{
                //console.log(content)
               const response = await dispatch(deleteUtilisateur(content.id))
               if(response.payload.status){
                 Swal.fire({
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                          });
                          await dispatch(fetchUtilisateurs())
                          dispatch(closeModal())
               }
            }}
            />}
        
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
    <div className="flex justify-end">
             <Button  label="Ajouter +" onClick={() => {
                setSeeContentCompany(false)
                dispatch(openModal({ title: "Ajouter un employé", content:"" , btnDelete:false}))
               }} />
          </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

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
          En attente {utilisateurs?.pendingUsers.length}
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
          Approuvés {utilisateurs?.validatedUsers.length}
        </button>
        <button
          onClick={() => setActiveTab("rejeted")}
          style={{
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "rejeted" ? "#ff8904" : "#ddd",
            color: activeTab === "rejeted" ? "#fff" : "#000"
          }}
        >
          Rejetés {utilisateurs?.rejectedUsers.length}
        </button>
      </div>


      {
        activeTab === 'pending' && <CustomDataTable
        data={utilisateurs?.pendingUsers}
        showSearch
        isBtnImportFileExcel
        columns={columns}
        actionsTemplate={actionsTemplate}
        paginator
        rows={5}
      />
      }

       {
        activeTab === 'approved' && <CustomDataTable
        data={utilisateurs?.validatedUsers}
        showSearch
        columns={columns}
        // actionsTemplate={actionsTemplate}
        paginator
        rows={5}
      />
      }

      
      {
        activeTab === 'rejeted' && <CustomDataTable
        data={utilisateurs?.rejectedUsers}
        showSearch
        columns={columns}
        actionsTemplate={actionsRejectedTemplate}
        paginator
        rows={5}
      />
      }
      
    </div>
    </CardContent>
  );
}




