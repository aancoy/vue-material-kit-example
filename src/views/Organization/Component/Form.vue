<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

//Vue Material Kit 2 components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";

//  material-input
import setMaterialInput from "@/assets/js/material-input";
import apiClient from "../../../helper/httpclient";

const router = useRouter();
const route = useRoute();

const inputValue = ref("");
const name = ref("");
const desc = ref("");

const createData = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Use the token, e.g., for making authenticated API requests
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    if (inputValue.value != "" && inputValue.value != null) {
      const response = await apiClient.put(
        `/organization/${inputValue.value}`,
        {
          name: name.value,
          descriptions: desc.value,
        }
      );
      if (response.status === 200) {
        router.push("/organization");
      }
    } else {
      const response = await apiClient.post("/organization", {
        name: name.value,
        descriptions: desc.value,
      });
      if (response.status === 200) {
        router.push("/organization");
      }
    }
  } catch (error) {
    console.error("An error occurred while signing in:", error);
  }
};

onMounted(() => {
  setMaterialInput();
  inputValue.value = route.params.id || "";
  name.value = route.query.name || '';
  desc.value = route.query.descriptions || '';
});
</script>
<template>
  <section>
    <div class="container py-7">
      <div class="row">
        <div class="col-lg-7 mx-auto d-flex justify-content-center flex-column">
          <h3 class="text-center">Organization Form</h3>
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
                  id="name"
                  class="input-group-dynamic mb-4"
                  :label="{ text: 'Name', class: 'form-label' }"
                  type="text"
                  v-model="name"
                />
              </div>
              <div class="mb-4">
                <MaterialTextArea
                  class="input-group-static mb-4"
                  id="message"
                  :rows="4"
                  v-model="desc"
                  >Description</MaterialTextArea
                >
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
