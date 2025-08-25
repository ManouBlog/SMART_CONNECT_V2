<template>
  <router-view />
</template>

<script>
import axios from "axios";
export default {
  name: "AppView",
  data() {
    return {};
  },
  methods: {
    getIpApparel(){
      fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
    // // console.log('Adresse IP publique :', data.ip);
    this.visiteur(data.ip)
  })
  .catch(error => {
    console.error('Erreur lors de la récupération de l\'adresse IP:', error);
  });
    },
    async visiteur(ipMachin) {
      if(sessionStorage.getItem("@visit") === null) {
  try {
    const response = await axios.post(`${process.env.VUE_APP_LIENS_BACKEND}api/visites`,{ip:ipMachin});
    // // console.log("response", response);
    if(response.data.status){
    sessionStorage.setItem("@visit", 1);
    }
   
  } catch (error) {
    console.log(error);
  }
}
    },
  },
  created() {
    // // console.log("rejf");
    localStorage.setItem('translate','fr')
    this.getIpApparel()
  },
};
</script>

<style>
.card{
  background: var(--secondary-color) !important;
  color:var(--third-color) !important;
}
html {
    font-size: 0.7em !important;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}
.p-icon .p-rating-icon {
  font-size: 2em !important;
}
.vue3-star-ratings__wrapper {
  display: block;
  text-align: left;
  padding: 0 !important;
  margin: 0 !important;
}
.ellipse_text {
  width: 100%; /* Définit une largeur fixe */
  overflow: hidden; /* Cache le texte qui déborde du conteneur */
  text-overflow: ellipsis;
  max-height: 11em; /* Affiche "..." lorsque le texte dépasse */
}

.p-paginator {
  font-size: 1.5em !important;
}
.conteneur_search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.p-datatable-thead {
  background: gray !important;
}
.p-datatable .p-datatable-footer {
  border: none;
}
th {
  background: var(--secondary-color) !important;
  color: var(--third-color) !important;
}
.p-datatable .p-column-header-content {
  justify-content: center !important;
}
table {
  border: 1px solid rgba(77, 77, 77, 0.615);
  border-collapse: unset !important;
}
.main-color,
.n-tabs-tab.n-tabs-tab--active {
  color: var(--main-color) !important;
}
.n-tabs .n-tabs-bar {
  background-color: var(--main-color) !important;
}
.background_main {
  background-color: var(--third-color) !important;
}
.background_secondary {
  background-color: var(--secondary-color) !important;
  color: var(--third-color) !important;
}
.conteneur-flex {
  display: flex;
  justify-items: center;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
}
.conteneur-image-logo {
  width: 250px;
  height: 150px;
  position: relative;
  padding: 2em;
}
.conteneur-image-logo img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.ProseMirror {
  margin: 0 1em;
}
.router-link-active.router-link-exact-active {
  color: rgb(211, 183, 1) !important;
  font-weight: bold;
}
.lien {
  transition: all 1s ease-in-out;
}
.ant-card-head {
  background: orange;
  font-weight: bold !important;
  font-size: 1.4em !important;
}

.p-icon {
  font-size: 1.5em !important;
}
.p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
  color: orange;
}
.p-tabview-nav {
  justify-content: center !important;
}
.p-tabview-nav li {
  list-style: none;
  list-style-type: none;
  font-weight: bold;
}
.p-button,
.multiselect__option--highlight {
  background: orange !important;
  border: 2px solid orange !important;
}
.multiselect__tags {
  border: 0.5px solid black !important;
}
.btn-designer {
  color: white !important;
  font-weight: bold !important;
  font-size: 1.5em !important;
  padding: 0.5em !important;
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-upload-wrapper
  .ant-upload-list.ant-upload-list-picture
  .ant-upload-list-item-error,
:where(.css-dev-only-do-not-override-17yhhjv).ant-upload-wrapper
  .ant-upload-list.ant-upload-list-picture-card
  .ant-upload-list-item-error {
  border-color: #9be79b !important;
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-upload-wrapper
  .ant-upload-list
  .ant-upload-list-item-error
  .ant-upload-list-item-name,
:where(.css-dev-only-do-not-override-17yhhjv).ant-upload-wrapper
  .ant-upload-list
  .ant-upload-list-item-error
  .ant-upload-icon
  .anticon {
  color: #000000 !important;
}

option {
  color: black !important;
}
input,
select {
  border: 2px solid orange;
}

@media screen and (min-width: 1200px) {
  :where(.css-dev-only-do-not-override-17yhhjv).ant-drawer {
    display: none;
  }
  :where(.css-dev-only-do-not-override-17yhhjv).ant-drawer.ant-drawer-header-title {
    justify-content: flex-end !important;
  }
}
.d-block {
  display: block;
  margin: 0.5em 0;
}
.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main {
  font-size: 1.3em;
  color: rgb(9, 46, 94) !important;
}
.n-collapse .n-collapse-item .n-collapse-item__header .n-collapse-item__header-main {
  justify-content: space-between;
}
.n-collapse-item__content-wrapper {
  padding: 0 0.8em;
  font-size: 1em;
  background: #b6baba61;
}
.n-collapse
  .n-collapse-item
  .n-collapse-item__content-wrapper
  .n-collapse-item__content-inner {
  padding: 0 !important;
}
.n-collapse-item__content-wrapper a {
  padding: 0.2em 0;
}
.multiselect__input {
  height: 10px !important;
}
.input::placeholder {
  color: gray !important;
}
.select[data-v-4c559c7a] {
  width: 100% !important;
}
input[type="checkbox"] {
  width: 20px !important;
  height: 20px !important;
}
.vc-popover-content-wrapper {
  width: 90%;
}
/*.vc-popover-content-wrapper{
  right: 44em !important;
  top: 6em !important;
  transform:none  !important;
}*/
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border: 1px solid #000000;
  background: #fff;
  font-size: 14px;
}
.p-datepicker table td > span {
  width: 5rem;
  height: 5rem;
}
#pv_id_1_panel {
  font-size: 1.5em;
}
.swal2-container {
  z-index: 999999 !important;
}
.experience button {
  background: transparent !important;
  color: black !important;
  border: none !important;
  font-weight: bold !important;
  height: auto;
}
.bi-person-workspace {
  cursor: pointer !important;
}
#app {
  font-family: "Montserrat", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav {
  padding: 30px;
  color: #000000;
}

#nav a {
  font-weight: bold;
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.bi-eye {
  color: black;
}
.social-tab ul li:nth-child(n + 2) {
  margin: 0 !important;
}
.conteneur_offre {
  height: 100vh;
}

.multiselect__tag,
.multiselect__option--highlight {
  background-color: orange !important;
  color: black !important;
}
.page-body {
  padding: 0 0 5em 0;
}
input {
  height: 39px !important;
  border: 1px solid orange;
}
textarea {
  padding: 0 1em;
}
</style>
