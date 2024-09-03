<script setup>
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const removeToken = async () => {
  localStorage.removeItem("authToken");
  router.push("/login");
}

const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({
      route: "https://www.creative-tim.com/product/vue-material-kit",
      color: "bg-gradient-success",
      label: "Free Download",
    }),
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>
<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item mx-2">
            <div class="nav-link d-flex cursor-pointer align-items-center" active>
              <RouterLink
                class="dropdown-item ps-3 border-radius-md mb-1"
                :to="{ name: 'user-menu' }"
              >
                User
              </RouterLink>
            </div>
          </li>
          <li class="nav-item mx-2">
            <div class="nav-link d-flex cursor-pointer align-items-center">
              <RouterLink
                class="dropdown-item ps-3 border-radius-md mb-1"
                :to="{ name: 'organization-menu' }"
              >
                Organization
              </RouterLink>
            </div>
          </li>
          <li class="nav-item mx-2">
            <div class="nav-link d-flex cursor-pointer align-items-center">
              <a
                class="dropdown-item ps-3 border-radius-md mb-1"
                @click="removeToken"
              >
                Log out
            </a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none"></ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
