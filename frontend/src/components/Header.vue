<template>
  <header>
    <v-toolbar class="header">
      <v-toolbar-title align="center" class="text-white text-h2 font-weight-bold mt-5">Webay</v-toolbar-title>
      <v-btn class="text-white bg-amber ma-3">Login</v-btn>
      <v-btn class="text-white border-double ma-3">Sign Up</v-btn>
    </v-toolbar>
    <v-card>
      <v-tabs bg-color="blue-darken-4"
              grow
              v-model="tab">
        <v-tab value="auctions"><h2>Auctions</h2></v-tab>
        <v-tab value="items"><h2>Items</h2></v-tab>
        <v-tab value="user"><h2>Profile</h2></v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="auctions" class="text-center text-blue-accent-4"> <ActiveAuctionList/> </v-window-item>
        <v-window-item value="items"> <ItemActionChoices/> </v-window-item>
        <v-window-item value="user" class="text-center text-light-green-darken-2"> <h1>User Shtuff</h1> </v-window-item>
      </v-window>
    </v-card>
  </header>
</template>

<script>
import ItemActionChoices from "@/components/Items/ItemActionChoices";
import ActiveAuctionList from "@/components/Auctions/ActiveAuctionList";
export default {
  name: "Header",
  components: {
    ItemActionChoices,
    ActiveAuctionList
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
