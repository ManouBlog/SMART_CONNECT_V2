<script>
export default {
  name: "TableauDeBord",

  props: {
    infosArray: { type: Array }
  },

  data() {
    return {
      showModal: false,
      selectedItem: null,
      activeTab: "registered",
      selectedLibelle: ""
    }
  },

  computed: {
    todayLabel() {
      const today = new Date()

      return today
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        })
        .replace(/\//g, "-")
    },

    registeredList() {
      return this.infosArray?.[0]?.infosReferrals?.filter(
        user => user.is_registered
      ) || []
    },

    subscribedList() {
      return this.infosArray?.[0]?.infosReferrals?.filter(
        user => user.has_subscription
      ) || []
    },

    filteredSubscribedList() {
      if (!this.selectedLibelle) {
        return this.subscribedList
      }

      return this.subscribedList.filter(
        user => user.formule === this.selectedLibelle
      )
    }
  },

  methods: {
    openModal() {
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<template>
  <!-- CARDS -->
  <div class="conteneur_tableau_de_bord">
    <a-card
      v-for="(item, index) in infosArray"
      :key="index"
      :title="item.libelle"
      :bordered="false"
      style="width: 300px"
    >
      <h1>{{ item.nbre }}</h1>

      <a-button
        v-if="item.btn"
        type="primary"
        shape="round"
        style="margin-top: 1em; position: absolute; bottom: 1em; right: 0;"
        @click="openModal"
      >
        Voir plus
      </a-button>
    </a-card>
  </div>

  <!-- MODAL -->
  <a-modal
    v-model:open="showModal"
    title="Liste des personnes parrainées"
    @cancel="closeModal"
    :footer="null"
    :bodyStyle="{ 
    maxHeight: '500px', 
    overflowY: 'auto' 
  }"
  >
    <div v-if="infosArray?.[0]?.infosReferrals?.length">

      <!-- TABS -->
      <a-tabs v-model:activeKey="activeTab" centered>
        <a-tab-pane
          key="registered"
          :tab="`Inscrits ${registeredList.length}`"
        />
        <a-tab-pane
          key="subscribed"
          :tab="`Abonnés ${subscribedList.length}`"
        />
      </a-tabs>

      <div style="max-height: 400px; overflow: auto; margin-top: 1em">

        <!-- TAB INSCRITS -->
        <div v-if="activeTab === 'registered'">
          <table class="custom-table">
            <thead>
              <tr>
                <!-- <th>#</th> -->
                <th>Nom & prénoms</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in registeredList"
                :key="'reg-' + index"
              >
                <!-- <td>{{ index + 1 }}</td> -->
                <td>{{ user.name }}</td>
              </tr>

              <tr v-if="!registeredList.length">
                <td colspan="2" class="empty">
                  Aucun inscrit
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- TAB ABONNES -->
        <div v-if="activeTab === 'subscribed'">
         
          <!-- FILTRE -->
          <div class="filter-container">
            <select v-model="selectedLibelle" class="form-select">
              <option value="">Toutes les formules</option>
              <option value="ECO">ECO</option>
              <option value="PLATINUM">PLATINUM</option>
            </select>
          </div>
         <p style="text-align: right;">Total :{{ filteredSubscribedList.length }}</p>
          <table class="custom-table">
            <thead>
              <tr>
                <!-- <th>#</th> -->
                <th>Nom & prénoms</th>
                <th>Formule</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in filteredSubscribedList"
                :key="'sub-' + index"
              >
                <!-- <td>{{ index + 1 }}</td> -->
                <td>{{ user.name }}</td>
                <td>{{ user.formule }}</td>
              </tr>

              <tr v-if="!filteredSubscribedList.length">
                <td colspan="3" class="empty">
                  Aucun abonné
                </td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </div>

    <div v-else style="text-align: center; padding: 2em;">
      Aucune personne parrainée.
    </div>
  </a-modal>
</template>

<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-btn-primary) {
  color: rgb(248, 248, 248) !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color:orange !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-tabs .ant-tabs-ink-bar){
  background:orange !important;
}
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-btn-primary){
  background-color:orange !important;
}

.conteneur_tableau_de_bord {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  place-content: center;
  justify-content: center;
  gap: 1em;
  padding: 5em 0;
}

:deep(.ant-card-head) {
  background: rgb(162, 162, 162) !important;
}

:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-body,
:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-head {
  border: 2px solid orange;
}

/* TABLE */

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  border: 1px solid #e5e5e5;
  padding: 8px;
  text-align: left;
}

.custom-table th {
  background: #f5f5f5;
  font-weight: 600;
}

.empty {
  text-align: center;
  padding: 1em;
  color: gray;
}

.filter-container {
  margin-bottom: 1em;
}

.form-select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
}
</style>