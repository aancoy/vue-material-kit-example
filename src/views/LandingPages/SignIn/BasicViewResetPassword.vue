<script setup>
import { onMounted, ref } from "vue";

// example components
import Header from "@/examples/Header.vue";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import apiClient from "../../../helper/httpclient";
import { useRouter } from "vue-router";

const email = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const router = useRouter();

const resetPassword = () => {
  try {
    apiClient.defaults.headers.common["Authorization"] = "";
    return apiClient
      .post("/auth/resetPassword", {
        email: email.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      })
      .then((response) => {
        if (response.status === 200) {
          router.push("/login");
        }
      });
  } catch (error) {
    console.error("An error occurred while signing in:", error);
  }
};

onMounted(() => {
  setMaterialInput();
});
</script>
<template>
  <!-- <DefaultNavbar transparent /> -->
  <Header>
    <div
      class="page-header align-items-start min-vh-100"
      :style="{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)',
      }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-4 col-md-8 col-12 mx-auto">
            <div class="card z-index-0 fadeIn3 fadeInBottom">
              <div
                class="card-header p-0 position-relative mt-n4 mx-3 z-index-2"
              >
                <div
                  class="bg-gradient-success shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    Reset Password
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <form role="form" class="text-start" @submit.prevent="false">
                  <MaterialInput
                    id="email"
                    class="input-group-outline my-3"
                    :label="{ text: 'Email', class: 'form-label' }"
                    type="email"
                    v-model="email"
                  />
                  <MaterialInput
                    id="oldPassword"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Old Password', class: 'form-label' }"
                    type="password"
                    v-model="oldPassword"
                  />

                  <MaterialInput
                    id="newPassword"
                    class="input-group-outline mb-3"
                    :label="{ text: 'New Password', class: 'form-label' }"
                    type="password"
                    v-model="newPassword"
                  />

                  <MaterialInput
                    id="confirmPassword"
                    class="input-group-outline mb-3"
                    :label="{ text: 'Confirm Password', class: 'form-label' }"
                    type="password"
                    v-model="confirmPassword"
                  />

                  <div class="text-center">
                    <MaterialButton
                      class="my-4 mb-2"
                      variant="gradient"
                      color="success"
                      fullWidth
                      @click="resetPassword"
                      >Reset</MaterialButton
                    >
                    <RouterLink
                      :to="{ name: 'signin-basic' }"
                      class="dropdown-item border-radius-md"
                    >
                      <span>Sign in</span>
                    </RouterLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer position-absolute bottom-2 py-2 w-100">
        <div class="container">
          <div class="row align-items-center justify-content-lg-between">
            <div class="col-12 col-md-6 my-auto">
              <div
                class="copyright text-center text-sm text-white text-lg-start"
              >
                © {{ new Date().getFullYear() }}, made with
                <i class="fa fa-heart" aria-hidden="true"></i> by
                <a href="#" class="font-weight-bold text-white">Farhan</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </Header>
</template>
