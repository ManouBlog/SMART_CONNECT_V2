// import React from 'react';
// import SidebarEntreprise from '../../component/SidebarEntreprise';
// import Header from '../../component/Header.jsx';
//import TicketForm from '../../component/ticket_form';
// import EntrepriseForm from '../../component/Register_entreprise.jsx';
// import RegisterForm from '../../component/Register.jsx';
// import { FilePenLine,UsersRound,ArrowRight,UserRoundPlus,Ticket,Store,HousePlus,Eye,Check } from 'lucide-react';
// import { useState, useEffect } from "react";

const CompteEntreprise = () => {

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
   <>
   <div className="w-full">
  <div className="w-full flex flex-col lg:flex-row justify-between gap-2 mt-2">
    <div className="w-full lg:w-2/3 rounded-lg border border-gray-200 overflow-hidden bg-white">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Informations personnelles</h1>
      </div>
      <div className="overflow-x-auto">

          <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-gray-500 mb-2">Nom de l'entreprise</p>
                <div class="p-4 bg-gray-50 rounded-lg border border-[#E5E5E5] h-10 flex items-center">
                  <p class="text-gray-400 font-medium">LA LOCOMOTIVE LCE</p>
                </div>
              </div>

              <div>
                <p class="text-sm text-gray-500 mb-2">Email</p>
                <div class="p-4 bg-gray-50 rounded-lg border border-[#E5E5E5] h-10 flex items-center">
                  <p class="text-gray-400 font-medium">lce@email.com</p>
                </div>
              </div>

              <div>
                <p class="text-sm text-gray-500 mb-2">Téléphone</p>
                <div class="p-4 bg-gray-50 rounded-lg border border-[#E5E5E5] h-10 flex items-center">
                  <p class="text-gray-400 font-medium">+225 0707070707</p>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <p class="text-sm text-gray-500 mb-2">Adresse</p>
              <div class="p-4 bg-gray-50 rounded-lg max-w-xs border border-[#E5E5E5] h-10 flex items-center">
                <p class="text-gray-400 font-medium">Angré Nouveau CHU</p>
              </div>
            </div>
          </div>

      </div>
    </div>

    <div className="w-full lg:w-1/3 border rounded-lg border-gray-200 bg-white">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Photo de profil</h1>
      </div>
      <div className="w-full p-2">
        <div className="w-full border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-3">
          <div className='w-20 h-20 border border-[#E5E5E5] rounded-full'></div>
                  <div className='p-4'>
                      <button class="p-2 flex justify-between rounded-full hover:bg-gray-100 border border-[#E5E5E5] gap-2 px-4 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <p className='text-sm'>Changer le profil</p>
                      </button>
                  </div>

        </div>
      </div>
    </div>
  </div>
  
</div>

{/* TABLEAUX */}


    <div className="w-full  border border-gray-200 overflow-hidden bg-white mt-2 rounded-lg">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Tickets</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-[#F5F5F5] border-b border-gray-200">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entreprise</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prenom</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-gray-500 text-sm">La locomotive</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-15">Traoré</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-30">Christian Loïc Yérégnan</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-35">yeregnanchristian12@gmail.com</td>
              <td className="px-2 py-3 text-gray-500 text-sm">
                <div className="h-6 w-25 bg-[#6DC771] flex justify-center items-center rounded-md text-white text-xs">Entreprise</div>
              </td>
              <td className="px-2 py-3 text-gray-500 text-sm cursor-pointer"><Eye onClick={openModal} color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' /></td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-gray-500 text-sm">La locomotive</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-15">Adjobi</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-30">Pierre</td>
              <td className="px-2 py-3 text-gray-500 text-sm pr-35">adjobi@gmail.com</td>
              <td className="px-2 py-3 text-gray-500 text-sm">
                <div className="h-6 w-25 bg-[#6DC771] flex justify-center items-center rounded-md text-white text-xs">Entreprise</div>
              </td>
              <td className="px-2 py-3 text-gray-500 text-sm cursor-pointer"><Eye color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

   </>
  );
};

export default CompteEntreprise;
