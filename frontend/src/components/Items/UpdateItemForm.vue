<template>
<v-form
  lazy-validation
  class="ma-5">
  <v-text-field
    v-model="itemId" label="Item Id" required>
  </v-text-field>
  <v-text-field
    v-model.number="quantity" label="Quantity" placeholder="0">
  </v-text-field>
  <v-text-field
    v-model.number="shippingCosts" label="Shipping Costs" placeholder="0.0">
  </v-text-field>
  <v-text-field
    v-model="description" label="Item Name">
  </v-text-field>
  <v-radio-group v-model="buyNow">
    Buy Now
    <v-radio label="True" value=true></v-radio>
    <v-radio label="False" value=false></v-radio>
  </v-radio-group>

  <v-btn color="success" class="mr-4" @click="updateItem">Update Item</v-btn>
</v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateItemForm",
  data() {
    return {
      itemId: '',
      quantity: null,
      shippingCosts: null,
      description: null,
      buyNow: null
    }
  },
  methods: {
    async updateItem() {
      try {
        const item = await axios.put("https://item-service:8080/item/" + this.itemId,
          {
            quantity: this.quantity,
            shippingCosts: this.shippingCosts,
            description: this.description,
            buyNow: this.buyNow
          });
        alert("Status code: " + item.status)
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
