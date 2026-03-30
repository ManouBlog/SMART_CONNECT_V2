import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypeTickets,deleteTypeTickets } from "../../../../store/slices/typeTickets";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormTypeTicket from "../../../../features/type_tickets/FormTypeTicket";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function TypesTickets() {
  const dispatch = useDispatch();
  const { loading,typeTickets } = useSelector((state) => state.typeTickets);
  const {content,btnDelete} = useSelector((state)=>state.modal)


   const columns = [
    { field: "label", header: "Type de ticket" },
  ];

  useEffect(() => {
    dispatch(fetchTypeTickets());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (typeTicket) => (
    <div className="flex gap-2 justify-center">
        <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Type Ticket", content:typeTicket , btnDelete:false}))} />
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:typeTicket, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormTypeTicket typeTicket={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteTypeTickets(content.id))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchTypeTickets())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex justify-end">
         <Button  label="Ajouter +" onClick={() => dispatch(openModal({ title: "Type de Ticket", content:"" , btnDelete:false}))} />
      </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={typeTickets}
        showSearch
        columns={columns}
        actionsTemplate={actionsTemplate}
        paginator
        rows={5}
      />
    </div>
    </>
  );
}

