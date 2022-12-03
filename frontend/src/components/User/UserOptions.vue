<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab value="watchlist">Watchlist</v-tab>
      <v-tab value="shoppingCart">My Shopping Cart</v-tab>
      <v-tab value="account">Account</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="watchlist">
        <h2 align="center" class="font-weight-light mt-3"> My Watchlist </h2>
        <Watchlist/> </v-window-item>
      <v-window-item value="shoppingCart">
        <h2 align="center" class="font-weight-light mt-3"> My Shopping Cart </h2>
        <ShoppingCart/> </v-window-item>
      <v-window-item value="account">
        <h2 align="center" class="font-weight-light mt-3"> Account </h2>
        <Account/></v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import Watchlist from "@/components/User/Watchlist";
import ShoppingCart from "@/components/User/ShoppingCart";
import Account from "@/components/User/Account";

export default {
  name: "UserOptions",
  components: {ShoppingCart, Watchlist, Account},
  data() {
    return {
      tab: ''
    }
  }
}
</script>

<style scoped>

</style>
