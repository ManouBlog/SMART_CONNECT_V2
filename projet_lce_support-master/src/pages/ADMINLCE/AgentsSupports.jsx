import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchagentSupport,deleteagentsupport } from "../../store/slices/agentSlice";
import CustomDataTable from "../../component/CustomDataTable";
import Button from "../../component/Button";
import { openModal} from "../../store/slices/modalSlice";
import Modal from "../../component/Modal";
import FormAgentSupport from "../../component/FormAgentSupport";
import CardContent from '../../component/CardContent'
import ScreenDelete from "../../component/ScreenDelete";
import Swal from "sweetalert2";
import { closeModal } from "../../store/slices/modalSlice";
import { FilePenLine,Eye,Trash } from 'lucide-react';
import UserDetailCard from "../../component/UserDetailCard";
// import CompanyDetail from "./features/adminScreen/CompanyDetail";

export default function AgentsSupports() {
  const dispatch = useDispatch();
  const { loading,agentsupport } = useSelector((state) => state.agentsupport);
  const {content,btnDelete} = useSelector((state)=>state.modal)
//   const {content,btnDelete} = useSelector((state)=>state.modal)
const [seeContentCompany, setSeeContentCompany] = React.useState(false)


   const columns = [
    { field: "id", header: "Matricule",body:(row)=>row.matricule },
    { field: "created_at", header: "Agent",body:(row)=>row.first_name+' '+row.last_name },
     { field: "email", header: "Email" },
     { field: "phone", header: "Téléphone" },
  ];

  React.useEffect(() => {
    dispatch(fetchagentSupport());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (agentSupport) => (
    <div className="flex gap-2 justify-center">
         <Button className="bg-blue-600" 
          onClick={() => {
            setSeeContentCompany(true)
           
           dispatch(openModal({ title: "Voir plus",content:agentSupport, btnDelete:false}))
          }
           }>
        <Eye className="w-4 h-4" />
        </Button>
        <Button   onClick={() =>{
            setSeeContentCompany(false)
            
            dispatch(openModal({ title: "Modification", content:agentSupport , btnDelete:false}))
        } }>
            <FilePenLine className="w-4 h-4" />
            </Button>
        <Button className="bg-red-600 hover:bg-red-700" 
        onClick={() => dispatch(openModal({ title: "Suppression",content:agentSupport, btnDelete:true}))}>
        <Trash className="w-4 h-4" />
        </Button>
    </div>
  );

  return (
    <CardContent title="ingénieurs">
    <Modal>
        {(!btnDelete && !seeContentCompany) && <FormAgentSupport agentSupport={content} />}
        {seeContentCompany && <UserDetailCard  user={content}/> }
        {btnDelete && <ScreenDelete 
            onCancel={()=>dispatch(closeModal())}
            onConfirm={async ()=>{
                //console.log(content)
               const response = await dispatch(deleteagentsupport(content.id))
               if(response.payload.status){
                 Swal.fire({
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                          });
                          await dispatch(fetchagentSupport())
                          dispatch(closeModal())
               }
            }}
            />}
        
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
    <div className="flex justify-end">
             <Button  label="Ajouter +" onClick={() => {
                setSeeContentCompany(false)
                dispatch(openModal({ title: "Ajouter un ingénieur", content:"" , btnDelete:false}))
               }} />
          </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={agentsupport}
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



