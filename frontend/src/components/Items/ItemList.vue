<template>
  <div>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Price </th>
        <th class="text-h5"> Buy Now</th>
        <th class="text-h5"> Bookmark </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>{{item.description}}</td>
        <td>${{item.price}}</td>
        <td>
          <v-btn v-if="item.buyNow" color="blue" @click="buyNow(item)"> Buy Now </v-btn>
        </td>
        <td>
          <v-btn color="amber" @click="bookmark(item)"> Bookmark </v-btn>
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
    async buyNow(item) {
      await axios.get("/api/user", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        axios.post("/api/carts/item", {
          user_id: r.data.id,
          item_id: item.id
        }, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }).then(r => {
          alert(r.data.message);
        }).catch(reason => console.log(reason))
      }).catch(reason => console.log(reason))
    },
    async bookmark(item) {
      await axios.put("/api/item/bookmark/" + item.id, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => alert("Bookmarked item " + item.id)).catch(reason => console.log(reason))
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
  }
}
</script>

<style scoped>

</style>
