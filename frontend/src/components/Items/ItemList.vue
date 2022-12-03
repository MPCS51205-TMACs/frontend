<template>
  <div>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Price </th>
        <th class="text-h5"> Buy Now</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>{{item.description}}</td>
        <td>${{item.price}}</td>
        <td>
          <v-btn v-if="item.buyNow" color="blue" @click="buyNow"> Buy Now </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ItemList",
  mounted() {
    this.getItems();
  },
  created() {
    this.timer = setInterval(this.getItems, 1000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  data() {
    return {
      items: [],
      timer: ''
    }
  },
  methods: {
    async getItems() {
      await axios.get("/api/item/all")
        .then(r => this.items = r.data)
        .catch(reason => {
          console.log("ERROR in retrieving item data")
        })
    },
    async buyNow() {
      // await axios.post()
    }
  },
  cancelAutoUpdate() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

</style>
