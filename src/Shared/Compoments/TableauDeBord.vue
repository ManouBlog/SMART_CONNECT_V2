<script>
// import StatisticsChart from './StatisticsChart.vue';
export default {
    name:"TableauDeBord",
    // components:{StatisticsChart},
    props:{
    infosArray:{type:Array}
    },
    data() {
        return{
      showModal: false,
      selectedItem: null,
      activeTab: 'registered'
        }
    },
    computed: {
        todayLabel() {
    const today = new Date()

    return today.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')
  },
  registeredList() {
    return this.infosArray[0].infosReferrals?.filter(
      user => user.is_registered
    )
  },
  subscribedList() {
    return this.infosArray[0].infosReferrals?.filter(
      user => user.has_subscription
    )
  }
},
    methods: {
    openModal() {
      // this.selectedItem = item
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      // this.selectedItem = null
    }
  },
}
</script>
<template>
    <div class="conteneur_tableau_de_bord">
        <a-card v-for="(item,index) in infosArray"
        :key="index"
        :title="item.libelle" 
        :bordered="false"
        style="width: 300px">
          <h1>{{item.nbre}}</h1>
           <a-button
        v-if="item.btn"
        type="primary"
        shape="round"
        style="margin-top: 1em;position:absolute;bottom:1em;right:0;"
        @click="openModal()"
      
      >
        Voir plus
      </a-button>
        </a-card>
      </div>
    <a-modal
  v-model:open="showModal"
  title="Liste des personnes parrainées"
  @cancel="closeModal"
  :footer="null"
>
  <div v-if="infosArray[0].infosReferrals?.length">
   <a-tabs v-model:activeKey="activeTab" centered>
  <a-tab-pane key="registered" :tab="`Inscrits ${registeredList.length}`" />
  <a-tab-pane key="subscribed" :tab="`Abonnés ${subscribedList.length}`" />
   <!-- <a-tab-pane key="statistics" tab="statistiques" /> -->
</a-tabs>

<div style="max-height: 400px; overflow:auto; margin-top:1em">

  <!-- TAB INSCRITS -->
  <ul v-if="activeTab === 'registered'" class="custom-list">
    <li
      v-for="(user, index) in registeredList"
      :key="'reg-' + index"
      class="custom-item"
    >
      -{{ user.name }}
    </li>
    <li v-if="!registeredList.length" class="empty">
      Aucun inscrit
    </li>
  </ul>

  <!-- TAB ABONNES -->
  <ul v-if="activeTab === 'subscribed'" class="custom-list">
    <li
      v-for="(user, index) in subscribedList"
      :key="'sub-' + index"
      class="custom-item"
    >
      -{{ user.name }}
    </li>
    <li v-if="!subscribedList.length" class="empty">
      Aucun abonné
    </li>
  </ul>
  <!-- <div v-if="activeTab === 'statistics'">
    <StatisticsChart 
    :labels="this.todayLabel"
    :registeredCount="[2]"
    :subscribedCount="[5]"
    />
  </div> -->

</div>


  </div>

  <div v-else style="text-align:center; padding:2em;">
    Aucune personne parrainée.
  </div>
   </a-modal>

</template>
<style scoped>
:deep(:where(.css-dev-only-do-not-override-17yhhjv).ant-btn-primary){
  color:rgb(248, 248, 248) !important;
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
:deep(.ant-card-head){
  background: rgb(162, 162, 162) !important;
 
}
:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-body,:where(.css-dev-only-do-not-override-17yhhjv).ant-card .ant-card-head{
  border:2px solid orange;
  
}

</style>