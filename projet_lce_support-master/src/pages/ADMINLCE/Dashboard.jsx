import React from 'react';
import EntrepriseForm from '../../component/Register_entreprise.jsx';
// import RegisterForm from '../../component/Register.jsx';
import { UsersRound,ArrowRight,UserRoundPlus,Ticket,Store,HousePlus } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import Modal from '../../component/Modal.jsx';
import { openModal } from '../../store/slices/modalSlice.js';
import { fetchTickets } from '../../store/slices/ticketsSlice.js';
import { fetchCompany } from '../../store/slices/companySlice.js';
import { useNavigate } from 'react-router-dom';
import CustomDataTable from '../../component/CustomDataTable.jsx';
import { fetchUtilisateurs } from '../../store/slices/utilisateurSlice.js';
import FormeUtilisateurs from '../../component/FormeUtilisateurs.jsx';
import { fetchStatistique } from '../../store/slices/statistiqueSlice.js';
import {globalNbreStatistiques} from "../../store/slices/statistiqueSlice.js"
import dayjs from 'dayjs';
import CallsChart from '../../component/CallsChart.jsx'
import CallsChartAdminCompany from '../../component/CallsChartAdminCompany.jsx';

const Dashboard = () => {
  const [openEntreprise, setOpenEntreprise] = React.useState(false);
  const [openEmploye,setOpenEmploye] = React.useState(false);
  const {tickets} = useSelector((state)=>state.tickets);
  const {user} = useSelector((state) => state.authUser);
  const {company} = useSelector((state)=>state.Company);
  const {utilisateurs} = useSelector((state)=>state.utilisateurs);
  // const {statistiquesGlobal} = useSelector((state)=>state.statistiques);
  const [globalStatistiques,setGlobalStatistiques] = React.useState(null);

  const statusName = {
  open: "Open",
  in_progress: "En cours",
  resolved: "Résolu",
  closed: "Fermé",
  customer_confirmation: "Confirmation client",
  customer_rejected: "Confirmation rejetée"
};

const statusColor = {
  open: "bg-blue-100 text-blue-600 p-1 rounded-2",
  in_progress: "bg-yellow-100 text-yellow-600 p-1 rounded-2",
  customer_confirmation: "bg-purple-100 text-purple-600 p-1 rounded-2",
  customer_rejected: "bg-red-100 text-red-600 p-1 rounded-2",
  resolved: "bg-green-100 text-green-600 p-1 rounded-2",
  closed: "bg-gray-200 text-gray-600 p-1 rounded-2"
};

  const dispatch = useDispatch();
  const navigate = useNavigate();
   const columns = [
    { field: "reference", header: "Référence" },
     { field: "created_at", header: "Date de création",body:(row)=>dayjs(row.created_at).format("DD MMM YYYY HH:mm") },
    { field: "severity.label", header: "Sévérité" },
      { field: "company.name", header: "Sla" },
      { field: "deadline", header: "Deadline" },
    { field: "status", header: "Statut" , body:(row)=>
      <span className={statusColor[row.status]}>{statusName[row.status]}</span>
    },
  ];

  React.useEffect(()=>{
    dispatch(fetchTickets());
  
    if(user.role_id === 2){
    dispatch(fetchUtilisateurs());
    }
    if(user.role_id === 1){
      const yearCurrent = dayjs().format("YYYY");
     dispatch(fetchStatistique({userRoleId:user.role_id,dataSend:{year:yearCurrent,company_id:14}}));
     dispatch(fetchCompany());
    
    }
      const launchGlobalStatistique = async()=>{
    try{
    const response = await dispatch(globalNbreStatistiques({userRoleId:user.role_id}));
    setGlobalStatistiques(response.payload.data)
    }catch(error){
      console.log(error)
    }
    }
    launchGlobalStatistique()
   
  },[dispatch,user.role_id])

  const stats = globalStatistiques;

const configs = user.role_id === 1 ? [
  {
    label: "Total",
    count: stats?.total ? stats?.total:0,
    bg: "bg-purple-600",
  },
  {
    label: "Ouverts",
    count: stats?.open ? stats?.open:0,
    bg: "bg-blue-500",
  },
  {
    label: "En cours",
    count: stats?.in_progress ? stats?.in_progress:0,
    bg: "bg-orange-500",
  },
  {
    label: "Résolus",
    count: stats?.resolved ? stats?.resolved:0,
    bg: "bg-yellow-500",
  },
  {
    label: "Fermés",
    count: stats?.closed ? stats?.closed:0,
    bg: "bg-green-600",
  },
  {
    label: "Rejetés",
    count: stats?.rejected ? stats?.rejected:0,
    bg: "bg-red-600",
  }
]:[
  {
    label: "Total",
    count: stats?.total ? stats?.total:0,
    bg: "bg-purple-600",
  },
  {
    label: "Ouverts",
    count: stats?.open ? stats?.open:0,
    bg: "bg-blue-500",
  },
  {
    label: "En cours",
    count: stats?.in_progress ? stats?.in_progress:0,
    bg: "bg-orange-500",
  },
  {
    label: "Résolus",
    count: stats?.resolved ? stats?.resolved:0,
    bg: "bg-yellow-500",
  },
  {
    label: "Fermés",
    count: stats?.closed ? stats?.closed:0,
    bg: "bg-green-600",
  }
  // {
  //   label: "Rejetés",
  //   count: stats?.rejected ? stats?.rejected:0,
  //   bg: "bg-red-600",
  // }
];







  return (
  
      <main className="flex-1 bg-[#FBFBFB] p-4">
         <Modal>
          {/* {openCompte && <RegisterForm/>} */}
          {openEntreprise && <EntrepriseForm/>}
          {openEmploye && <FormeUtilisateurs />}
        </Modal>
          <div className='w-full p-2 border border-[#E5E5E5] rounded-xl'>
            {
            <div className="w-full  min-h-[140px] md:min-h-[160px] rounded-xl p-3 relative">
  {/* Titre */}
  <div className="flex justify-between">
    <h1 className="text-3xl font-semibold">
      Tableau de bord
    </h1>
  </div>

  {/* Boutons */}
  <div className="flex flex-col gap-4 mt-4 md:mt-6 w-full">
  {/* 3 HAUT - centrés */}
  <div className="flex flex-wrap justify-center gap-3">
    {configs.slice(0, 3).map((config, index) => (
      <div
        key={index}
        className={`${config.bg} w-full md:w-auto px-4 h-12 rounded-full flex items-center justify-between md:justify-center gap-1 cursor-pointer hover:opacity-90 transition-all text-white text-xs md:text-sm flex-1 md:flex-none group`}
      >
        <div className="flex items-center gap-1">
          <Ticket size={14} />
        </div>
        <div className="flex items-center gap-3">
          <h6 className="w-4 h-4 flex items-center justify-center text-[20px] font-bold text-white">
            {config.count}
          </h6>
          <span className="text-xs">Tickets {config.label}</span>
        </div>
      </div>
    ))}
  </div>

  {/* 3 BAS - espacés */}
  <div className="flex flex-wrap justify-center gap-3 mt-2">
    {configs.slice(3, 6).map((config, index) => (
      <div
        key={index}
        className={`${config.bg} w-full md:w-auto px-4 h-12 rounded-full flex items-center justify-between md:justify-center gap-1 cursor-pointer hover:opacity-90 transition-all text-white text-xs md:text-sm flex-1 md:flex-none group`}
      >
        <div className="flex items-center gap-1">
          <Ticket size={14} />
        </div>
        <div className="flex items-center gap-3">
          <h6 className="w-4 h-4 flex items-center justify-center text-[20px] font-bold text-white">
            {config.count}
          </h6>
          <span className="text-xs">Tickets {config.label}</span>
        </div>
      </div>
    ))}
  </div>
</div>

 {/* <div className="
  flex flex-wrap gap-2 mt-4 md:mt-6
  place-content-center
">

 {configs.map((config, index) => (
    <div
      key={index}
      className={`${config.bg} w-full md:w-auto px-4 h-12 rounded-full flex items-center justify-between md:justify-center gap-1 cursor-pointer hover:opacity-90 transition-all text-white text-xs md:text-sm flex-1 md:flex-none group`}
    >
      <div className="flex items-center gap-1">
        <Ticket size={14} />
      </div>

      <div className="flex items-center gap-3">
        <h6 className="w-4 h-4 flex items-center justify-center text-[20px] font-bold text-white">
          {config.count}
        </h6>

        <span className="text-xs">
          Tickets {config.label}
        </span>
      </div>
    </div>
  ))}
 
</div> */}
            </div>
            }
  
           

          </div>
          {(user.role_id === 1 || user.role_id == 2) && 
           <div className='flex gap-2 flew-wrap'>
            <div className='flex-2'>
             {user.role_id === 1 && <CallsChart />}
             {user.role_id === 2 && <CallsChartAdminCompany />}
            </div>
          
            <div className='flex-1'>
              <>
               
    <div className={`flex w-full mt-2 gap-2 place-content-space-evenly flex-wrap`}>
              {user.role_id == 1 && (
                 <div className='w-full h-35 mt-2 border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#FFC02E] rounded-xl flex items-center justify-center'><Store color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'><h1 className='text-lg font-semibold text-black'>{company.length}</h1></div>
                  </div>
                  <div className='p-2'>
                    <h1>Entreprises</h1>
                  </div>
                  <div 
                  
                  className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight
                     onClick={()=>navigate('/CompanySaved')}
                    color="black" size={14} className='text-white cursor-pointer  group-hover:text-[#E27B1B]' />
                  </div>  
                </div>
              )}

               
    {user.role_id == 2 && 
 (<div className='w-full mt-2 h-35 border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#2E9AFF] rounded-xl flex items-center justify-center'><UsersRound color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'>
                      <h1 className='text-lg font-semibold text-black'>{utilisateurs?.counts.validated+utilisateurs?.counts.pending+utilisateurs?.counts.rejected}</h1>
                      </div>
                  </div>
                  <div className='p-2'>
                    <h1>Employés</h1>
                  </div>
                  <div 
                  
                  className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight
                     onClick={()=>navigate('/utilisateurs')}
                     color="black" size={14} className='text-white cursor-pointer group-hover:text-[#E27B1B]' />
                  </div>
                </div>)
}
              
                  {user.role_id == 1 && ( 
            
                <button onClick={() => {
                  setOpenEntreprise(true)
                  dispatch(openModal({ title: "Création d'une entreprise", content:"", btnDelete:false}))
                  }} className='w-full mt-2 h-35 xl:w-35 border-1 border-[#E27B1B] rounded-xl flex flex-col justify-center items-center gap-4 cursor-pointer'>
                  <HousePlus color="#E27B1B" size={22} className='text-black  group-hover:text-[#E27B1B]'/>
                  <h1 className='text-xs text-[#E27B1B]'>Créer une entreprise</h1>
                </button>
 )}
 {user.role_id == 2 && (
   <button 
   onClick={()=>{
     setOpenEmploye(true)
    dispatch(openModal({ title: "Création d'un compte", content:'', btnDelete:false}))
  }}
   className='w-full mt-2 h-35 xl:w-35 border-1 border-[#E27B1B] rounded-xl flex flex-col justify-center items-center gap-4 cursor-pointer'>
                  <UserRoundPlus color="#E27B1B" size={22} className='text-black  group-hover:text-[#E27B1B]'/>
                  <h1 className='text-xs text-[#E27B1B]'>Créer un compte</h1>
                </button>
 )}
            </div>

              </>
            </div>
          </div>
          }
{user.role_id == 1 && (
  <div className="w-full">
  <div className="w-full flex">
    <div className="w-full  rounded-lg border border-gray-200 overflow-hidden bg-white">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Tickets critiques</h1>
      </div>
      <CustomDataTable
              data={tickets.filter(item=>{
                if(Math.abs(dayjs().diff(dayjs(item.deadline), "minute")) == (Number(item.sla.resolution_contractual_minutes)/2)  && !item.closed_at){
                return item
                }
              }).splice(0,4)}
              columns={columns}
              paginator
              rows={5}
            />
    </div>
  </div>
</div>
)}

     
        </main>
  );
};

export default Dashboard;
