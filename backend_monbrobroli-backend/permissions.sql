-- Création de la base de données
CREATE DATABASE IF NOT EXISTS cp2658364p08_brobroli
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cp2658364p08_brobroli;

-- Création de la table permissions
CREATE TABLE IF NOT EXISTS permissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  label VARCHAR(150) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion des permissions
INSERT INTO permissions (name, label) VALUES
('Dashboard', 'Accéder au tableau de bord et aux statistiques générales'),

('Domaines', 'Créer, modifier et gérer les domaines d’activité'),

('Poste', 'Créer, modifier et supprimer les postes'),

('Utilisateur.view', 'Consulter la liste et les détails des utilisateurs'),

('Utilisateur.permission', 'Gérer les permissions et rôles des utilisateurs'),

('Entreprises', 'Créer, modifier et gérer les entreprises'),

('Etudiants', 'Créer, modifier et gérer les profils étudiants'),

('Messages', 'Envoyer et gérer les messages et notifications'),

('Offres', 'Créer, modifier et consulter les offres'),

('Contrat', 'Créer, modifier et gérer les contrats'),

('Abonnements', 'Gérer les abonnements et leurs paramètres'),

('Paiements', 'Consulter et gérer les paiements et transactions'),

('Temoignages', 'Gérer les témoignages et avis utilisateurs'),

('Partenaires', 'Créer, modifier et gérer les partenaires'),

('Publicités', 'Créer, modifier et gérer les campagnes publicitaires'),

('Date_lancement', 'Gérer les dates de lancement et événements importants')
;
