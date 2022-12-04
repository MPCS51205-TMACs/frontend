<template>
  <v-container>
    <v-row dense>
      <v-col align="center"><v-text-field placeholder="Keyword"
                           prepend-icon="mdi-magnify"
                           v-model="query"
                           class="mr-10"
      ></v-text-field>
      </v-col>
      <v-col>
        <v-select v-model="select" :items="categories" item-title="categoryDescription">
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
      <v-table density="comfortable" hover="true" justify="center">
        <thead>
        <tr>
          <th class="text-h5 text-center"> Name </th>
          <th class="text-h5 text-center"> Price </th>
          <th class="text-h5 text-center"> ID </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in items"
          :key="item.id">
          <td class="text-center">{{item.description}}</td>
          <td class="text-center">${{item.price}}</td>
          <td class="text-center">{{item.id}}</td>
        </tr>
        </tbody>
      </v-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

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
      await axios.get("/api/item/all", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        this.items = r.data.filter(item => item.description.toLowerCase().includes(this.query.toLowerCase()))
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
      await axios.get("/api/item/all", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        this.items = r.data.filter(item => item.categories.map(category => category.categoryDescription).includes(this.select))
      }).catch(reason => console.log(reason))
    }
  }
}
</script>

<style scoped>

</style>
