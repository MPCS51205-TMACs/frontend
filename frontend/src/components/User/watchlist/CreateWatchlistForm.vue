<template>
  <div class="craete-watchlist-component">
    <h1 id="create-watchlist-header">Create Watchlist</h1>

    <v-form
      ref="form"
      lazy-validation
      class="ma-5"
    >
      <v-text-field
        v-model="this.name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="this.minPrice"
        label="Min Price"
        required
      ></v-text-field>
      <v-text-field
        v-model="this.maxPrice"
        label="Max Price"
        required
      ></v-text-field>
      <v-checkbox v-model="mustHaveBuyNow" label="Must Be Buy Now"></v-checkbox>
      <v-select
        v-model="categories"
        :hint="`${categories.length} selected`"
        :items="categoryOptions"
        item-title="categoryDescription"
        label="Categories"
        return-object
        persistent-hint
        single-line
        multiple
      >

      </v-select>
      <v-btn color="success" class="mr-4" @click="createWatchlists">Create Item</v-btn>
    </v-form>
  </div>
</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";
import axios from "axios";

export default {
  name: "CreateWatchlistForm",
  data() {
    return {
      name: 'My Watchlist',
      minPrice: 0,
      maxPrice: Infinity.valueOf(),
      mustHaveBuyNow: false,
      categories: [],
      categoryOptions: [{id:"c412ee6a-be4d-4abb-ac8b-9d82808c8ae4",categoryDescription:"Sports"}]

    }
  },
  methods: {
    async createWatchlists() {
      let onSuccess = (resp) => {
        console.log("!")
      }
      let request = {
        name: this.name,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        categories: this.categories.map(it=> Object({categoryId:it.id})),
        buyNowEnabled: this.mustHaveBuyNow ? [{value: true}] : [{value: true}, {value: false}]
      }
      await GatewayService.sendRequest(HttpMethod.POST, "watchlist", "", onSuccess, () => {
      }, request)
    },

    async getCategories(){
      let onSuccess = (resp) =>{this.categoryOptions = resp.data}
      await GatewayService.sendRequest(HttpMethod.GET, "category","", onSuccess)

    }

  },
  mounted() {
    this.getCategories()
  }
}
</script>

<style scoped>
.craete-watchlist-component {
  width: 50%;
  display: grid;
  grid-template-rows: "10%" "90%";
  grid-auto-columns: "100%";
  grid-template-areas: "header"
                        "form";
  flex-direction: row;
}

#create-watchlist-header {
  grid-area: header;
}

.ma-5 {
  grid-area: form;
  width: 50%;
}
</style>
