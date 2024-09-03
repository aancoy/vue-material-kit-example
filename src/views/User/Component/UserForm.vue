<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";

//  material-input
import setMaterialInput from "@/assets/js/material-input";
import apiClient from "../../../helper/httpclient";


const inputValue = ref('');

const router = useRouter();
const route = useRoute();
const email = ref("");
const password = ref("");
const fullName = ref("");
const role = ref("");

const createData = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Use the token, e.g., for making authenticated API requests
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    if (inputValue.value != "" && inputValue.value != null) {
      
      
      const response = await apiClient.put(`/user/${inputValue.value}`, {
        email: email.value,
        name: fullName.value,
        role: role.value,
      });
      if (response.status === 200) {
        router.push("/user");
      }
    }else{
      const response = await apiClient.post("/auth/signup", {
        email: email.value,
        password: password.value,
        fullName: fullName.value,
        role: role.value,
      });
      if (response.status === 200) {
        router.push("/user");
      }
    }
  } catch (error) {
    console.error("An error occurred while signing in:", error);
  }
};


onMounted(() => {
  inputValue.value = route.params.id || '';
  fullName.value = route.query.name || '';
  email.value = route.query.email || '';
  role.value = route.query.role || '';
  setMaterialInput();
});
</script>
<template>
  <section>
    <div class="container py-7">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <h3 class="text-center">User Form</h3>
          <form
            role="form"
            id="contact-form"
            method="post"
            autocomplete="off"
            @submit.prevent="false"
          >
            <div class="card-body">
              <div class="row">
                <MaterialInput
                  id="fname"
                  class="input-group-dynamic mb-4"
                  :label="{ text: 'Full Name', class: 'form-label' }"
                  type="text"
                  v-model="fullName"
                />
                <div class="mb-4">
                  <MaterialInput
                    id="email"
                    class="input-group-dynamic"
                    :label="{ text: 'Email Address', class: 'form-label' }"
                    type="email"
                    v-model="email"
                  />
                </div>
                <div class="mb-4" v-if="!inputValue">
                  <MaterialInput
                    id="password"
                    class="input-group-dynamic"
                    :label="{ text: 'Password', class: 'form-label' }"
                    type="password"
                    v-model="password"
                  />
                </div>
                <div class="mb-4">
                  <MaterialInput
                    id="role"
                    class="input-group-dynamic"
                    :label="{ text: 'Role', class: 'form-label' }"
                    type="text"
                    v-model="role"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="col-md-12">
                  <MaterialButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                    @click="createData"
                    >Submit</MaterialButton
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
