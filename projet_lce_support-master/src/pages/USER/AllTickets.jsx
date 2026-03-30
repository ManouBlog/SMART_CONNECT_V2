import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../store/slices/ticketsSlice";
import CustomDataTable from "../../component/CustomDataTable";
import Button from "../../component/Button";
import { openModal} from "../../store/slices/modalSlice";
import Modal from "../../component/Modal";
import FormeTickets from "../../component/FormeTickets";
import CardContent from '../../component/CardContent'
// import ScreenDelete from "../../component/ScreenDelete";
// import Swal from "sweetalert2";
// import { closeModal } from "../../store/slices/modalSlice";
// import { Eye } from 'lucide-react';
import TicketsDetails from "../../component/TicketsDetails";
import AutoCompleteAssignation from "../../component/AutoCompleteAssignation";
import dayjs from "dayjs";

export default function AllTickets() {
  const dispatch = useDispatch();
  const { loading,tickets } = useSelector((state) => state.tickets);
  const {content} = useSelector((state)=>state.modal)
  const {user} = useSelector((state)=>state.authUser)
  const [seeAssignationTicket,setSeeAssignationTicket] = React.useState(false);
const [seeContentTicket, setSeeContentTicket] = React.useState(false);
 const statusName = {
  open: "Open",
  in_progress: "En cours",
  resolved: "Résolu",
  closed: "Fermé",
  customer_confirmation: "Confirmation client",
  customer_rejected: "Confirmation rejetée",
  rejected:"Rejeté"
};

const statusColor = {
  open: "bg-blue-100 text-blue-600 p-1 rounded-2",
  in_progress: "bg-yellow-100 text-yellow-600 p-1 rounded-2",
  customer_confirmation: "bg-purple-100 text-purple-600 p-1 rounded-2",
  customer_rejected: "bg-red-100 text-red-600 p-1 rounded-2",
  resolved: "bg-yellow-100 text-yellow-600 p-1 rounded-2",
  closed: "bg-gray-200 text-gray-600 p-1 rounded-2",
  rejected:"bg-red-200 text-red-600 p-1 rounded-2"
};

 const columns = [
    { field: "reference", header: "Référence" },
    { field: "creator.first_name", header: "Créateur" ,body:(row)=><span>{row?.creator?.first_name} {row?.creator?.last_name}</span>},
   { field: "company.name", header: "Entreprise" },
  { field: "product.name", header: "Produit" ,body:(row)=><span>{row?.product?.name}</span>},
  { field: "deleted_at", header: "ingénieurs",body:(row)=><span>{row.treated_by ? row.treated_by.first_name+ ' ' + row.treated_by.last_name:'TBD(To be define)'}</span> },
  { field: "created_at", header: "Date de création",body:(row)=>(
      <div className="relative inline-block"> 
      <span className="text-sm text-gray-900">
        {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
      </span>
      {/* ✅ Badge NEW absolute en haut à droite */}
      {(row.flag === 0 && user.role_id === 1) && (
       <span className="absolute -top-1 -right-1 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full border-2 border-white shadow-sm animate-ping-scale">
          NEW
        </span>
      )}
    </div>
   ) },
   { field: "deadline", header: "Deadline" , body:(row)=> dayjs(row?.deadline).format("DD MMM YYYY HH:mm")},
     {
  field: "title",
  header: "Sla",
  body: (row) => {
    const isLate = row.is_resolution_late;
    const status = (row.status || "").toLowerCase();

    let label = "In progress";
    let color = "bg-yellow-500";

    if (isLate) {
      label = "Lost";
      color = "bg-red-500";
    } else if (status === "closed") {
      label = "Win";
      color = "bg-green-500";
    } else if (status === "rejected") {
      label = "-";
      color = "bg-gray-400";
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-semibold text-white rounded-md whitespace-nowrap ${color}`}
      >
        {label}
      </span>
    );
  },
},
  { field: "status", header: "Statut" , body:(row)=>
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${statusColor[row.status]}`}
    >
      {statusName[row.status]}
    </span>
  },
];

const columnsToHideByRole = {
  1: [], // admin voit tout
  4: ["deleted_at"], // ingénieurs ne voit pas "ingénieurs"
  3: ["deleted_at"], // client ne voit ni deadline ni ingénieurs
};

const getColumnsForRole = (user_role_id) => {
  const hiddenKeys = columnsToHideByRole[user_role_id] || [];
  //console.log("getColumnsForRole",hiddenKeys)
  return columns.filter((col) => !hiddenKeys.includes(col.field));
};

const columnsFilter = getColumnsForRole(user.role_id);

  React.useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (ticket) => (
    <div className="flex gap-2 justify-center">
      
         <Button 
          label='Voir'
         className="bg-blue-600" 
          onClick={() => {
            setSeeContentTicket(true)
            setSeeAssignationTicket(false)
           dispatch(openModal({ title:"Détails du ticket",content:ticket, btnDelete:false}))
          }
           } />
           {
            ticket.status !== "rejected" && 
            (user.role_id === 1 && !ticket?.treated_by?.matricule) && <Button 
        label='Assigner'
        onClick={() =>{
          setSeeAssignationTicket(true)
            setSeeContentTicket(false)
            dispatch(openModal({ title: "Assignation", content:ticket,btnDelete:false}))
        } }/>
           }
      
    
    </div>
  );

  return (
    <CardContent title="Tickets">
    <Modal>
        {(!seeContentTicket && !seeAssignationTicket) && <FormeTickets tickets={content} />}
        {seeContentTicket && <TicketsDetails ticketDetail={content} />}
        {seeAssignationTicket && <AutoCompleteAssignation 
        ticket={content}
        />}
        
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
      {
        user.role_id === 3 && <div className="flex justify-end">
             <Button  label="Ouvrir un ticket +" onClick={() => {
                setSeeContentTicket(false)
                dispatch(openModal({ title: "Ouvrir un ticket", content:"" , btnDelete:false}))
               }} />
          </div>
      }
   
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
      isSelectedCompany={user.role_id === 1}
      isExportCSV
        data={tickets}
        showSearch
        columns={columnsFilter}
        actionsTemplate={actionsTemplate}
        paginator
        rows={5}
      />
    </div>
    </CardContent>
  );
}



