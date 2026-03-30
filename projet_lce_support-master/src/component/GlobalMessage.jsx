// components/GlobalMessage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Message } from 'primereact/message';
import { hideError, hideSuccess, hideInfo, hideWarning } from '../store/slices/showErrorSlice';

export default function GlobalMessage() {
  const dispatch = useDispatch();
  
  // Récupérer les états depuis Redux
  const { 
    showError, 
    showSuccess, 
    showInfo, 
    showWarning, 
    message,
    duration 
  } = useSelector((state) => state.showError);

  // Effet pour masquer automatiquement après duration
  useEffect(() => {
    if (showError || showSuccess || showInfo || showWarning) {
      const timer = setTimeout(() => {
        if (showError) dispatch(hideError());
        if (showSuccess) dispatch(hideSuccess());
        if (showInfo) dispatch(hideInfo());
        if (showWarning) dispatch(hideWarning());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [showError, showSuccess, showInfo, showWarning, duration, dispatch]);

  // Si aucun message n'est affiché, ne rien rendre
  if (!showError && !showSuccess && !showInfo && !showWarning) {
    return null;
  }

  // Déterminer la sévérité et le style
  let severity = 'info';
  let bgColor = 'bg-blue-50';
  let textColor = 'text-blue-700';
  let borderColor = 'border-blue-200';

  if (showError) {
    severity = 'error';
    bgColor = 'bg-red-50';
    textColor = 'text-red-700';
    borderColor = 'border-red-200';
  } else if (showSuccess) {
    severity = 'success';
    bgColor = 'bg-green-50';
    textColor = 'text-green-700';
    borderColor = 'border-green-200';
  } else if (showWarning) {
    severity = 'warn';
    bgColor = 'bg-yellow-50';
    textColor = 'text-yellow-700';
    borderColor = 'border-yellow-200';
  }

  return (
    <div className="fixed top-5 right-5 z-1000 max-w-md shadow-lg animate-slideIn">
      <Message
        severity={severity}
        text={message}
        className={`${bgColor} ${textColor} ${borderColor} border p-4 rounded-lg`}
        style={{ minWidth: '300px' }}
      />
    </div>
  );
}