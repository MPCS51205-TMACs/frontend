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
      startTime: '2023-12-05 15:00:00.000000',
      endTime: '2023-12-05 15:30:00.000000'
    };
  },
  methods: {
    async createItem() {
      try {
        await axios.post(
          "/api/item",
          {
            userId: "0fa23072-f5fc-485b-b307-6156592a7846", // Need to dynamically change this, maybe
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
        ).then(r => {
          alert("Item created and posted to auction. ID: " + r.data.id)
        });
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
