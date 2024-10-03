<script>
import RegsiterStudents from "./features/students/RegsiterStudents.vue"
export default {
  name: "RegisterView",
  components:{
    RegsiterStudents
  },
  data() {
    return {
      open: true,
      value1:'student',
    };
  },
  methods: {
    onFinish(values) {
      console.log("Success:", values);
    },
    onFinishFailed(errorInfo) {
      console.log("Failed:", errorInfo);
    },
  },
};
</script>
<template>
    <a-form
    :layout="'vertical'"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
  <div>
    <span class="fw-bold">Sélectionner un statut</span>
    <a-select
  ref="select"
  v-model:value="value1"
  style="width: 100%;padding:0;margin-top:0.5em;margin-bottom:0.5em;"
   :size="'large'"
  @focus="focus"
  @change="handleChange"
>
  <a-select-option value="student">Etudiant</a-select-option>
  <a-select-option value="entreprise">Entreprise</a-select-option>
  <a-select-option value="particulier">Particulier</a-select-option>
</a-select>
  </div>
  <RegsiterStudents v-if="value1 === 'student' || value1 === 'particulier'" />
 
  </a-form>
</template>
