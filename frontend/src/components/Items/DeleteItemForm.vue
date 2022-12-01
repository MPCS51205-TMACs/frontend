<template>
  <v-form
  lazy-validation
  class="ma-5">
    <v-text-field
    v-model="itemId" label="Item Id" required> </v-text-field>
    <v-btn color="red" class="ma-5" @click="deleteItem">Delete Item</v-btn>
  </v-form>

</template>

<script>
import axios from "axios";

export default {
  name: "DeleteItemForm",
  data() {
    return {
      itemId: ''
    }
  },
  methods: {
    async deleteItem() {
      try {
        await axios.delete("https://item-service:8080/item/" + this.itemId)
        alert("Item successfully deleted")
      } catch (e) {
        alert("ERROR\n" + e)
      }
    }
  }
}
</script>

<style scoped>

</style>
