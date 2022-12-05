<template>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Price </th>
        <th class="text-h5"> ID </th>
        <th class="text-h5"> Buy Now</th>
        <th class="text-h5"> Bookmark </th>
        <th class="text-h5"> Counterfeit </th>
        <th class="text-h5"> Inappropriate </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>{{item.description}}</td>
        <td>${{item.price}}</td>
        <td>{{item.id}}</td>
        <td>
          <v-btn v-if="item.buyNow" color="blue" @click="thisBuyNow(item)"> Buy Now </v-btn>
        </td>
        <td>
          <v-btn color="amber" @click="thisBookmark(item)"> Bookmark </v-btn>
        </td>
        <td align="center">
          <v-btn icon="mdi-triangle" size="small" color="red" @click="thisMarkCounterfeit(item)"></v-btn>
        </td>
        <td align="center">
          <v-btn icon="mdi-square" size="small" color="red" @click="thisMarkInappropriate(item)"></v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { buyNow, bookmark, markCounterfeit, markInappropriate } from "@/components/Items/ItemFunctions";

export default {
  name: "ItemList",
  mounted() {
    this.getItems();
  },
  data() {
    return {
      items: [],
      userId: '',
      timer: ''
    }
  },
  created() {
    this.timer = setInterval(this.getItems, 10000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    async getItems() {
      await axios.get("/api/item/all", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
        .then(r => {
          this.items = r.data.filter(item => item.bought === false)
        })
        .catch(reason => {
          console.log("ERROR in retrieving item data")
          console.log(reason)
        })
    },
    async thisBuyNow(item) {
      return buyNow(item)
    },
    async thisBookmark(item) {
      return bookmark(item)
    },
    async thisMarkCounterfeit(item) {
      return markCounterfeit(item)
    },
    async thisMarkInappropriate(item) {
      return markInappropriate(item)
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  }
}
</script>

<style scoped>

</style>
