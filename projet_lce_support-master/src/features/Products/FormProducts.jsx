import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, fetchProduct, updateProducts } from "../../store/slices/productSlice";
import { closeModal } from "../../store/slices/modalSlice";
import Button from "../../component/Button";
import { fetchCompany } from "../../store/slices/companySlice";
import Swal from "sweetalert2";

export default function FormProducts({ Product = null }) {
  const dispatch = useDispatch();
  

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  // const [company_id, setCompany_id] = useState(""); // Valeur par défaut
  const {company} = useSelector((state)=>state.Company)
    useEffect(()=>{
     dispatch(fetchCompany())
  },[dispatch])

  // 🔹 Si on est en mode édition, remplir les champs
  useEffect(() => {
    if (Product) {
      setLabel(Product.name || "");
      setDescription(Product.description || "");
      // setCompany_id(Product.company_id || "");
    }
  }, [Product]);


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!label.trim()) return;

    // Objet au même format que celui fourni
    const productData = {
      // company_id: Number(company_id),
      name: label,
      description,
    };

    if (Product) {
      // Mode édition
      const response = await dispatch(
        updateProducts({
          id: Product.id,
          dataForUpdate: productData,
        })
      );

      if (response.payload.status) {
        Swal.fire({
          icon: "success",
          title: "Enregistré",
          timer: 1500,
          showConfirmButton: false,
        });
        await dispatch(fetchProduct());
        dispatch(closeModal());
      }
    } else {
      // Mode création
      const response = await dispatch(addProducts(productData));

      if (response.payload.status) {
        Swal.fire({
          icon: "success",
          title: "Enregistré",
          timer: 1500,
          showConfirmButton: false,
        });
        setLabel("");
        setDescription("");
        // setCompany_id("");
        dispatch(closeModal());
        await dispatch(fetchProduct());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} >
        <div className="flex flex-col gap-4 w-full">
 <div className="flex flex-wrap gap-4 w-full">
      {/* Sélection entreprise */}
      {/* <div className="flex-1 min-w-[200px]">
        <label htmlFor="company">Entreprises</label>
        <select
        id='company'
           
          value={company_id}
          onChange={(e) => setCompany_id(e.target.value)}
           disabled={Product?.id} 
    className={`
      border rounded-lg px-4 py-2 w-full transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-orange-400
      ${Product?.id ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border-gray-300 hover:border-gray-400 shadow-sm'
      }
    `}
        >
           <option value="">
             ---Sélectionne une entreprise---
            </option>
          {company.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div> */}

      {/* Libellé */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="company">Produit</label>
        <input
          type="text"
          placeholder="Libellé"
          className="border rounded-lg px-4 py-2 w-full"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
    </div>

    <div className="flex flex-wrap gap-4 w-full">
      {/* Description */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="company">Description</label>
        <textarea
          placeholder="Description"
          className="border rounded-lg px-4 py-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
        </div>
   
     {/* Bouton */}
      <div className="flex justify-center">
        <Button
          disabled={!label || !description}
          type="submit"
          label={Product ? "Modifier" : "Ajouter"}
        />
      </div>
  </form>
  );
}
