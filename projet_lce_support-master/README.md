# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## INFOS PROJET
sup_admin: adjobikadjopierre27@gmail.com, mot de passe : password

admin de l entreprise la locomotive creee : david@gmail.com , mot de passe:password
l utilisateur d'une entreprise a un mot de passe predefinie.

Ticket

-Création de ticket avec réference et sélection de produits (statut: open).
-le super-admin assigne le ticket à un ingénieurs.
-le super admin et l ingénieurs on la possibilité de rejete le ticket.
-l'ingénieurs (avec un matricule) traite le ticket en actionnant un bouton.(statut : in_progress)

                Traite sans échange

l'agent ajoute un statut (resolved), le client doit confirmer ou rejeter avec un commentaire.
-dans le cas de la confirmation le client ajoute un statut (customer_confirmation), l'ingénieurs ferme le ticket (statut:closed)
-dans le cas du rejet le client ajoute un statut (customer_rejected), l ingénieurs remet le ticket en statut (in_progress).

                 Traiter avec échange

-le ticket a des échanges, en tableau. 


Contrat
-l enregistrement de l'entreprise se faire avec un contrat (types de contrat) avec definition de date debut et date fin
-le renouvellement des formules se fait soit pas types de contrat avec 3 mois max pour les contrats optionnels. 


Entreprise
-archiver les entreprises (ne pas les delete)


Statistiques
-