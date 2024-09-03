<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../layouts/sections/components/BaseLayout.vue";
import FormUser from "./Component/UserForm.vue";

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
    :breadcrumb="[{ label: 'User', route: '/user' }, { label: 'Form' }]"
  >
    <FormUser />
  </BaseLayout>
</template>
