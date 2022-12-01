<template>
  <header>
    <v-toolbar class="header">
      <v-toolbar-title align="center" class="text-white text-h2 font-weight-bold mt-5">Webay</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-tabs bg-color="blue-darken-4"
              grow
              v-model="tab">
        <v-tab value="auctions">Auctions</v-tab>
        <v-tab value="watchlist">Watchlist</v-tab>
        <v-tab value="items">Items</v-tab>
        <v-tab value="user">User Profile</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="auctions" class="text-center text-blue-accent-4"> <h1>Auction Shtuff</h1> </v-window-item>
        <v-window-item value="watchlist" class="text-center text-amber"> <h1>Watchlist Shtuff</h1> </v-window-item>
        <v-window-item value="items"> <ItemActionChoices/> </v-window-item>
        <v-window-item value="user" class="text-center text-light-green-darken-2"> <h1>User Shtuff</h1> </v-window-item>
      </v-window>
    </v-card>
  </header>
</template>

<script>
import ItemActionChoices from "@/components/Items/ItemActionChoices";
export default {
  name: "Header",
  components: {
    ItemActionChoices
  },
  data() {
    return {
      tab: null
    }
  }
}
</script>

<style scoped>
.header {
  background-color: black;
  height: 90px;
}
</style>
