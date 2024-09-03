<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../layouts/sections/components/BaseLayout.vue";
import Form from "./Component/Form.vue";

// //nav-pills
import setNavPills from "@/assets/js/nav-pills";

// hook
onMounted(() => {
  setNavPills();
});
</script>
<template>
  <BaseLayout
    title=""
    :breadcrumb="[
      { label: 'Organization', route: '/organization' },
      { label: 'Form' },
    ]"
  >
    <Form />
  </BaseLayout>
</template>
