import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import CustomDataTable from './CustomDataTable'

dayjs.locale('fr')

const UserDetailCard = ({ user }) => {

     const severityColors = {
    1: 'bg-red-500 text-white', // Critique
    2: 'bg-orange-500 text-white',
    3: 'bg-yellow-500 text-white',
    4: 'bg-green-500 text-white'
  }

  const statusColors = {
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200'
  }
  const tickets = user.assigned_tickets || [];

   const columns = [
    { field: "reference", header: "Référence",body:(row)=>(
                       <div className="font-mono text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                          {row.reference}
                        </div>
    )},
    { field: "title", header: "Titre",body:(row)=>(
        <div className="font-medium text-slate-900 max-w-xs truncate">
                         {row.title}
                     </div>
    ) },
     { field: "creator.first_name", header: "Créateur",body:(row)=>(
       <> 
                     <div className="text-sm text-slate-900 font-medium">
                          {row.creator?.first_name} {row.creator?.last_name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {row.creator?.email}
                        </div>
                        </>
     ) },
     { field: "status", header: "Statut",body:(row)=>(
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[row.status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                         {row.status === 'open' ? 'Ouvert' : row.status}
                       </span>
     ) },
     {
  field: "title",
  header: "Sla",
  body: (row) => {
    const isLate = row.is_resolution_late;
    const status = (row.status || "").toLowerCase();

    let label = "In progress";
    let color = "bg-yellow-500";

    if (isLate) {
      label = "Lost";
      color = "bg-red-500";
    } else if (status === "closed") {
      label = "Win";
      color = "bg-green-500";
    } else if (status === "rejected") {
      label = "-";
      color = "bg-gray-400";
    }

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-semibold text-white rounded-md whitespace-nowrap ${color}`}
      >
        {label}
      </span>
    );
  },
},
    //    { field: "id", header: "Sla",body:(row)=> <span
    //   className={`inline-flex items-center px-2 py-1 text-xs font-semibold text-white rounded-md whitespace-nowrap ${
    //     row.is_resolution_late ? "bg-red-500" : !row.is_resolution_late  && row.status === 'closed'? "bg-green-500":"bg-yellow-500"
    //   }`}
    // >
    //   {row.is_resolution_late ? "Lost" : !row.is_resolution_late && row.status === 'Closed' ? 'Win' : !row.is_resolution_late && row.status ==='rejected' ? "-":"In progress"}
    // </span>},
      { field: "severity.label", header: "Sévérité",body:(row)=>(
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[row.severity_id] || 'bg-gray-500 text-white'}`}>
                          {row.severity?.label || 'Critique'}
                        </span>
     ) },
     { field: "created_at", header:"Créé le",body:(row)=>dayjs(row.created_at).format('DD MMM YYYY HH:mm') },
     { field: "deadline", header: "Deadline" },
      
//      { 
//   field: "photos", 
//   header: "Photos",
//   body: (row) => {
//     const photos = row.photos || []
    
//     if (photos.length === 0) {
//       return (
//         <div className="text-center py-2 px-4">
//           <div className="w-8 h-8 mx-auto mb-1 bg-slate-100 rounded-xl flex items-center justify-center">
//             <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//           </div>
//           <span className="text-xs text-slate-500">Aucune photo</span>
//         </div>
//       )
//     }

//     return (
//       <div className="flex -space-x-2 justify-end">
//         {/* 3 premières photos en stack */}
//         {photos.slice(0, 3).map((photo, index) => (
//           <div
//             key={`photo-${row.id}-${index}`}
//             className="w-10 h-10 rounded-xl border-4 border-white shadow-lg hover:shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:z-10 group relative overflow-hidden"
//             style={{
//               backgroundImage: `url(${photo.url || photo.path || ''})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//             title={`Photo ${index + 1} - Cliquez pour agrandir`}
//           >
//             {/* Overlay dégradé pour les coins */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
//             {/* Badge "nouvelle" pour la 1ère photo */}
//             {index === 0 && (
//               <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-400 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
//                 📷
//               </div>
//             )}
//           </div>
//         ))}
        
//         {/* Compteur +N si > 3 photos */}
//         {photos.length > 3 && (
//           <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 text-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center font-bold text-xs backdrop-blur-sm cursor-pointer hover:scale-105 transition-all duration-200 hover:z-10">
//             +{photos.length - 3}
//           </div>
//         )}
//       </div>
//     )
//   }
// }

      
  ];


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border border-white/50 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                    {user.first_name} {user.last_name}
                  </h1>
                  
                </div>
                <p className="text-slate-600 text-lg font-medium">{user.matricule}</p>
              </div>
              <span className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full shadow-md">
                    ingénieur
                  </span>
           
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-5 py-3 ">
                <span>Email : {user.email}</span>
                 <span>Contact : {user.phone}</span>
              </div>
             
            </div>
         <div className="mt-6 pt-6 border-t border-slate-200 flex justify-center items-center gap-6 text-sm">
  <div className="flex-1 max-w-xs text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
    <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
    <div className="text-slate-600">Tickets assignés</div>
  </div>
  <div className="flex-1 max-w-xs text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
    <div className="text-2xl font-bold text-emerald-600">
      {tickets.filter(t => t.status === 'open').length}
    </div>
    <div className="text-slate-600">Ouverts</div>
  </div>
</div>


        </div>

        {/* Tickets Table */}
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl border border-white/50 overflow-hidden">
          <div className="p-8 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tickets Assignés</h2>
            <p className="text-slate-600">Tous les tickets actuellement pris en charge par {user.first_name}</p>
          </div>

          {tickets.length > 0 ? (
            
            <CustomDataTable 
             data={tickets}
        showSearch
        columns={columns}
        // actionsTemplate={actionsTemplate}
        paginator
        rows={5}
            />
          ) : (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-3xl flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun ticket assigné</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {user.first_name} n'a pas encore de tickets assignés. Les tickets apparaîtront ici dès qu'ils seront attribués.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetailCard
