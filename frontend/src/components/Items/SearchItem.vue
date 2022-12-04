<template>
  <div align="center">
    <v-text-field placeholder="Keyword"
                  prepend-icon="mdi-magnify"
                  v-model="query"
    ></v-text-field>
    <v-btn color="blue" class="mb-5" @click="this.queryItems">Search</v-btn>
  </div>

  <div>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Price </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>{{item.description}}</td>
        <td>${{item.price}}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchItem",
  data() {
    return {
      query: '',
      items: []
    }
  },
  methods: {
    async queryItems() {
      console.log(this.query)
      await axios.get("/api/item/query", {
        data: {
          description: this.query
        },
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then(r => {
        console.log(r.data)
        this.items = r.data
      }).catch(reason => console.log(reason))
    }
  }
}
</script>

<style scoped>

</style>
