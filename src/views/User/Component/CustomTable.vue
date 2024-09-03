<script setup>
import apiClient from "../../../helper/httpclient";

const deleteData = async (id) => {
  try {
    const response = await apiClient.delete(`/user/${id}`);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.error("An error occurred while signing in:", error);
  }
};

defineProps({
  headers: {
    type: Array,
    default: () => ["Author", "Function", "Status", "Employed", "Action"],
  },
  rows: {
    type: Array,
    required: true,
    id: String,
    name: String,
    email: String,
    role: String,
  },
});
</script>
<template>
  <section class="pt-5 mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="table-responsive">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th
                      v-for="(header, index) in headers"
                      :key="header"
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      :class="{ 'ps-2': index == 1, 'text-center': index > 1 }"
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="({ name, email, role, id }, index) of rows"
                    :key="index"
                  >
                    <td>
                      {{ name }}
                    </td>
                    <td>
                      {{ email }}
                    </td>
                    <td class="align-middle text-center text-sm">
                      {{ role }}
                    </td>
                    <td class="align-middle text-center">
                      <RouterLink
                        class="text-secondary font-weight-bold text-xs"
                        :to="{
                          name: 'edit-user',
                          params: { id: id },
                          query: {
                            name: name,
                            email: email,
                            role: role,
                          },
                        }"
                      >
                        Edit
                      </RouterLink>
                      &nbsp;
                      <a
                        href="#"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Delete user"
                        @click="deleteData(id)"
                      >
                        Delete User
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
