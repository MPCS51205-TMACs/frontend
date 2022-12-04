<template>
  <header>
    <v-toolbar class="header d-flex justify-center align-center flex-column">
      <v-toolbar-title class="text-white text-h2 text-center font-weight-bold">Webay</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-tabs bg-color="blue-darken-4"
              grow
              v-model="tab">
        <v-tab value="auctions"><h2>Auctions</h2></v-tab>
        <v-tab value="items"><h2>Items</h2></v-tab>
        <v-tab value="user"><h2>Profile</h2></v-tab>
        <v-tab value="admin"><h2>Admin</h2></v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="auctions"> <AuctionChoices/> </v-window-item>
        <v-window-item value="items"> <ItemActionChoices/> </v-window-item>
        <v-window-item value="user"> <UserOptions/> </v-window-item>
        <v-window-item value="admin"> <Admin/> </v-window-item>
      </v-window>
    </v-card>
  </header>
</template>

<script>
import ItemActionChoices from "@/components/Items/ItemActionChoices";
import AuctionChoices from "@/components/Auctions/AuctionChoices";
import UserOptions from "@/components/User/UserOptions";
import Admin from "@/components/Admin/Admin";
export default {
  name: "Home",
  components: {
    Admin,
    ItemActionChoices,
    AuctionChoices,
    UserOptions,
  },
  data() {
    return {
      tab: null,
      admin: localStorage.getItem("isAdmin")
    }
  }
}
</script>

<style scoped>
.header {
  background-color: black;
  height: 100px;
}
</style>
