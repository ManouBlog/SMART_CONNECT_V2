import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,       // état du modal
  title: "",           // titre optionnel
  content: null,       // contenu dynamique
  btnDelete:false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload?.title || "";
      state.content = action.payload?.content || null;
      state.btnDelete = action.payload.btnDelete;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = null;
      state.btnDelete= false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
