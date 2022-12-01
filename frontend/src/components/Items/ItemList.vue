<template>
  <v-btn class="ma-5" color="blue-lighten-1" @click="getItems">Get All Items</v-btn>
  <v-list lines="three">
    <v-list-item
    v-for="item in items"
    :key="item.id"
    :title="item.description">
      ${{item.price}}
    </v-list-item>
  </v-list>

</template>

<script>
import axios from "axios";

export default {
  name: "ItemList",
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getItems() {
      try {
        const items = await axios.get("https://run.mocky.io/v3/49ad425d-d3ee-453e-a004-e28df3096da0", {
          data: {
            // Item stuff here
          }
        });
        this.items = items.data
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
