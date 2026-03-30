import { configureStore } from "@reduxjs/toolkit"
import isLoadingReducer from './slices/isLoadingSlice'
import roleReducer from "./slices/roleSlice";
import modalSlice from './slices/modalSlice'
import niveauDifficultSlice from "./slices/niveauDifficult"
import formuleSlice from './slices/formuleSlice'
import timeTreatmentSlice from './slices/timeTreatment'
import typeTicketsSlice from './slices/typeTickets'
import authSlice from './slices/authSlice'
import companySlice from './slices/companySlice'
import agentSlice from './slices/agentSlice'
import utilisateursSlice from './slices/utilisateurSlice'
import ticketsSlice from './slices/ticketsSlice'
import statistiqueSlice from './slices/statistiqueSlice'
import ProductSlice from './slices/productSlice'
import messageSlice from './slices/showErrorSlice'
export const store = configureStore({
  reducer: {
    isLoading: isLoadingReducer,
     roles: roleReducer,
     modal:modalSlice,
   niveauDifficult:niveauDifficultSlice,
   formules:formuleSlice,
   timeTreatment:timeTreatmentSlice,
   typeTickets:typeTicketsSlice,
   authUser:authSlice,
   Company:companySlice,
   agentsupport:agentSlice,
   utilisateurs:utilisateursSlice,
   tickets:ticketsSlice,
   statistiques:statistiqueSlice,
   products:ProductSlice,
   showError:messageSlice
  },
})
