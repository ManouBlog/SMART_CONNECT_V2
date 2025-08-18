<script>
import instance from "../api/api";
// import Swal from "sweetalert2";
export default {
  name: "HeaderDash",
  data() {
    return {
      user: this.$store.state.user,
      role: this.$store.state.role,
    };
  },
  methods: {
    deconnex() {
      instance
        .get("auth_logout")
        .then((res) => {
          console.log(res);
          if (res) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            this.$store.state.user = null;
            this.$store.state.token = null;
            
            // Swal.fire({
            //   icon: "success",
            //   title: res.data.message,
            //   showConfirmButton: false,
            //   timer: 1500,
            // });
            this.$router.push("/");
            // setTimeout(() => {
            //   this.$router.push("/");
            // }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log(localStorage.getItem("token"));
    console.log("store", this.$store.state.token);
  },
};
</script>
<template>
  <!-- <div class="profile" v-show="my_profile">
    <div class="card">
      <div class="card-body p-5">
        <h1 class="badge bg-primary h3">Mon compte</h1>
        <form @submit.prevent="inscription">
          <div class="row">
            <div class="form-group col-lg-6">
              <label>Nom</label>
              <input
                type="text"
                v-model="nom"
                required
                placeholder="ex:Adjobi"
              />
            </div>
            <div class="form-group col-lg-6">
              <label>Prénoms</label>
              <input
                type="text"
                v-model="prenoms"
                required
                placeholder="ex:kadjo pierre"
              />
            </div>

            <div class="form-group col-lg-6">
              <label>Télephone</label>
              <input
                type="text"
                v-model.number="phone"
                required
                placeholder="ex:0545749741"
                pattern="[0-9]*"
              />
              <span
                class="d-block text-danger entreprise_caractere"
                v-if="typeof this.phone === 'string'"
                ><b>*le numéro doit être en chiffres</b></span
              >
            </div>
            <div class="form-group col-lg-6">
              <label>Ville</label>
              <input
                type="text"
                v-model="ville"
                required
                placeholder="ex:Abidjan"
              />
            </div>

            <div class="form-group col-lg-6">
              <label>Commune</label>
              <input
                type="text"
                v-model="commune"
                required
                placeholder="ex:yopougon"
              />
            </div>
            <div class="form-group col-lg-6">
              <label>Quartier</label>
              <input
                type="text"
                v-model="quartier"
                required
                placeholder="ex:Maroc"
              />
            </div>
            <div class="form-group col-lg-6">
              <label>Diplome</label>
              <input
                type="text"
                v-model="diplome"
                required
                placeholder="ex:licence 3 informatique"
              />
            </div>
            <div class="form-group col-lg-6">
              <label>E-mail</label>
              <input
                type="email"
                v-model="email"
                required
                placeholder="ex:adjobi@gmail.com"
              />
              <span v-if="My_email"
                ><b class="text-danger">*l'email existe deja</b></span
              >
            </div>
            <div class="form-group col-lg-6">
              <label>Password</label>
              <input
                type="password"
                v-model="password"
                placeholder="*********"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <button class="btn-lg bg-danger btn-block">Annuler</button>
            <button class="btn-lg btn-primary btn-block" type="submit">
              Modifier mon compte
            </button>
          </div>
        </form>
      </div>
    </div>
  </div> -->
  <div class="page-header">
    <div class="header-wrapper row m-0">
      <div class="header-logo-wrapper col-auto p-0">
        <div class="logo-wrapper">
          <a href="index.html"
            ><img class="img-fluid" src="asset/images/logo/logo.png" alt=""
          /></a>
        </div>
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
        <!-- <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
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
                    d="M11.2753 2.71436C16.0029 2.71436 19.8363 6.54674 19.8363 11.2753C19.8363 16.0039 16.0029 19.8363 11.2753 19.8363C6.54674 19.8363 2.71436 16.0039 2.71436 11.2753C2.71436 6.54674 6.54674 2.71436 11.2753 2.71436Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.8987 18.4878C20.6778 18.4878 21.3092 19.1202 21.3092 19.8983C21.3092 20.6783 20.6778 21.3097 19.8987 21.3097C19.1197 21.3097 18.4873 20.6783 18.4873 19.8983C18.4873 19.1202 19.1197 18.4878 19.8987 18.4878Z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </g></svg
          ></span>
        </div> -->
      </div>
      <div class="nav-right col-10 col-sm-6 pull-right right-header p-0">
        <ul class="nav-menus">
          <li>
            <div class="mode animated backOutRight">
              <svg
                class="lighticon"
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
                      d="M18.1377 13.7902C19.2217 14.8742 16.3477 21.0542 10.6517 21.0542C6.39771 21.0542 2.94971 17.6062 2.94971 13.3532C2.94971 8.05317 8.17871 4.66317 9.67771 6.16217C10.5407 7.02517 9.56871 11.0862 11.1167 12.6352C12.6647 14.1842 17.0537 12.7062 18.1377 13.7902Z"
                      stroke="#130F26"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </g>
              </svg>
              <svg
                class="darkicon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                ></path>
                <path
                  d="M18.3117 5.68834L18.4286 5.57143M5.57144 18.4286L5.68832 18.3117M12 3.07394V3M12 21V20.9261M3.07394 12H3M21 12H20.9261M5.68831 5.68834L5.5714 5.57143M18.4286 18.4286L18.3117 18.3117"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </li>
          <li class="d-md-none resp-serch-input">
            <div class="resp-serch-box"><i data-feather="search"></i></div>
            <div class="form-group search-form">
              <input type="text" placeholder="Search here..." />
            </div>
          </li>
          <li class="onhover-dropdown">
            <div class="notification-box">
              <svg
                v-if="user.user.statut.statut == 'etudiant'"
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
            </div>
          </li>
      
          <li class="profile-nav onhover-dropdown pe-0 py-0 me-0">
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
            <ul class="profile-dropdown onhover-show-div">
              <li @click="show_compte">
                <a href="#"><i data-feather="user"></i><span>Compte</span></a>
              </li>
              <li>
                <a href="#"
                  ><i class="bi bi-chat-left mx-2"></i><span>Messages</span></a
                >
              </li>
              <li>
                <a href="edit-profile.html"
                  ><i data-feather="settings"></i><span>Parameter</span></a
                >
              </li>
              <li @click.prevent="deconnex">
                <a href="javascript:void(0)"
                  ><i class="bi bi-box-arrow-in-left mx-2"></i
                  ><span>Se déconnecter</span></a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>

@import url("../../src/dash/css/color-1.css");
@import url("../../src/dash/css/vendors/font-awesome.css");
@import url("../../src/dash/css/vendors/icofont.css");
@import url("../../src/dash/css/vendors/themify.css");
@import url("../../src/dash/css/vendors/flag-icon.css");

@import url("../../src/dash/css/vendors/feather-icon.css");

@import url("../../src/dash/css/vendors/scrollbar.css");

@import url("../../src/dash/css/vendors/animate.css");

@import url("../../src/dash/css/vendors/date-picker.css");

@import url("../../src/dash/css/vendors/photoswipe.css");


@import url("../../src/dash/css/style.css");

@import url("../../src/dash/css/color-1.css");


@import url("../../src/dash/css/responsive.css");
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
.page-header{
  margin-top:0 !important;
}
.page-wrapper .page-header .header-wrapper{
  padding:1em 0 !important;
  justify-content: space-between;
}
</style>
