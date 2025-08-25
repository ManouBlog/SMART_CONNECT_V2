<script>
import instance from "../../../api/api";
import Swal from "sweetalert2";
import { mapActions } from "pinia";
import { useLoadingSpinner } from "../../../store-pinia/LoadingSpinner/useLoadingSpinner";
export default {
  name: "ForgotPassword",
  data() {
    return {
      open: true,
      formState: {
        email: "",
      },
    };
  },
  methods: {
    ...mapActions(useLoadingSpinner, ["launchLoading"]),
    onFinish(values) {
      console.log("Success:", values);
      this.sendMsgEmailForgot();
    },
    sendMsgEmailForgot() {
      this.launchLoading(true);
      instance
        .post("password/createNewPassword", {
          email: this.formState.email,
        })
        .then((res) => {
          // console.log(res.data.message);

          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: true,
          });
          this.launchLoading(false);
        })
        .catch((err) => {
          alert(JSON.stringify(err,null,2))
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: true,
          });
          this.launchLoading(true);
        });
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
    autocomplete="on"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item>
      <div class="d-flex justify-content-center">
        <a-button type="primary" shape="round" :size="'large'" html-type="submit">
          Envoyer</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>
