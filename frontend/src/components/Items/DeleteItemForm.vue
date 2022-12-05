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
      await axios.delete("/api/item/" + this.itemId, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => alert("Successfully deleted " + this.itemId))
        .catch(reason => console.log(reason))
    }
  }
}
</script>

<style scoped>

</style>
