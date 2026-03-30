import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormules,deleteFormule } from "../../../../store/slices/formuleSlice";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormFormule from "../../../../features/Formule/FormFormule";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function Formules() {
  const dispatch = useDispatch();
  const { loading,Formules } = useSelector((state) => state.formules);
  const {content,btnDelete} = useSelector((state)=>state.modal)


   const columns = [
    { field: "label", header: "formule" },
    // { field: "duration_days", header: "Nombre de jours" },
  ];

  useEffect(() => {
    dispatch(fetchFormules());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (formule) => (
    <div className="flex gap-2 justify-center">
        <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Formule", content:formule , btnDelete:false}))} />
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:formule, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormFormule formule={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteFormule(content.id))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchFormules())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex justify-end">
         <Button  label="Ajouter +" onClick={() => dispatch(openModal({ title: "Formule", content:"" , btnDelete:false}))} />
      </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={Formules}
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

