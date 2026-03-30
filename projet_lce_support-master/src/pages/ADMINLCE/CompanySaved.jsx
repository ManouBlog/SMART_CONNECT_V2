import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany,deleteCompany } from "../../store/slices/companySlice";
import CustomDataTable from "../../component/CustomDataTable";
import Button from "../../component/Button";
import { openModal} from "../../store/slices/modalSlice";
import Modal from "../../component/Modal";
import Register_entreprise from "../../component/Register_entreprise";
import CardContent from '../../component/CardContent'
import ScreenDelete from "../../component/ScreenDelete";
import Swal from "sweetalert2";
import { closeModal } from "../../store/slices/modalSlice";
import { FilePenLine,Eye,Trash } from 'lucide-react';
import CompanyDetail from "./features/adminScreen/CompanyDetail";
// import dayjs from "dayjs";

export default function CompanySaved() {
  const dispatch = useDispatch();
  const { loading,company } = useSelector((state) => state.Company);
  const {content,btnDelete} = useSelector((state)=>state.modal)
//   const {content,btnDelete} = useSelector((state)=>state.modal)
const [seeContentCompany, setSeeContentCompany] = React.useState(false)



   const columns = [
    { field: "name", header: "Nom de l'entreprise" },
     { field: "email", header: "Email" },
     { field: "phone", header: "Téléphone" },
      // { field: "location", header: "Lieu" },
//       { field: "id", header: "Contrat" , body:(rowData)=>
//        <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${
//     rowData.subscriptions?.some(
//   (item) => item.status === "active"
// ) ? "bg-green-400" : "bg-red-400"
//   }`}>
//   {rowData?.subscriptions?.find(item => item.status === "active")
//     ? "Actif"
//     : "Non actif"}
// </span>
         
//       },
  ];

  React.useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (company) => (
    <div className="flex gap-2 justify-center">
         <Button className="bg-blue-600" 
          onClick={() => {
            setSeeContentCompany(true)
           dispatch(openModal({ title: "Détails de l'entreprise",content:company, btnDelete:false}))
          }
           }>
        <Eye className="w-4 h-4" />
        </Button>
        <Button   onClick={() =>{
            setSeeContentCompany(false)
            dispatch(openModal({ title: "Modification", content:company , btnDelete:false}))
        } }>
            <FilePenLine className="w-4 h-4" />
            </Button>
        <Button className="bg-red-600 hover:bg-red-700" 
        onClick={() => dispatch(openModal({ title: "Archivage",content:company, btnDelete:true}))}>
        <Trash className="w-4 h-4" />
        </Button>
    </div>
  );

  return (
    <CardContent title="Entreprises">
    <Modal>
        {(!btnDelete && !seeContentCompany) && <Register_entreprise company={content} />}
        {(!btnDelete && seeContentCompany) && <CompanyDetail company={content} />}
        {btnDelete && <ScreenDelete 
                     title=''
                     btn_text='Archiver'
                     text_loading='Chargement...'
                      message="Voulez-vraiment archiver l'entreprise"
                      onCancel={()=>dispatch(closeModal())}
                      onConfirm={async ()=>{
                //console.log(content)
               const response = await dispatch(deleteCompany(content.id))
               Swal.fire({
                            icon: response.payload.status ? "success":'info',
                            text:response.payload.message,
                            showConfirmButton: true,
                          });
               if(response.payload.status){
                 
                          await dispatch(fetchCompany())
                          dispatch(closeModal())
               }
            }}
            />}
        
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
    <div className="flex justify-end">
             <Button  label="Ajouter +" onClick={() => {
                setSeeContentCompany(false)
                dispatch(openModal({ title: "Ajouter une entreprise", content:"" , btnDelete:false}))
               }} />
          </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={company}
        showSearch
        columns={columns}
        actionsTemplate={actionsTemplate}
        paginator
        rows={5}
      />
    </div>
    </CardContent>
  );
}


