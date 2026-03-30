// store/slices/messageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showError: false,
  showSuccess: false,
  showInfo: false,
  showWarning: false,
  message: '',
  severity: null, // 'error', 'success', 'info', 'warning'
  duration: 5000, // durée d'affichage en ms
};

const messageSlice = createSlice({
  name: 'showError',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      const { severity, message, duration = 5000 } = action.payload;
      
      //console.log("showMessage",action)
      
      // Activer le bon flag
      switch(severity) {
        case 'error':
          state.showError = true;
          break;
        case 'success':
          state.showSuccess = true;
          break;
        case 'info':
          state.showInfo = true;
          break;
        case 'warning':
          state.showWarning = true;
          break;
        default:
          state.showInfo = true;
      }
      
      state.message = message;
      state.severity = severity;
      state.duration = duration;
    },
    
    hideMessage: (state) => {
      state.showError = false;
      state.showSuccess = false;
      state.showInfo = false;
      state.showWarning = false;
      state.message = '';
      state.severity = null;
    },
    
    hideError: (state) => {
      state.showError = false;
      if (!state.showSuccess && !state.showInfo && !state.showWarning) {
        state.message = '';
        state.severity = null;
      }
    },
    
    hideSuccess: (state) => {
      state.showSuccess = false;
    },
    
    hideInfo: (state) => {
      state.showInfo = false;
    },
    
    hideWarning: (state) => {
      state.showWarning = false;
    }
  }
});

export const { 
  showMessage, 
  hideMessage, 
  hideError, 
  hideSuccess, 
  hideInfo, 
  hideWarning 
} = messageSlice.actions;

export default messageSlice.reducer;