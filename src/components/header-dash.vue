<script>
/* eslint-disable */
import axios from "axios";
import Swal from "sweetalert2";
import ListeMenuMobile from "./ListMenuMobile.vue";
export default {
  name: "HeaderDash",
  components: {
    ListeMenuMobile,
  },
  data() {
    return {
      user: this.$store.state.user,
      menu_bar: false,
      // compte: this.$store.state.compte,
      // statut: this.$store.state.statut,
      lentgh: this.$store.state.lentgh,
      showMessageNew: false,
    };
  },
  methods: {
    show_compte() {
      this.$router.push("/modifier_compte");
    },
    dark() {
      let dark = document.getElementById("dark-mode");
      dark.style.backgroundColor = "black";
      console.log(dark);
    },
    deconnex() {
      this.$store.commit("TOOGLESPINNER", true);
      axios
        .get("https://backend.monbrobroli.com/api/auth_logout", {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === true) {
            Swal.fire({
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // localStorage.removeItem("compte");
            // localStorage.removeItem("statut");

            this.$store.state.user = null;
            this.$store.state.token = null;
            // this.$store.state.compte = null;
            // this.$store.state.statut = null;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$store.commit("TOOGLESPINNER", false);
        });
    },
    toggleMenu() {
      
      this.menu_bar = !this.menu_bar;
    },
    get_entreprise_who_contact_student() {
      this.spinner = true;
      axios
        .get("https://backend.monbrobroli.com/api/get_who_contact_student", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((res) => {
          console.log(res);
          this.student = res.data;
          console.log("STUDENTS_ENTREPRISES", this.student);
          this.list_entreprise_contact = this.student.entreprises;
          localStorage.setItem("length", this.list_entreprise_contact.length);
          setTimeout(() => {
            if (this.list_entreprise_contact.length > this.lentgh) {
              this.showMessageNew = true;
            }
          }, 1000);
          console.log("LISTS_ENTREPRISES", this.list_entreprise_contact);
          this.spinner = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(localStorage.getItem("token"));
    console.log("store", this.$store.state.token);
    // this.get_entreprise_who_contact_student();
  },
};
</script>
<template>
  <div class="page-header">
    <div class="Myspinner" v-show="this.$store.state.spinnerLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div class="header-wrapper">
      <div class="header-logo-wrapper col-auto p-0">
        <div class="toggle-sidebar">
          <div class="status_toggle sidebar-toggle d-flex">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z"
                    stroke="#130F26"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z"
                    stroke="#130F26"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z"
                    stroke="#130F26"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z"
                    stroke="#130F26"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="left-side-header col ps-0 d-none d-md-block">
        <div class="input-group"></div>
      </div>
      <div class="nav-right col-10 col-sm-6 pull-right right-header p-0">
        <ul class="nav-menus">
          <li class="d-md-none resp-serch-input">
            <div class="resp-serch-box"><em data-feather="search"></em></div>
            <div class="form-group search-form">
              <input type="text" placeholder="Search here..." />
            </div>
          </li>
          <li class="onhover-dropdown">
            <div class="notification-box">
              <svg
                v-if="user.statut.statut == 'etudiant'"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.9961 2.51416C7.56185 2.51416 5.63519 6.5294 5.63519 9.18368C5.63519 11.1675 5.92281 10.5837 4.82471 13.0037C3.48376 16.4523 8.87614 17.8618 11.9961 17.8618C15.1152 17.8618 20.5076 16.4523 19.1676 13.0037C18.0695 10.5837 18.3571 11.1675 18.3571 9.18368C18.3571 6.5294 16.4295 2.51416 11.9961 2.51416Z"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M14.306 20.5122C13.0117 21.9579 10.9927 21.9751 9.68604 20.5122"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </g></svg
              ><span class="badge rounded-pill badge-warning"></span>
              <span class="badge bg-primary" v-show="showMessageNew">new</span>
            </div>
          </li>
          <li
            class="profile-nav onhover-dropdown pe-0 py-0 me-0"
            @mouseenter="menu_bar = true"
             @click="toggleMenu"
          >
            <div class="media profile-media">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.55851 21.4562C5.88651 21.4562 2.74951 20.9012 2.74951 18.6772C2.74951 16.4532 5.86651 14.4492 9.55851 14.4492C13.2305 14.4492 16.3665 16.4342 16.3665 18.6572C16.3665 20.8802 13.2505 21.4562 9.55851 21.4562Z"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.55849 11.2776C11.9685 11.2776 13.9225 9.32356 13.9225 6.91356C13.9225 4.50356 11.9685 2.54956 9.55849 2.54956C7.14849 2.54956 5.19449 4.50356 5.19449 6.91356C5.18549 9.31556 7.12649 11.2696 9.52749 11.2776H9.55849Z"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M16.8013 10.0789C18.2043 9.70388 19.2383 8.42488 19.2383 6.90288C19.2393 5.31488 18.1123 3.98888 16.6143 3.68188"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M17.4608 13.6536C19.4488 13.6536 21.1468 15.0016 21.1468 16.2046C21.1468 16.9136 20.5618 17.6416 19.6718 17.8506"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
              <span v-if="user" class="fw-bold mx-2">{{ this.user.nom }}</span>
            </div>
            <ul class="profile-dropdown onhover-show-div menu_web" v-if="menu_bar">
              <li @click="show_compte">
                <a href="#"><i data-feather="user"></i><span>Compte</span></a>
              </li>
              <li @click.prevent="deconnex">
                <a href="javascript:void(0)"
                  ><i class="bi bi-box-arrow-in-left mx-2"></i
                  ><span>Se déconnecter</span></a
                >
              </li>
            </ul>
            <ul class="menu_mobile profile-dropdown" v-if="menu_bar">
              <ListeMenuMobile>
                <template #header>
                  <li @click="show_compte" >
                    <a href="#"><i data-feather="user"></i><span>Compte</span></a>
                  </li>
                </template>
                <template #footer>
                  <li @click.prevent="deconnex">
                    <a href="javascript:void(0)"
                      ><i class="bi bi-box-arrow-in-left mx-2"></i
                      ><span>Se déconnecter</span></a
                    >
                  </li>
                </template>
              </ListeMenuMobile>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
.profile {
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
.menu_mobile{
      display: none;
    }
@media only screen and (min-width: 991.98px) {
  .header-logo-wrapper {
    display: none;
  }
 .menu_mobile{
      display: none;
    }
    
}
@media only screen and (max-width: 991.98px) {
  
    .menu_mobile{
      display: block;
    }
        .page-header .header-wrapper .nav-right.right-header ul.profile-dropdown {
        position: fixed;
        top: 60px;
        right: 15px !important;
    }
    .menu_web{
      display: none;
    }
}

</style>
