<template>
  <v-list lines="three">
    <v-list-item
      v-for="item in cartItems"
      :key="item.id"
      :title="item.description">
      ${{item.price}}
    </v-list-item>
  </v-list>
  <v-btn label="Checkout" color="red" class="ma-5" @click="checkout">Checkout</v-btn>
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
      this.cartItems = [];
      alert("You have successfully checkout.");
    }
  }
}
</script>

<style scoped>

</style>
