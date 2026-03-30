import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTimeTreatment,deleteTimeTreament } from "../../../../store/slices/timeTreatment";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormTimeTreatment from "../../../../features/treatment/FormTimeTreatment";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function Time_treatment() {
  const dispatch = useDispatch();
  const { loading,timeTreatment } = useSelector((state) => state.timeTreatment);
  const {content,btnDelete} = useSelector((state)=>state.modal)


   const columns = [
    // { field: "id", header: "#" },
    { field: "plan.label", header: "Formule" ,body:(row)=>row?.plan?.label},
     { field: "response_time_minutes", header: "Temps de réponse(min)" },
     { field: "resolution_time_minutes", header: "Temps de résolution(min)" },
      { field: "severity.label", header: "Sévérité" },
  ];

  useEffect(() => {
    dispatch(fetchTimeTreatment());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (timeTreatment) => (
    <div className="flex gap-2 justify-center">
        {/* <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Temps de traitement", content:timeTreatment , btnDelete:false}))} /> */}
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:timeTreatment, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormTimeTreatment timeTreatment={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteTimeTreament(content))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchTimeTreatment())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
    <div className="flex justify-end">
             <Button  label="Ajouter +" onClick={() => dispatch(openModal({ title: "Temps de traitement", content:"" , btnDelete:false}))} />
          </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={timeTreatment}
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

