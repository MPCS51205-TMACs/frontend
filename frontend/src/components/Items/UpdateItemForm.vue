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
  <v-card>
    <v-form
    lazy-validation
    class="ma-5">
      <v-text-field
        v-model="itemId" label="Item Id" required>
      </v-text-field>
      <v-text-field
        v-model="category" label="Add Category">
      </v-text-field>
      <v-btn color="success" class="mr-4" @click="addCategory">Add Category</v-btn>
    </v-form>
  </v-card>
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
      buyNow: null,
      category: ''
    }
  },
  methods: {
    async updateItem() {
      try {
        await axios.put("/api/item/" + this.itemId,
          {
            quantity: this.quantity,
            shippingCosts: this.shippingCosts,
            description: this.description,
            buyNow: this.buyNow
          },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then(r => {
          alert("Updated item successfully")
        })
      } catch (e) {
        alert(e)
      }
    },
    async addCategory() {
      try {
        await axios.put("/api/item/category/" + this.itemId, {
          category: this.category
        }, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "text/plain"
          }
        }).then(r => { alert("Added " + this.category + " to item.")})
      } catch (e) { console.log(e) }
    }
  }
}
</script>

<style scoped>

</style>
