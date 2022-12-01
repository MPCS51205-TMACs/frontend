<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab value="watchlist">Watchlist</v-tab>
      <v-tab value="shoppingCart">My Shopping Cart</v-tab>
      <v-tab value="optional">Optional?</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="watchlist">
        <h2 align="center" class="font-weight-light mt-3"> My Watchlist </h2>
        <Watchlist/> </v-window-item>
      <v-window-item value="shoppingCart">
        <h2 align="center" class="font-weight-light mt-3"> My Shopping Cart </h2>
        <ShoppingCart/> </v-window-item>
      <v-window-item value="optional">
        <h2 align="center" class="font-weight-light mt-3"> Something Else Maybe? </h2> </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import Watchlist from "@/components/User/Watchlist";
import ShoppingCart from "@/components/User/ShoppingCart";
export default {
  name: "UserOptions",
  components: {ShoppingCart, Watchlist},
  data() {
    return {
      tab: ''
    }
  }
}
</script>

<style scoped>

</style>
