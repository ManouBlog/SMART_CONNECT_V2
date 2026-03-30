import React, { useState } from 'react';

const RegisterForm = () => {
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
    // Logique d'envoi du formulaire ici
    //console.log(formData);
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg  w-full space-y-6"
      >
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Email & Téléphone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
        </div>

        {/* Rôle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>
        {/* Entreprise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
          >
            <option value="">Sélectionnez une entreprise</option>
            <option value="admin">Administrateur</option>
            <option value="user">Utilisateur</option>
          </select>
        </div>

        {/* Mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Confirmation du mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation du mot de passe</label>
          <input
            type="password"
            name="confirmationMotDePasse"
            value={formData.confirmationMotDePasse}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 py-5">
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

export default RegisterForm;
