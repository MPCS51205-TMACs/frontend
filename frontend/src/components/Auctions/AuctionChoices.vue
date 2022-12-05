<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab v-on:click="this.$refs.allComponentRef.getAuctions()" value="all">all</v-tab>
      <v-tab v-on:click="this.$refs.liveComponentRef.getActiveAuctions()" value="live">live</v-tab>
      <v-tab value="bid">bid</v-tab>
      <v-tab value="stop">stop</v-tab>
      <v-tab value="bidquery">user-bid-item query</v-tab>
      <v-tab v-on:click="this.$refs.closedComponentRef.getClosedAuctions()" value="closed">closed</v-tab>
    </v-tabs>
    <div height="20px">
      <v-sheet class="font-weight-light text-h5 pa-2">
      [UTC] {{this.timeStr}}</v-sheet>
    </div>
    <v-window v-model="tab">
      <v-window-item value="all">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <AllForm ref="allComponentRef" :timeDateChild="timeDate"/>
      </v-window-item>

      <v-window-item value="live">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <LiveForm ref="liveComponentRef" :timeDateChild="timeDate"/> 
      </v-window-item>

      <v-window-item value="bid">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <BidForm :timeDateChild="timeDate"/>
      </v-window-item>

      <v-window-item value="stop">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <StopForm/>
      </v-window-item>

      <v-window-item value="bidquery">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <BidQueryForm/>
      </v-window-item>

      <v-window-item value="closed">
        <h2 align="center" class="font-weight-light mt-3"> </h2>
        <ClosedForm ref="closedComponentRef"/> 
      </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import AllForm from "@/components/Auctions/AllForm";
import LiveForm from "@/components/Auctions/LiveForm";
import BidForm from "@/components/Auctions/BidForm";
import StopForm from "@/components/Auctions/StopForm";
import BidQueryForm from "@/components/Auctions/BidQueryForm";
import ClosedForm from "@/components/Auctions/ClosedForm";

// import {ref} from 'vue';
// const childComponentRef = ref(null);

export default {
  name: "ActionChoices",
  components: {
    AllForm,
    LiveForm,
    BidForm,
    StopForm,
    BidQueryForm,
    ClosedForm,
  },
  data() {
    return {
      tab: null,
      timeStr: '',
      timeDate: new Date(),
    }
  },
  created() {
    // this.getActiveAuctions();
    this.timer = setInterval(this.updateTheTime, 1000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    getUTCTimeStr(date) {
      return [
        date.getUTCFullYear(),
        this.padTo2Digits(date.getUTCMonth()+ 1),
        this.padTo2Digits(date.getUTCDate()),
      ].join("-")+" "+[
        this.padTo2Digits(date.getUTCHours()),
        this.padTo2Digits(date.getUTCMinutes()),
        this.padTo2Digits(date.getUTCSeconds()),
      ].join(':');
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
    updateTheTime() {
      let date = new Date();
      this.timeDate = date;
      this.timeStr = this.getUTCTimeStr(date);
    }
  }

}
</script>

<style scoped>

</style>
