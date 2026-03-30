import React from "react";
import Button from "./Button";


export default function ScreenDelete({
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ?",
  onCancel,
  onConfirm,
  loading = false,
  btn_text='Supprimer',
  text_loading="Suppression..."
}) {

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-center">
        {title}
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center">
        {message}
      </p>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button
          label="Annuler"
          className="bg-gray-400 hover:bg-gray-500"
          onClick={onCancel}
        />

        <Button
        
          label={loading ? text_loading : btn_text}
          className="bg-red-600 hover:bg-red-700"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}
