import React, { useState } from 'react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    nom: 'John',
    prenom: 'Doe',
    email: 'xxxxxx@gmail.com',
    telephone: '0102030405',
    role: '',
    motDePasse: '',
    confirmationMotDePasse: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
  };

  return (
      <form
        className="bg-white rounded-lg  w-full space-y-6"
      >

        {/* Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none"
          />
        </div>


        {/* Rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de service</label>
          <select
            name="role"
            value=""
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none bg-white"
          >
            <option value="">Type de service</option>
            <option value="admin">Administrateur</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>

        {/* Description*/}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            type="text"
            name="nom"
            value={formData.nom}
            placeholder='ajouter un commentaire'
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg  outline-none"
          />
        </div>
        <label htmlFor="">Niveau d'urgence</label><br />

        <div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="priority"
              value="high"
              className="form-radio text-red-500"
            />
            <span className="text-sm text-gray-700">Critique</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="priority"
              value="high"
              className="form-radio text-red-500"
            />
            <span className="text-sm text-gray-700">Majeur</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="priority"
              value="high"
              className="form-radio text-red-500"
            />
            <span className="text-sm text-gray-700">Mineur</span>
          </label>
        </div>
        

        {/* Boutons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#E27B1B] text-white rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Enregistrer
          </button>
        </div>
      </form>
  );
};

export default TicketForm;
