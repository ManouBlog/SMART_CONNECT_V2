// import React from 'react';
// import SidebarEntreprise from '../../component/SidebarEntreprise';
// import Header from '../../component/Header';
import TicketForm from '../../component/ticket_form';
import { FilePenLine,UsersRound,ArrowRight,TicketPlus } from 'lucide-react';
import { useState, useEffect } from "react";

const Entreprise = () => {
  const [open, setOpen] = useState(false);
  return (
     <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FBFBFB] p-4">
          <div className='w-full p-2 border border-[#E5E5E5] rounded-xl'>
            {/* ------- */}
<div className="w-full bg-[#E27B1B] min-h-[140px] md:min-h-[160px] rounded-xl p-3 relative">
  {/* Titre */}
  <div className="flex justify-between">
    <h2 className="text-base md:text-lg font-semibold text-white">
      @ENTREPRISE
    </h2>
  </div>

  {/* Boutons */}
              <div className="
                mt-3
                overflow-x-auto
                snap-x snap-mandatory
                flex gap-2 flex-wrap
                md:flex-nowrap
                md:absolute md:bottom-3 md:left-3 md:right-3
                overflow-x-auto 
              ">
                <button className="border bg-white/10 border-white text-white px-3 h-8 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
                  <FilePenLine size={14} /> Requêtes en attente
                </button>

                <button className="border border-white text-white px-3 h-8 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
                  <FilePenLine size={14} /> Requêtes en cours
                </button>

                <button className="border border-white text-white px-3 h-8 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
                  <FilePenLine size={14} /> Requêtes traitées
                </button>

                <button className="border border-white  text-white px-3 h-8 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
                  <FilePenLine size={14} /> Requêtes validées
                </button>

                <button className="border border-white text-white px-3 h-8 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm">
                  <FilePenLine size={14} /> Requêtes invalidées
                </button>
              </div>
            </div>
            {/* ---CARD--- */}
            <div className='block  xl:flex   w-full mt-2 justify-between gap-2 '>


                <div className='w-full mt-2 xl:w-1/4 min-h-[140px] border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#FFC02E] rounded-xl flex items-center justify-center'><UsersRound color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'><h1 className='text-lg font-semibold text-black'>147</h1></div>
                  </div>
                  <div className='p-2'>
                    <h1>Nombres de tickets</h1>
                  </div>
                  <div className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' />
                  </div>
                </div>

                <div className='w-full mt-2 xl:w-1/4 min-h-[140px] border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#2E9AFF] rounded-xl flex items-center justify-center'><UsersRound color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'><h1 className='text-lg font-semibold text-black'>147</h1></div>
                  </div>
                  <div className='p-2'>
                    <h1>Nombres de tickets</h1>
                  </div>
                  <div className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' />
                  </div>
                </div>

                <div className='w-full mt-2 xl:w-1/4 min-h-[140px] border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#6DC771] rounded-xl flex items-center justify-center'><UsersRound color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'><h1 className='text-lg font-semibold text-black'>147</h1></div>
                  </div>
                  <div className='p-2'>
                    <h1>Nombres de tickets</h1>
                  </div>
                  <div className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' />
                  </div>
                </div>

                <div className='w-full mt-2 xl:w-1/4 min-h-[140px] border border-[#E5E5E5] rounded-xl relative'>
                  <div className='w-full p-2 flex justify-between'>
                    <button className='w-10 h-10 bg-[#9348E4] rounded-xl flex items-center justify-center'><UsersRound color="white" size={18} className='text-white  group-hover:text-[#E27B1B]'/></button>
                    <div className='w-20 h-10 flex justify-center items-center'><h1 className='text-lg font-semibold text-black'>147</h1></div>
                  </div>
                  <div className='p-2'>
                    <h1>Nombres de tickets</h1>
                  </div>
                  <div className='absolute bottom-0 bg-[#F5F5F5] h-9 w-full flex rounded-bl-xl rounded-br-xl text-xs px-2 flex items-center gap-3 justify-between border-t border-t-[#E5E5E5]'>
                    Voir plus <ArrowRight color="black" size={14} className='text-white  group-hover:text-[#E27B1B]' />
                  </div>
                </div>

                <button onClick={() => setOpen(true)} className='w-full mt-2 h-35 xl:w-35 border-1 border-[#E27B1B] rounded-xl flex flex-col justify-center items-center gap-4 cursor-pointer'>
                  <TicketPlus color="#E27B1B" size={22} className='text-black  group-hover:text-[#E27B1B]'/>
                  <h1 className='text-xs text-[#E27B1B]'>Créer un ticket</h1>
                </button>


            </div>


          </div>

<div className="w-full">
  <div className="w-full flex flex-col lg:flex-row justify-between gap-2 mt-2">
    <div className="w-full lg:w-2/3 rounded-lg border border-gray-200 overflow-hidden bg-white">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Tickets</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-[#F5F5F5] border-b border-gray-200">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-gray-500 text-sm">Ticket LCE</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Nom</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Prénoms</td>
              <td className="px-2 py-3 text-gray-500 text-sm">
                <div className="h-6 bg-[#2E9AFF] flex justify-center items-center rounded-md text-white text-xs">Ouvert</div>
              </td>
              <td className="px-2 py-3 text-gray-500 text-sm">Il y a 2 jours</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-gray-500 text-sm">Ticket LCE</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Nom</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Prénoms</td>
              <td className="px-2 py-3 text-gray-500 text-sm">
                <div className="h-6 bg-[#6DC771] flex justify-center items-center rounded-md text-white text-xs">Fermé</div>
              </td>
              <td className="px-2 py-3 text-gray-500 text-sm">Il y a 7 jours</td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-2 py-3 text-gray-500 text-sm">Ticket LCE</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Nom</td>
              <td className="px-2 py-3 text-gray-500 text-sm">Prénoms</td>
              <td className="px-2 py-3 text-gray-500 text-sm">
                <div className="h-6 bg-[#FFC02E] flex justify-center items-center rounded-md text-white text-xs">En cours</div>
              </td>
              <td className="px-2 py-3 text-gray-500 text-sm">Il y a 21 jours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="w-full lg:w-1/3 border rounded-lg border-gray-200 bg-white">
      <div className="h-12 w-full border-b border-gray-200 flex items-center px-2">
        <h1 className="text-sm font-medium">Derniers tickets</h1>
      </div>
      <div className="w-full p-2">
        <div className="w-full border border-dashed border-gray-300 rounded-lg p-3">
          <h1 className="text-sm font-medium">TICKET LCE</h1>
          <p className="text-gray-500 text-xs mt-1">Bonjour Monsieur, nous avons rencontré un problème...</p>
          <button className="bg-[#139DD8] h-8 px-3 mt-2 rounded-sm text-white text-xs flex justify-center items-center">TCLKER32</button>
        </div>
      </div>
    </div>
  </div>
</div>



          {/* POPUP */}


      {open && (
        <div className="fixed inset-0 bg-black/50 flex  items-center justify-center z-50 p-5">
          <div className="bg-white relative  p-8 rounded-lg w-150">
            <div>
              <div className="border-b border-b-[#F5F5F5] pb-4">
                <h1 className="text-[#E27B1B]">Créer un ticket</h1>
              </div><br />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 cursor-pointer bg-white w-8 h-8    text-sm"
              >
                ✕
              </button>

            </div>
            <TicketForm/>
            
          </div>
        </div>
      )}


          {/*  */}
        </main>
  );
};

export default Entreprise;
