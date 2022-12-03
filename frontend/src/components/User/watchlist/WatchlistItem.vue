<template>
  <div class="watchlist-item">

    <div class="first-row">
      <h2>{{ watchlist.name }}</h2>
      <div class="center-vert">
        <v-icon @click="deleteWatchlist(watchlist.watchlistId)" icon="mdi-delete"></v-icon>
      </div>
    </div>

    <div>
      <span><v-icon icon="mdi-cash"></v-icon></span>
      <span>${{ watchlist.minPrice.toFixed(2) }} - ${{ watchlist.maxPrice.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import {Watchlist} from "@/models/models";
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "WatchlistItem",
  props: {
    watchlist: Watchlist,
    wacthlists: Array
  },
  methods: {
    async deleteWatchlist(watchlistId) {
      console.log(this.watchlists)
      let onSuccess = (resp) => {
        console.log(this.watchlists)
        this.watchlists = this.wacthlists.filter(it=> it.watchlistId!==watchlistId)
      }
      await GatewayService.sendRequest(HttpMethod.DELETE, `watchlist/${watchlistId}`, "", onSuccess)
    },
  },
  mounted() {
    console.log(this.wacthlists)
  }
}
</script>

<style scoped>
.watchlist-item {

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.first-row {
  display: flex;
  flex-direction: row;
  justify-content:left;
}

.center-vert{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
