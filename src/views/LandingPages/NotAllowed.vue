<script setup>
import { computed, onMounted } from "vue";
import { state } from "@/router";

// example components
import Header from "@/examples/Header.vue";
// material-input
import setMaterialInput from "@/assets/js/material-input";

const previousRoutePath = computed(() => {
      // Fallback to a default route if there's no previous route
  return state.previousRoute?.name
    ? { name: state.previousRoute.name }
    : { name: "signin-basic" };
    });

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
          'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)'
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
                  class="bg-gradient-danger shadow-success border-radius-lg py-3 pe-1"
                >
                  <h4
                    class="text-white font-weight-bolder text-center mt-2 mb-0"
                  >
                    You Dont Have Access
                  </h4>
                </div>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <RouterLink
                    :to="previousRoutePath"
                    class="dropdown-item border-radius-md"
                  >
                    <span>Back To Before</span>
                  </RouterLink>
                </div>
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
