import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct,deleteProducts } from "../../../../store/slices/productSlice";
import CustomDataTable from "../../../../component/CustomDataTable";
import Button from "../../../../component/Button";
import { openModal,closeModal} from "../../../../store/slices/modalSlice";
import Modal from "../../../../component/Modal";
import FormProducts from "../../../../features/Products/FormProducts";
import ScreenDelete from "../../../../component/ScreenDelete";
import Swal from "sweetalert2";


export default function Products() {
  const dispatch = useDispatch();
  const { loading,Products } = useSelector((state) => state.products);
  const {content,btnDelete} = useSelector((state)=>state.modal)

   const columns = [
    { field: "name", header: "Produit" },
    // { field: "company_id", header: "Entreprise" ,body:(row_data)=>row_data?.company?.name}
  ];

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]); 

  // Template pour les boutons actions
  const actionsTemplate = (Product) => (
    <div className="flex gap-2 justify-center">
        <Button  label="Editer" onClick={() => dispatch(openModal({ title: "Editer le Produit", content:Product , btnDelete:false}))} />
        <Button className="bg-red-600 hover:bg-red-700" label="Supprimer" onClick={() => dispatch(openModal({ title: "Suppression",content:Product, btnDelete:true}))} />
    </div>
  );

  return (
    <>
    <Modal>
   {!btnDelete && <FormProducts Product={content} /> } 
    {btnDelete && <ScreenDelete 
    onCancel={()=>dispatch(closeModal())}
    onConfirm={async ()=>{
       const response = await dispatch(deleteProducts(content.id))
       if(response.payload.status){
         Swal.fire({
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  await dispatch(fetchProduct())
                  dispatch(closeModal())
       }
    }}
    />}
    </Modal>
    <div className="p-6 bg-white rounded-2xl shadow">
      <div className="flex justify-end">
         <Button  label="Ajouter +" onClick={() => dispatch(openModal({ title: "Ajouter un produit", content:"" , btnDelete:false}))} />
      </div>
      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Role List */}
      <CustomDataTable
        data={Products}
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


