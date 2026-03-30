import { useState,useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { fetchagentSupport } from "../store/slices/agentSlice";
import { useDispatch, useSelector } from "react-redux";
import { assignerPerson } from "../store/slices/ticketsSlice";
import { fetchTickets } from "../store/slices/ticketsSlice";
import { closeModal } from "../store/slices/modalSlice";
import Swal from "sweetalert2";

export default function AutoCompleteAssignation({ ticket }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const {agentsupport} = useSelector((state)=>state.agentsupport);
  const dispatch = useDispatch();

  const searchUser = (event) => {
    const query = event.query.toLowerCase();

    const results = agentsupport.filter((u) =>
      u.last_name.toLowerCase().includes(query) || u.first_name.toLowerCase().includes(query) 
    );

    setFilteredUsers(results);
  };
  const handleAssign = async() => {
    if (!selectedUser) return;
   
    const payload = {
      treated_by: selectedUser.id
    };
     //console.log('Payload',payload)
     try{
    const response = await dispatch(assignerPerson({ticketId:ticket.id,data:payload}))
         //console.log("handleStatusUpdate",response.payload)
      Swal.fire({
        icon: response.payload.status ? "success":"info",
        title: response.payload.message,
        showConfirmButton: true,
      });
            if(response.payload.status){
          dispatch(fetchTickets())
          dispatch(closeModal())
          }
     }catch(error){
              Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible de modifier le statut",
      });
     }
  };
  const itemTemplate = (user) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium">
        {user.first_name} {user.last_name}
      </span>
      <span className="text-sm text-gray-500">{user.email}</span>
    </div>
  );
};
 useEffect(()=>{
dispatch(fetchagentSupport());
 },[])

  return (
    <div className="w-full p-5 bg-white  space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Assigner le ticket : {ticket?.reference}
      </h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Choisir un ingénieur
        </label>

        <AutoComplete
          value={selectedUser}
          suggestions={filteredUsers}
          completeMethod={searchUser}
          field="first_name"
          dropdown
          emptyMessage="Aucun résultat trouvé"
          itemTemplate={itemTemplate}
          onChange={(e) => setSelectedUser(e.value)}
          placeholder="Rechercher un ingénieur..."
          className="w-full"
        />
      </div>
   <div className="flex justify-center">
      <button
  onClick={handleAssign}
  disabled={!selectedUser?.id}
  className={`p-2 text-white rounded-lg transition 
    ${selectedUser?.id ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed"}
  `}
>
  Assigner
</button>
   </div>
      
    </div>
  );
}