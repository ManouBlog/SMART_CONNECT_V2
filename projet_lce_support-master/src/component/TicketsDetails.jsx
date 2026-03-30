import React, { useEffect } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { AlertTriangle } from "lucide-react";
import Button from "./Button";
import { useDispatch,useSelector } from "react-redux";
import { updateTickets,fetchTickets,fetchOneTicket,ticketSeen,rejectedTickets} from "../store/slices/ticketsSlice";
import { closeModal } from "../store/slices/modalSlice";
import { Galleria } from 'primereact/galleria';
import AttachmentViewer from "./AttachmentViewer";

const TicketsDetails = ({ ticketDetail }) => {

  const dispatch = useDispatch();
  const [showEchangedModal, setShowEchangedModal] = React.useState(false)
const [pendingStatus, setPendingStatus] = React.useState(null)
const [pendingTicket, setPendingTicket] = React.useState(null)
const {ticket} = useSelector((state)=>state.tickets)

    const {user} = useSelector((state)=>state.authUser)

   const statusName = {
  open: "Open",
  in_progress: "En cours",
  resolved: "Résolu",
  closed: "Fermé",
  customer_confirmation: "Confirmation client",
  customer_rejected: "Confirmation rejetée",
  rejected:"Rejeté"
};

const statusColor = {
  open: "bg-blue-100 text-blue-600 p-1 rounded-2",
  in_progress: "bg-yellow-100 text-yellow-600 p-1 rounded-2",
  customer_confirmation: "bg-purple-100 text-purple-600 p-1 rounded-2",
  customer_rejected: "bg-red-100 text-red-600 p-1 rounded-2",
  resolved: "bg-green-100 text-green-600 p-1 rounded-2",
  closed: "bg-gray-200 text-gray-600 p-1 rounded-2",
  rejected:"bg-red-200 text-red-600 p-1 rounded-2",
};

  const severityColor = {
    Critique: "bg-red-100 text-red-600",
    Majeure: "bg-orange-100 text-orange-600",
    Mineure: "bg-green-100 text-green-600",
  };

  const steps = [
  {
    label: "Création",
    date: ticket?.created_at,
    completed: true,
    isShow:true,
    color:'bg-green-500 text-white',
    userWhoTreated:[ticket?.creator?.first_name].map(item=>{
      return {name:item,isCreator:true}
    })
  },
  {
    label: "Traitement commencé",
    date: ticket?.treatment_started_at,
    completed: !!ticket?.treatment_started_at,
    isShow:true,
    color:'bg-yellow-500 text-white',
    userWhoTreated:[ticket?.treated_by?.first_name].map(item=>{
      return {name:item,isCreator:false,status:ticket?.status}
    })
  },
   {
    label: "Détail de traitement",
    date: ticket?.updated_at,
    completed: ticket?.messages?.length > 0,
    isShow:ticket?.messages?.length > 0,
    color:'bg-orange-500 text-white',
    userWhoTreated:[ticket?.messages.length].map(item=>{
      return {messages:item,discussion:true}
    })
  },
 
  {
    label: "Traitement terminé",
    date: ticket?.treatment_ended_at || ticket?.status === 'resolved' ? ticket?.treatment_ended_at:null,
    completed: ticket?.treatment_ended_at && ticket?.status === 'resolved' || ticket?.treatment_ended_at,
    isShow:true,
    color:'bg-emerald-600 text-white',
    userWhoTreated:[ticket?.resolved_by?.first_name].map(item=>{
      return {name:item,isCreator:false}
    })
  },
   {
    label: user.role_id != 3 ? "Confirmation client":"Votre confirmation",
    date: ticket?.confirmed_at,
    completed: ticket?.status === 'customer_confirmation' || ticket?.status === 'customer_rejected' || ticket?.customer_comment ,
    isShow:true,
    color: 'bg-emerald-600 text-white',
    userWhoTreated:[],
    customer_comment:ticket?.customer_comment
  },
   {
    label: "Ticket fermé",
    date: ticket?.closed_at,
    completed: ticket?.closed_at,
    isShow:true,
    color:'bg-green-600 text-white',
    userWhoTreated:[]
  },
   {
    label: "Ticket rejeté",
    date: ticket?.updated_at,
    completed: ticket?.status === "rejected",
    isShow:ticket?.status === "rejected",
    color:'bg-red-600 text-white',
    userWhoTreated:[]
  }
];

const handleEchangedConfirm = (comment, files) => {
  handleStatusUpdate(pendingStatus, { comment, files })
}

const confirmStatusChange = (newStatus, ticket) => {
  const statusLabels = {
    open: "Ouvrir le ticket ?",
    in_progress: "Passer le ticket en cours",
    resolved: "Marquer le ticket comme résolu",
    closed: "Clôturer le ticket",
    confirmed: "Confirmer la résolution du ticket"
  };

  if (newStatus === 'Echanged') {
    setPendingStatus(newStatus)
    setPendingTicket(ticket)
    setShowEchangedModal(true)
    return
  }

  // ✅ 3 boutons + textarea pour 'confirmed'
if (newStatus === 'confirmed') {
  Swal.fire({
    // title: "Confirmer la résolution",
    input: 'textarea',
    inputPlaceholder: 'Note obligatoire',
    inputAttributes: { rows: 3 },
    text: `${statusLabels[newStatus]} ?`,
    icon: "warning",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: 'Confirmer',
    denyButtonText: 'Rejeter',
    cancelButtonText: 'Annuler',
    confirmButtonColor: "#10B981",
    denyButtonColor: "#EF4444",
    cancelButtonColor: "#6B7280",
    
    // ✅ Hook au montage pour récupérer le textarea
    didOpen: () => {
      const textarea = Swal.getInput(); // ou document.querySelector('textarea')
      textarea.focus();
    },
    
    // ✅ Validation pour les 2 boutons
    preConfirm: () => {
      const textarea = Swal.getInput();
      const note = textarea.value;
      if (!note?.trim()) {
        Swal.showValidationMessage('Note obligatoire pour confirmer');
        return false;
      }
      return note;
    },
    
    preDeny: () => {
      const textarea = Swal.getInput();
      const note = textarea.value;
      if (!note?.trim()) {
        Swal.showValidationMessage('Note obligatoire pour rejeter');
        return false; // ✅ Garde modal ouverte !
      }
      return note;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      handleStatusUpdate('customer_confirmation', {comment_resolution:result.value,status:"customer_confirmation"});
    } else if (result.isDenied) {
      handleStatusUpdate('customer_rejected', {comment_resolution:result.value,status:"customer_rejected"});
    }
  });
  return;
}

  // Autres statuts inchangés
  Swal.fire({
    title: "Confirmer l'action",
    text: `${statusLabels[newStatus]} ?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#E27B1B",
    cancelButtonColor: "#6B7280",
  }).then((result) => {
    if (result.isConfirmed) {
      handleStatusUpdate(newStatus, null)
    }
  })
}

const handleStatusUpdate = async (status, commentaire = null) => {
  try {
   
    let requestData

    // Si commentaire ou files → FormData, sinon objet simple
    if (commentaire) {
      const formData = new FormData() 
      if(commentaire.comment){
formData.append('message', commentaire.comment)
      }   
      if(commentaire.comment_resolution){
        formData.append('comment', commentaire.comment_resolution)
        formData.append('status', commentaire.status)
      }  
      
      // Ajoute fichiers S'ILS EXISTENT
      if (commentaire.files && commentaire.files.length > 0) {
        commentaire.files.forEach((file, index) => {
          formData.append(`files[${index}]`, file)
        })
      }
      
      requestData = formData
    } else {
      // Appel simple sans FormData
     requestData = null;
    }
      const data = requestData ? {id_ticket:ticket?.id,status:status,data:requestData}:{id_ticket:ticket?.id,status:status}
    const response = await dispatch(updateTickets(data))
    //console.log("handleStatusUpdate", response.payload)

    Swal.fire({
      icon: response.payload.status ? "success" : "info",
      title: response.payload.message,
      timer: 1500,
      showConfirmButton: false,
    });
    
    if (response.payload.status && !commentaire) {
      dispatch(fetchTickets())
      dispatch(closeModal())
    }
    if(response.payload.status && commentaire){
       dispatch(fetchOneTicket(ticket?.id))

    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Erreur",
      text: "Impossible de modifier le statut",
    });
  }
}

const handleReject = async (ticketId) => {
  const { value: comment } = await Swal.fire({
    title: "Rejeter",
    text: "Veuillez ajouter un commentaire",
    input: "textarea",
    inputPlaceholder: "Saisir le motif du rejet...",
    inputAttributes: {
      "aria-label": "Commentaire",
    },
    showCancelButton: true,
    confirmButtonText: "Valider",
    cancelButtonText: "Annuler",
    confirmButtonColor: "#b91c1c",
    preConfirm: (value) => {
      if (!value || !value.trim()) {
        Swal.showValidationMessage("Le commentaire est obligatoire");
        return false;
      }
      return value;
    },
  });

  // si validé
  if (comment) {
    const data={
  "action": "reject",
  "comment": comment
}
    dispatch(rejectedTickets({ticketId:ticketId,data}))
  }
};

useEffect(()=>{
dispatch(fetchOneTicket(ticketDetail.id))
dispatch(fetchTickets())
if(user.role_id === 1){
dispatch(ticketSeen(ticketDetail.id))
}
},[dispatch,user]);

if(!ticket){
  return  <div className="p-6 bg-gray-50 min-h-screen justify-center flex">Chargement...</div>
}

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <EchangedFormModal
  isOpen={showEchangedModal}
  onClose={() => setShowEchangedModal(false)}
  onConfirm={handleEchangedConfirm}
  ticketTitle={pendingTicket?.title}
  userConnected={ticket?.treated_by?.id}
  ticket={ticket}
/>
{ticket?.comment &&  <h1
              className={`px-3 py-1 my-3 flex gap-3 rounded-full text-xs font-semibold bg-red-200 text-red-600 p-1 rounded-2`}
            >
                <AlertTriangle size={14} className="text-red-600" />
              {ticket?.comment}
            </h1>}

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        
        <div className="flex justify-between items-start">
          <div>
             <h1 className="text-2xl font-bold">Produit : {ticket?.product.name}</h1>
            <h1 className="text-2xl font-bold">Objet : {ticket?.title}</h1>
            <h1 className="text-2xl font-bold">Réference : {ticket?.reference}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Créé le {dayjs(ticket?.created_at).format("DD MMM YYYY HH:mm")}
            </p>
          </div>

          <div className="flex gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[ticket?.status]}`}
            >
              {statusName[ticket?.status]}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColor[ticket?.severity?.label]}`}
            >
              {ticket?.severity?.label}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
     <div className="bg-white rounded-2xl p-6 mb-6">
        {/* MAIN */}
        <div className="col-span-2 space-y-6">
          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="font-semibold my-3 underline">Info sur le ticket</h2>
            <h2 className="font-semibold my-3">Description:</h2>
            <Description description={ticket?.description} />
              {/* ENTREPRISE */}
  <div>
    <h2 className="font-semibold my-3 text-gray-800">
      Entreprise:
    </h2>
    <p className="text-gray-700 leading-relaxed">
      {ticket?.company?.name}
    </p>
  </div>
  {/* Créateur */}
  <div>
    <h2 className="font-semibold my-3 text-gray-800">
      Créateur :
    </h2>
    <p className="text-gray-700 leading-relaxed break-words">
      {ticket?.creator?.first_name} {ticket?.creator?.last_name}
    </p>
  </div>
  {/* INFORMATIONS */}
  <div>
    <h2 className="font-semibold my-3 text-gray-800">
      Type de ticket:
    </h2>

    <div className="text-sm space-y-2">
      <div className="flex gap-5">
        <span>
          {ticket?.type?.label}
        </span>
      </div>
     
    </div>
  </div>
  {/* PIECES JOINTES */}
  <div>
    <h2 className="font-semibold my-3 text-gray-800">
      Pièces jointes:
    </h2>

    {ticket?.attachments?.length > 0 ? (
   <ImageGallery  imagesData={ticket?.attachments} />
    ) : (
      <p className="text-sm text-gray-400 italic">
        Aucune pièce jointe
      </p>
    )}
  </div>

          </div>

          {(user.role_id === 1 || user.role_id === 4)&& 
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="font-semibold mb-4 underline">Temps :</h2>

            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span>Temps de réponse : </span>
                <span className="font-semibold">
                  {ticket?.sla?.response_contractual_minutes} min
                </span>
              </div>
               <div className="flex gap-3">
                <span>Temps de réponse pris par l'ingénieurs: </span>
                <span className="font-semibold">
                  {ticket?.sla?.response_effective_minutes} min
                </span>
              </div>
              <div className="flex gap-3">
                <span>Temps de résolution : </span>
                <span className="font-semibold">
                  {ticket?.sla?.resolution_contractual_minutes} min
                </span>
              </div>
              {/* <div className="flex gap-3">
                <span>Échéance de réponse (Date et Heure) :</span>
                <span className="font-semibold">
                  {ticket?.sla?.response_deadline} 
                  
                </span>
              </div> */}
              <div className="flex gap-3">
                <span>Échéance de résolution (Date et heure) :</span>
                <span className="font-semibold">
                  {ticket?.deadline}
                </span>
              </div>
               

              
              {ticket?.sla?.is_resolution_late && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold">
                  ⚠ Résolution en retard
                </div>
              )}
            </div>
          </div>}
           {(user.role_id === 1)&& 
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="font-semibold mb-4 underline">ingénieurs :</h2>
            <ul>
              <li>{ticket?.treated_by?.first_name ? `${ticket?.treated_by?.first_name} ${ticket?.treated_by?.last_name}`:"Pas d'ingénieur" }</li>
            </ul>
          </div>}
          

          {/* TIMELINE */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="font-semibold mb-4  underline">Timeline</h2>
            <div className="border-l-2 border-gray-200 pl-6 space-y-6 relative">
  {steps.map((step, idx) => (
    step.isShow && 
    <div key={idx} className="relative">
      {/* Cercle */}
     <span
  className={`absolute -left-9 top-0 w-6 h-6 flex items-center justify-center rounded-full border-1 ${
    step.completed
      ? `${step.color}`
      : "bg-gray-200 border-gray-300"
  }`}
>

</span>

      {/* Texte */}
      <div>
        <p
          className={`text-sm font-semibold ${
            step.completed ? "text-gray-800" : "text-gray-400"
          }`}
        >
          {step.label}
        </p>
        {step.date && (
          <p className="text-xs text-gray-500">
            {dayjs(step.date).format("DD MMM YYYY HH:mm")}
          </p>
        )}
           {step.userWhoTreated?.length > 0 && (
            <ul className="flex flex-wrap gap-1 mt-2">
              {step.userWhoTreated.map((user, uIdx) => (
               user.name ? <li
                  key={uIdx}
                  className="inline-flex items-center px-2 py-1 text-xs text-gray-800"
                  title={user.name}
                >
                  <span className="flex flex-col gap-3">
                    {user.isCreator  && <span> Créateur: {user.name}</span>}
                    {!user.isCreator && user.status === 'in_progress' && <span> ingénieurs: {user.name}</span>}
                  </span>
                 
                </li>: user.discussion ? <li onClick={()=>setShowEchangedModal(true)}>
                  {user.messages} messages
                  <span className="block cursor-pointer text-orange-500 text-sm">Voir plus</span>
                  </li>:null
              ))}
            </ul>
          )}
          {step.customer_comment && <span className="text-xs  px-2 text-gray-800">{step?.customer_comment}</span>
          }
      </div>
    </div>
  ))}
</div>
          </div>
          {(user.role_id === 1 && ticket?.status === 'open' && !ticket?.treated_by?.last_name) && <Button
        label="Rejeter"
        className="bg-red-700 hover:bg-red-800"
        onClick={()=>handleReject(ticket.id)}
      />}
          {user.role_id == 3 && 
          ticket?.status === "in_progress" && <Button
      label="Discuter"
      className="bg-yellow-500 hover:bg-yellow-600"
      onClick={() => confirmStatusChange("Echanged")}
    />
          }
          {user.role_id == 3 && 
          ticket?.status === "resolved" && <Button
      label="Confirmer"
      className="bg-green-500 hover:bg-green-600"
      onClick={() => confirmStatusChange("confirmed")}
    />
          }

          {/* BTN */}
          {user.role_id === 4 &&  <div className="flex gap-3 flex-wrap mt-4">
  
  {(ticket?.status === "open" || ticket?.status === "customer_rejected")  && (
    <Button
      label="Débuter le traitement"
      onClick={() => confirmStatusChange("in_progress")}
    />
  )}

  {(ticket?.status === "in_progress" && ticket?.status !== "Résoudre")  && (
    <Button
      label="Discuter"
      className="bg-yellow-500 hover:bg-yellow-600"
      onClick={() => confirmStatusChange("Echanged")}
    />
  )}

  {ticket?.status === "in_progress"  && (
    <>     
      <Button
        label="Résolu"
        className="bg-green-600 hover:bg-green-700"
        onClick={() => confirmStatusChange("resolved")}
      />
    </>
  )}
  { ticket?.status === "customer_confirmation"  &&
      <Button
        label="Fermer"
        className="bg-gray-700 hover:bg-gray-800"
        onClick={() => confirmStatusChange("closed")}
      />
  }
   

</div>}

         
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ imagesData }) => {

    const galleriaRef = React.useRef(null);
  // Transform your images for Galleria
  const images = imagesData.map((file) => ({
    itemImageSrc: file.path,
    thumbnailImageSrc: file.path,
    alt: "attachment",
  }));

    const openFullscreen = () => {
    if (galleriaRef.current) {
      galleriaRef.current.show(); // open fullscreen
    }
  };

  

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ width: "100px", height: "70px", objectFit: "cover" }}
      />
    );
  };

  return (
    <>
    <Galleria
     ref={galleriaRef}
      value={images}
      numVisible={5}              // thumbnails visible
      circular                   // loop navigation
      showThumbnails
      showItemNavigators         // arrows for main images
      showIndicators             // small dots for navigation
      responsiveOptions={[
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ]}
      item={itemTemplate}
      thumbnail={thumbnailTemplate}
      fullScreen                  // enables fullscreen modal
    />
    <Button label="Voir" onClick={openFullscreen} />
    </>
  );
}

const Description = ({ description }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="max-w-4xl">
      <p
        className={`text-gray-700 leading-relaxed ${
          expanded ? "" : "truncate"
        }`}
      >
        {description}
      </p>

      {description?.length > 100 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-orange-500 text-sm mt-1 hover:underline"
        >
          {expanded ? "Voir moins" : "Voir plus"}
        </button>
      )}
    </div>
  );
};

const EchangedFormModal = ({ isOpen, onClose, onConfirm, ticketTitle,userConnected,ticket }) => {

  const dispatch = useDispatch();
const {user} = useSelector((state)=>state.authUser)

  const [comment, setComment] = React.useState('')
  const [files, setFiles] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsLoading(true)
    // Simule un délai API
    setTimeout(async () => {
      onConfirm(comment, files)
      setIsLoading(false)
    const response = await dispatch(fetchOneTicket(ticket?.id))
         if(response.payload.status){
          setComment("");
          setFiles([]);
         }
    }, 500)
  }

   const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
     onClick={handleOverlayClick} 
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Détail de traitement</h2>
          <p className="text-slate-600">{ticketTitle}</p>
        </div>

        <TicketMessages 
         currentUserId={userConnected} // ID de l'utilisateur connecté (ADJOBI PIERRE)
    />

        {(user?.role_id != 1 && ticket?.status !== 'closed') &&
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message * <span className="text-xs text-slate-500">(obligatoire)</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un message."
                rows={4}
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-vertical"
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pièces jointes (optionnel)
              </label>
              <div className="border-2 cursor-pointer border-black-300 rounded-2xl p-2 text-center group">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
              </div>
              {/* Files Preview */}
              {files.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full flex items-center gap-1">
                      📎 {file.name}
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="ml-1 text-orange-600 hover:text-orange-800 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 flex gap-3 justify-center rounded-b-3xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-white cursor-pointer font-medium rounded-xl bg-red-800"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isLoading || !comment.trim()}
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" pathLength="1" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" stroke="currentColor" strokeWidth="3" pathLength="1" className="opacity-75" />
                  </svg>
                  Enregistrement...
                </>
              ) : (
                'Envoyer'
              )}
            </button>
          </div>
        </form>
        }
        
      </div>
    </div>
  )
}



const TicketMessages = ({ currentUserId }) => {
  //console.log('currentUserId',currentUserId)
  const { messages } = useSelector((state) => state.tickets)

  const messagesEndRef = React.useRef(null)
  const messagesContainerRef = React.useRef(null)

  const [showScrollButton, setShowScrollButton] = React.useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const checkScrollPosition = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current

      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10)
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const { groupedMessages, dates } = React.useMemo(() => {
    const groups = {}

    messages?.forEach((msg) => {
      const dateKey = dayjs(msg.created_at, "DD/MM/YYYY HH:mm").format(
        "YYYY-MM-DD"
      )

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].push(msg)
    })

    const sortedDates = Object.keys(groups).sort()

    return {
      groupedMessages: groups,
      dates: sortedDates
    }
  }, [messages])

  const isOwnMessage = (message) => {
    return Number(message.user.id) === Number(currentUserId)
  }

  return (
    <div className="flex flex-col bg-white">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
        onScroll={checkScrollPosition}
      >
        {dates.map((dateKey) => {
          const dateMessages = groupedMessages[dateKey]
          const dateLabel = dayjs(dateKey).format("dddd D MMMM")

          return (
            <div key={dateKey} className="space-y-4">
              <div className="flex items-center justify-center my-6">
                <div className="px-6 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-3xl backdrop-blur-sm">
                  <span className="text-xs font-semibold text-slate-600 tracking-wide">
                    {dateLabel}
                  </span>
                </div>
              </div>

              {dateMessages?.map((message) => {
                const own = isOwnMessage(message)
                
                return (
                  <div
                    key={message?.id}
                    className={`flex ${
                      own ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${own ? "order-2" : ""}`}
                    >
                      <div
                        className={`p-4 rounded-2xl shadow-sm ${
                          own
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white ml-8"
                            : "bg-white border border-slate-200 text-slate-900 mr-8"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message?.message}
                        </p>

                        {message?.attachments?.length > 0 && (
                          <AttachmentViewer 
                          attachments={message?.attachments}
                          />
                        )}
                      </div>

                      <div
                        className={`flex items-center gap-2 mt-2 ${
                          own ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span
                          className={`text-xs ${
                            own
                              ? "text-slate-500"
                              : "text-slate-500"
                          }`}
                        >
                          {dayjs(
                            message?.created_at,
                            "DD/MM/YYYY HH:mm"
                          ).format("HH:mm")}
                        </span>

                        <div className="flex items-center justify-center text-gray-500 text-xs font-semibold">
                            {message?.user?.first_name}
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}

        {messages?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-500">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            <h4 className="text-lg font-semibold text-slate-600 mb-1">
              Aucun message
            </h4>

            <p className="text-sm">
              Les messages apparaîtront ici
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages?.length > 0 && showScrollButton && (
        <div className="p-3 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
          <button
            onClick={scrollToBottom}
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}


export default TicketsDetails;
