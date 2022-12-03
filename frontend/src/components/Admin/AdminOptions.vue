<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab value="user">User</v-tab>
      <v-tab value="item">Item</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="user">
        <h2 align="center" class="font-weight-light mt-3"></h2>
        <UserAdmin/>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import UserAdmin from "@/components/Admin/UserAdmin";
export default {
  name: "AdminOptions",
  components: {UserAdmin},
  data() {
    return {
      tab: ''
    }
  }
}
</script>

<style scoped>

</style>
