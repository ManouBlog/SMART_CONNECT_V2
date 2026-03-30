import React from 'react';
import SidebarItem from './SidebarItem.jsx';
import { LayoutDashboard,UserRound,Settings,Menu, X,Ticket } from 'lucide-react';
import { assets } from '../assets/assets'

import { useSelector ,useDispatch} from 'react-redux';
import {fetchTickets} from '../store/slices/ticketsSlice.js'

const Sidebar = () => {
  const {badgeTicket} = useSelector((state)=>state.tickets);
  const {user} = useSelector((state) => state.authUser);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
   
  React.useEffect(()=>{
   dispatch(fetchTickets())
  },[dispatch])

  return (
    <>
      <button
      className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg border border-[#E5E5E5]"
      onClick={() => setOpen(true)}
      >
      <Menu size={22} />
    </button>
    {open && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={() => setOpen(false)}
  />
)}
    <div
      className={`
        fixed md:static top-0 left-0 z-50
        w-64 bg-white text-black h-full p-4
        border-r border-r-[#E5E5E5]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >      
    <div className="flex justify-end md:hidden mb-2">
      <button onClick={() => setOpen(false)}>
        <X size={22} />
      </button>
    </div>
    
      <div className="flex flex-col items-center justify-center">
        <img src={assets.logo} className="w-15" />
        <h1 className="text-xl font-bold mb-6 text-black">LCE SUPPORT</h1>
      </div>      
     <nav className="flex-1">
     <ul className="space-y-2">
{/* {user?.role_id == 1 && (
    <SidebarItem
      icon={Ticket}
      label="Rechercher un ticket"
      active={true}
    />)} */}


    <SidebarItem
      icon={LayoutDashboard}
      label="Tableau de bord"
      to="/dashboard"
    />
    
  {user?.role_id == 2 && ( <SidebarItem
      icon={UserRound}
      label="Employés"
     to="/utilisateurs"
    />)}

    {user?.role_id == 1 && ( <SidebarItem
      icon={UserRound}
      label="Entreprises"
      to="/CompanySaved"
      badgeCount={0} 
    />)}

    {user?.role_id == 1 && ( <SidebarItem
      icon={UserRound}
      label="ingénieurs"
      to="/supports"
    />)}
  
    {/* <SidebarItem
      icon={UserRound}
      label="Compte"
      to="/compteadmin"
    /> */}

    <SidebarItem
      icon={Ticket}
      label="Tickets"
      to="/Tickets"
      badgeCount={user?.role_id == 1 ? badgeTicket:null} 
    />

    {user?.role_id == 1 && (
      <SidebarItem
        icon={Settings}
        label="Configurations"
        to="/Configurations"
      />
    )}

  </ul>
</nav>
      {/* <div className='border-t pt-3 border-t-gray-300'>

          <ul>
                            <li >
            <button
              onClick={handleLogout}
              className="flex items-center p-2 rounded-xl hover:bg-[#F5F5F5] transition-colors duration-200 w-full text-left"
            >              <span className="mr-2 "><LogOut color="black" size={18} /></span>
              Déconnexion
            </button>
          </li>

        </ul>

      </div> */}
    </div>
  </>

  );
};

export default Sidebar;
