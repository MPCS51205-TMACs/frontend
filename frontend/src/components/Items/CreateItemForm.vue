<template>
<v-form
  ref="form"
  v-model="valid"
  lazy-validation
  class="ma-5"
>
  <v-text-field
    v-model="itemDescription"
    label="Item Name"
    required
  ></v-text-field>
  <v-text-field
    v-model.number="quantity"
    label="Quantity"
    placeholder="0"
    required
  ></v-text-field>
  <v-text-field
    v-model.number="shippingCosts"
    label="Shipping Costs"
    placeholder="0.0"
    required
  ></v-text-field>
  <v-text-field
    v-model.number="price"
    label="Buy Now Price"
    placeholder="0.0"
    required
  ></v-text-field>
  <v-text-field
    v-model.number="startPrice"
    label="Minimum Starting Bid Price"
    placeholder="0.0"
    required
  ></v-text-field>
  <v-text-field
    v-model="startTime"
    label="Starting Time"
    placeholder="yyyy-MM-dd HH:mm:ss.SSSSSS"
    required
  ></v-text-field>
  <v-text-field
    v-model="endTime"
    label="Ending Time"
    placeholder="yyyy-MM-dd HH:mm:ss.SSSSSS"
    required
  ></v-text-field>
  <v-btn color="success" class="mr-4" @click="createItem">Create Item</v-btn>
</v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateItemForm",
  data() {
    return {
      valid: true,
      itemDescription: '',
      quantity: null,
      price: null,
      startPrice: null,
      shippingCosts: null,
      startTime: '',
      endTime: ''
    };
  },
  methods: {
    async createItem() {
      try {
        const item = await axios.post(
          "https://item-service:8080/item/",
          {
            userId: "something",
            description: this.itemDescription,
            quantity: this.quantity,
            price: this.price,
            startPrice: this.startPrice,
            shippingCosts: this.shippingCosts,
            startTime: this.startTime,
            endTime: this.endTime,
            buyNow: true,
            counterfeit: false,
            inappropriate: false,
            categories: [],
            bookmarks: []
          }
        );
        alert("Status code: " + item.status + "\nitem name: " + this.itemDescription + "\nprice: $" + this.price)
      } catch(e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
