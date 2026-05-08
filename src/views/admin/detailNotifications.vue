<script>
/* eslint-disable */
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Image from "primevue/image";
export default {
  name: "DétailStudentView",
  components: {
    Image,
  },
  data() {
    return {
      student: null,
      students: null,
      jours: null,
      spinner: false,
      detailMessage:'',
    };
  },
  methods: {
     get_messages() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/getEmailNewsletter", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("getEmailNewsletter", res);
          const allMessages = [...res.data.data.newsletter,...res.data.data.notifications]
          const messagesForDetail = allMessages.map(item=>{
            return{
              id:item.id,
              email:item.email || item.user.email,
               objet:item.objet ? item.objet:'Visite de profile',
                type:item.type ? item.type:'Notification',
                 created_at:item.created_at,
                 msg:item.msg
            }
          }) 
          this.detailMessage = messagesForDetail.find(item=>item.id == this.$route.params.id);
          console.log("detailMessage", this.detailMessage);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
          
        });
    },
   
  },
  created() {
    this.get_messages();
  },
};
</script>
<template>
  <div class="page-body position-relative">
    <div class="Myspinner" v-show="spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <i class="bi bi-arrow-left-circle" @click="$router.go(-1)"></i>
    <div class="container-fluid">
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-sm-6"></div>
          <div class="col-12 col-sm-6">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Détails messages</li>
            </ol>
          </div>
        </div>
      </div>
      
    </div>
    <div class="card notification-card shadow-sm mb-3" v-if="detailMessage">
  <div class="card-body">
    <div class="notification-header d-flex justify-content-between align-items-center mb-2">
      <div class="notification-type badge bg-primary text-uppercase px-2 py-1">
        {{ detailMessage.type }}
      </div>
      <small class="text-muted">{{ new Date(detailMessage.created_at).toLocaleString() }}</small>
    </div>

    <h5 class="card-title fw-semibold mb-1" style="text-align:left;">
      {{ detailMessage.objet }}
    </h5>

    <p class="card-text text-secondary mb-2">
      {{ detailMessage.msg }}
    </p>

    <div class="notification-footer mt-3">
      <div class="user-email">
        <i class="bi bi-envelope"></i> Envoyer à {{ detailMessage.email }}
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<style scoped>
.bi-arrow-left-circle {
  cursor: pointer;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.Myspinner {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.625);
  display: flex;
  place-items: center;
  justify-content: center;
}

.notification-card {
  border: none;
  border-left: 5px solid #0d6efd;
  border-radius: 1rem;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.notification-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-left-color: #0b5ed7;
}

/* En-tête : type + date */
.notification-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .5rem;
}

.notification-type {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #0d6efd;
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  letter-spacing: 0.5px;
}

.notification-header small {
  color: #6c757d;
  font-size: 0.8rem;
}

/* Titre */
.notification-card .card-title {
  color: #212529;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

/* Message */
.notification-card .card-text {
  color: #495057;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}

/* Pied de carte */
.notification-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: .75rem;
  border-top: 1px solid #e9ecef;
  padding-top: .5rem;
}

.notification-footer .user-email {
  font-size: 0.85rem;
  color: #6c757d;
  width: 100%;
}

.notification-footer .btn {
  border-radius: 50px;
  padding: 3px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.notification-footer .btn-outline-primary {
  border-color: #0d6efd;
  color: #0d6efd;
}

.notification-footer .btn-outline-primary:hover {
  background-color: #0d6efd;
  color: #fff;
}

</style>
