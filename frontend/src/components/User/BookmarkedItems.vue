<template>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Price </th>
        <th class="text-h5"> ID </th>
        <th class="text-h5"> Buy Now</th>
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
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import { buyNow } from "@/components/Items/ItemFunctions";
import axios from "axios";

export default {
  name: "BookmarkedItems",
  data() {
    return {
      items: [],
      timer: ''
    }
  },
  created() {
    this.timer = setInterval(this.getBookmarked, 10000);
  },
  mounted() {
    this.getBookmarked()
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    async getBookmarked() {
      await axios.get("/api/item/bookmark/byUser", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => this.items = r.data)
        .catch(reason => console.log(reason))
    },
    async thisBuyNow(item) {
      return buyNow(item)
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  }
}
</script>

<style scoped>

</style>
