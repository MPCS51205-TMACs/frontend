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
      <v-btn color="success" class="mr-4" @click="createWatchlists">Create Item</v-btn>
    </v-form>
  </div>
</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "CreateWatchlistForm",
  data() {
    return {
      name: '',
      minPrice: 0,
      maxPrice: Infinity.valueOf(),

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
        categories: [],
        buyNowEnabled: [{value: true}]
      }
      await GatewayService.sendRequest(HttpMethod.POST, "watchlist", "", onSuccess, () => {
      }, request)
    }

  }
}
</script>

<style scoped>
.craete-watchlist-component{
  width: 50%;
  display: grid;
  grid-template-rows: "10%" "90%";
  grid-auto-columns: "100%";
  grid-template-areas: "header"
                        "form";
  flex-direction: row;
}

#create-watchlist-header{
  grid-area: header;
}

.ma-5 {
  grid-area: form;
  width: 50%;
}
</style>
