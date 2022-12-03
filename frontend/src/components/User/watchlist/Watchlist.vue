<template>
    <div class="view">

      <v-list lines="three" slot="paneL" id="my-watch-lists">
        <h1>My Watchlists</h1>
        <v-btn @click="getWatchlists">
          Refresh
          <v-icon icon="mdi-refresh"></v-icon>
        </v-btn>
        <v-list-item
          v-for="watchlist in watchlists"
          :key="watchlist.watchlistId">
          <watchlist-item :watchlist=watchlist :wacthlists=this.watchlists ></watchlist-item>
        </v-list-item>
      </v-list>

      <CreateWatchlistForm slot="paneR" id="new-watchlist"></CreateWatchlistForm>
    </div>


</template>

<script>
import CreateWatchlistForm from "@/components/User/watchlist/CreateWatchlistForm";
import WatchlistItem from "@/components/User/watchlist/WatchlistItem";
import splitPane from 'vue-splitpane'
import {GatewayService, HttpMethod} from "@/service/gatewayService";


export default {
  name: "Watchlist",
  components: {WatchlistItem: WatchlistItem, CreateWatchlistForm: CreateWatchlistForm, 'split-pane': splitPane},
  data() {
    return {
      watchlists: [],
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2YxNDI0OC03MWM3LTQ5MGQtOWYzOC0yNDdiMjRmNzI4YWEiLCJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJhdWQiOiJtcGNzNTEyMDUiLCJlbWFpbCI6Im1hdHRfQG1wY3MuY29tIiwibmFtZSI6Im1hdHQiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjY5NDA4MDk1LCJleHAiOjE2NzIwMDAwOTV9.j0_T0boKVL0MMpTmI_xSUfc3M25MoWqeo-Sdg9fVelQ"
    }
  },
  methods: {
    async getWatchlists() {
      let onSuccess = (resp)=>{this.watchlists = resp.data}
      await GatewayService.sendRequest(HttpMethod.GET,"watchlist","",onSuccess)
    },


    async createWatchlist(){

    }
  },
  mounted() {
    this.getWatchlists()
  }

}
</script>

<style scoped>
.view{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
