import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNiveauDifficult,deleteNiveauDifficult } from "../../../../store/slices/niveauDifficult";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormNiveauDifficult from "../../../../features/niveauDifficult/FormNiveauDifficult";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function NiveauDifficult() {
  const dispatch = useDispatch();
  const { loading,niveauDifficulte } = useSelector((state) => state.niveauDifficult);
  const {content,btnDelete} = useSelector((state)=>state.modal)


   const columns = [
    { field: "label", header: "Niveau" },
  ];

  useEffect(() => {
    dispatch(fetchNiveauDifficult());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (niveau) => (
    <div className="flex gap-2 justify-center">
        <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Niveau de Sévérité", content:niveau , btnDelete:false}))} />
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:niveau, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormNiveauDifficult niveau={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteNiveauDifficult(content.id))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchNiveauDifficult())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
     <FormNiveauDifficult />
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={niveauDifficulte}
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
