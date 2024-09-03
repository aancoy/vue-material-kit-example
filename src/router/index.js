import { createRouter, createWebHistory } from "vue-router";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
import ResetBasicView from "../views/LandingPages/SignIn/BasicViewResetPassword.vue";
import UserComponent from "../views/User/ListView.vue";
import UserForm from "../views/User/FormView.vue";
import OrganizationComponent from "../views/Organization/ListView.vue";
import OrgForm from "../views/Organization/FormView.vue";
import NotAllowed from "../views/LandingPages/NotAllowed.vue";
import { reactive } from "vue";

const state = reactive({
  previousRoute: null,
});


const ROLE_ADMIN = "admin";
const ROLE_USER = "user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/resetPassword",
      name: "reset-password",
      component: ResetBasicView,
    },
    {
      path: "/notallowed",
      name: "notallowed",
      component: NotAllowed,
    },
    {
      path: "/user",
      name: "user-menu",
      component: UserComponent,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
    },
    {
      path: "/user/create",
      name: "create-user",
      component: UserForm,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
    },
    {
      path: "/user/edit/:id",
      name: "edit-user",
      component: UserForm,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN] },
    },
    {
      path: "/organization",
      name: "organization-menu",
      component: OrganizationComponent,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_USER] },
    },
    {
      path: "/org/create",
      name: "create-org",
      component: OrgForm,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_USER] },
    },
    {
      path: "/org/edit/:id",
      name: "edit-org",
      component: OrgForm,
      meta: { requiresAuth: true, roles: [ROLE_ADMIN, ROLE_USER] },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  state.previousRoute = from;

  if (!token && to.name !== "signin-basic" && to.name !== "reset-password") {
    next({ name: "signin-basic" });
  } else if (to.name === "/" || to.name === undefined) {
    next({ name: "signin-basic" });
  } else {
    const roles = to.meta.roles;
    if (roles && !roles.includes(userRole)) {
      next({ name: "notallowed" });
    } else {
      next();
    }
  }
});

export default router;
export { state };
