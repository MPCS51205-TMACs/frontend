<template>
  <div>
    <v-sheet class="font-weight-light text-h5 ma-5 pa-2 text-center">
      Current Time: {{this.updateTime}} </v-sheet>
  </div>
  <v-list lines="two">
    <v-list-item
      v-for="auction in liveAuctions"
      :key="auction.id"
      :title="auction.Item">
    </v-list-item>
  </v-list>
</template>

<script>
import axios from "axios";

export default {
  name: "ActiveAuctionList",
  data() {
    return {
      timer: '',
      error: false,
      liveAuctions: [],
      updateTime: new Date().toLocaleTimeString()
    }
  },
  created() {
    // this.getAuctions();
    this.timer = setInterval(this.getAuctions, 1000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    async getAuctions() {
      try {
        //await axios.get("/api/api/v1/activeAuctions");
        this.updateTime = new Date().toLocaleTimeString();
        this.error = false;
      } catch (e) {
        console.log(e)
        this.error = true;
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>

</style>
