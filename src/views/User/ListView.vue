<script setup>
import { computed, onMounted, ref } from "vue";

// Sections components
import BaseLayout from "../../layouts/sections/components/BaseLayout.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import Table from "./Component/CustomTable.vue";

// //nav-pills
import setNavPills from "@/assets/js/nav-pills";
import apiClient from "../../helper/httpclient";

const dataList = ref([]);

const getList = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Use the token, e.g., for making authenticated API requests
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const response = await apiClient.get("/user");
    if (response.status === 200) {
      dataList.value = response.data.data;
      console.log(dataList.value)
    }
  } catch (error) {
    console.error("An error occurred while signing in:", error);
  }
};

// hook
onMounted(() => {
  setNavPills();
  getList();
});

const tableData = computed(() => ({
  headers: ["Name", "Email", "Role", "Action"],
  rows: dataList.value,
}));
</script>
<template>
  <BaseLayout
    title="List"
    :breadcrumb="[{ label: 'User', route: '#' }, { label: 'List' }]"
  >
    <RouterLink :to="{ name: 'create-user' }">
      <MaterialButton class="my-4 mb-2" variant="gradient" color="success"
        >Create</MaterialButton
      >
    </RouterLink>
    <Table v-bind="tableData" />
  </BaseLayout>
</template>
