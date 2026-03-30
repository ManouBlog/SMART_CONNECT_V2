import { useSelector ,useDispatch} from "react-redux";
import Modal from "../../component/Modal.jsx";
import ScreenUpdate from "./features/adminScreen/ScreenUpdate.jsx";
import { openModal } from "../../store/slices/modalSlice.js";


const CompteAdmin = () => {
const dispatch = useDispatch();
const {  user } = useSelector((state) => state.authUser);


  return (
   <>
     <div className="w-full">
      <Modal>
      <ScreenUpdate user={user}/>
      </Modal>
     <div className="w-full flex flex-col lg:flex-row justify-between gap-2 mt-2">
    <div className="w-full  rounded-lg border border-gray-200 overflow-hidden bg-white">
      <div className="h-12 w-full flex items-center p-2">
        <h1 className="text-2xl font-bold mb-6">Informations personnelles</h1>
      </div>
      <div className="overflow-x-auto">
           <div class="max-w-full mx-auto p-6 bg-white ">
              <div class="flex justify-end items-center mb-4">
                <button 
                onClick={()=>dispatch(openModal({ title: "Modifier les informations", content:user, btnDelete:false}))}
                class="p-2 flex justify-between rounded-full hover:bg-gray-100 border border-[#E5E5E5] gap-2 px-4 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <p className='text-sm'>Modifier</p>
                </button>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Nom :</p>
                  <p class="text-gray-800 text-sm">{user?.first_name}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 mb-1">Prenoms:</p>
                  <p class="text-gray-800 text-sm">{user?.last_name}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p class="text-sm text-gray-500 mb-1">Adresse email:</p>
                  <p class="text-gray-800 text-sm">{user?.email}</p>
                </div>
               <div>
                  <p class="text-sm text-gray-500 mb-1">Role :</p>
                  <p class="text-gray-800 text-sm">{user?.role?.title}</p>
                </div>
                {user?.company?.name && <div>
                  <p class="text-sm text-gray-500 mb-1">Entreprise :</p>
                  <p class="text-gray-800 text-sm">{user?.company?.name}</p>
                </div> }
                
                {user?.role_id === 4 && <div>
                  <p class="text-sm text-gray-500 mb-1">Matricule :</p>
                  <p class="text-gray-800 text-sm">{user?.matricule}</p>
                </div> }

                  {user?.role_id === 3 && <div>
                  <p class="text-sm text-gray-500 mb-1">Poste :</p>
                  <p class="text-gray-800 text-sm">{user?.job_profile}</p>
                </div> }
                   {user?.role_id === 3 && <div>
                  <p class="text-sm text-gray-500 mb-1">Matricule :</p>
                  <p class="text-gray-800 text-sm">{user?.matricule}</p>
                </div> }
                
              </div>

            </div>

      </div>
    </div>
  </div>
  
</div>
    </>
  );
};

export default CompteAdmin;
