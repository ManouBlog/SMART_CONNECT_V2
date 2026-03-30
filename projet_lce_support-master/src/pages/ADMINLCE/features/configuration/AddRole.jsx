import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles,deleteRole } from "../../../../store/slices/roleSlice";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormRoles from "../../../../features/Role/FormRoles";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function RoleManagement() {
  const dispatch = useDispatch();
  const { loading,roles } = useSelector((state) => state.roles);
  const {content,btnDelete} = useSelector((state)=>state.modal)

//   const [newRole, setNewRole] = useState("");
   const columns = [
    { field: "title", header: "Role" },
  ];

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (role) => (
    <div className="flex gap-2 justify-center">
        <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Ajouter un rôle", content:role , btnDelete:false}))} />
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:role, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormRoles role={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteRole(content.id))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchRoles())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
     <FormRoles />
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={roles}
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
