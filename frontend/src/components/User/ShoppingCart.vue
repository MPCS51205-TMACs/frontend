<template>
  <v-list lines="three">
    <v-list-item
      v-for="item in cartItems"
      :key="item.id"
      :title="item.description">
      ${{item.price}}
    </v-list-item>
    <v-list-item> <div v-if="!cartItems.length"><h3>No items in cart</h3></div></v-list-item>
  </v-list>
  <v-btn v-if="cartItems.length" label="Checkout" color="red" class="ma-5" @click="checkout">Checkout</v-btn>
</template>

<script>
export default {
  name: "ShoppingCart",
  data() {
    return {
      cartItems: []
    }
  },
  methods: {
    async getShoppingCart() {
      // Call GET endpoint to shopping cart
    },
    checkout() {
      alert("You have successfully checked out.");
    }
  }
}
</script>

<style scoped>

</style>
