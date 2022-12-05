<template>
  <v-container>
    <v-row>
      <v-col align="center"><v-text-field placeholder="Keyword"
                           prepend-icon="mdi-magnify"
                           v-model="query"
                           class="mr-10"
      ></v-text-field>
      </v-col>
      <v-col>
        <v-select label="Category" hint="Filter by category" persistent-hint
                  v-model="select"
                  :items="categories"
                  item-title="categoryDescription">
        </v-select>
      </v-col>
      <v-col cols="1"><v-btn @click="this.getCategories" icon="mdi-refresh"></v-btn></v-col>

    </v-row>
    <v-row>
      <v-col>
        <v-btn color="blue" class="mb-5" @click="this.queryItems">Search Keyword</v-btn>
      </v-col>

      <v-col>
        <v-btn color="amber" class="mb-5" @click="this.queryByCategory">Search Category</v-btn>
      </v-col>
    </v-row>

  </v-container>

  <div>
    <v-container>
      <v-table density="default" hover="true" justify="center">
        <thead>
        <tr>
          <th class="text-h5 text-center"> Name </th>
          <th class="text-h5 text-center"> Price </th>
          <th class="text-h5 text-center"> ID </th>
          <th class="text-h5 text-center"> Buy Now </th>
          <th class="text-h5 text-center"> Bookmark </th>
          <th class="text-h5 text-center"> Counterfeit </th>
          <th class="text-h5 text-center"> Inappropriate </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in items"
          :key="item.id">
          <td class="text-center">{{item.description}}</td>
          <td class="text-center">${{item.price}}</td>
          <td class="text-center">{{item.id}}</td>
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
  </div>
</template>

<script>
import axios from "axios";
import { buyNow, bookmark, markCounterfeit, markInappropriate } from "@/components/Items/ItemFunctions";

export default {
  name: "SearchItem",
  data() {
    return {
      query: '',
      items: [],
      categories: [],
      select: ''
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {

    async queryItems() {
      await axios.get("/api/item/query/" + this.query, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        this.items = r.data
      }).catch(reason => console.log(reason))
      this.$refs.form.reset()
    },

    async getCategories() {
      await axios.get("/api/category", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        this.categories = r.data
      }).catch(reason => console.log("Error getting categories: " + reason))
    },

    async queryByCategory() {
      await axios.get("/api/category/items:" + this.select, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        this.items = r.data
      }).catch(reason => console.log(reason))
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
    }
  }
}
</script>

<style scoped>

</style>
