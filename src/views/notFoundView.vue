<script>
    export default {
      name: "notFoundView",
      data() {
        return {};
      },
      methods: {
        back() {
          this.$router.push("/");
        },
      },
    };
    </script>
    
    <template>
      <div class="Myspinner">
        <h1 class="badge bg-primary h1">404</h1>
        <p>OOPS</p>
        <h1>Desolé page pas trouvée.</h1>
        <button class="btn-lg bg-primary" @click="$router.go(-1)">Retour</button>
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
      flex-direction: column;
      place-items: center;
      justify-content: center;
    }
    p {
      font-size: 9em;
    }
    </style>
    