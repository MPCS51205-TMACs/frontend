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
    <v-window v-model="tab">
      <v-window-item value="all">
        <h2 align="center" class="font-weight-light mt-3"> Post an Item for Auction </h2>
        <AllForm ref="allComponentRef"/>
      </v-window-item>

      <v-window-item value="live">
        <h2 align="center" class="font-weight-light mt-3"> Update an Item </h2>
        <LiveForm ref="liveComponentRef"/> 
      </v-window-item>

      <v-window-item value="bid">
        <h2 align="center" class="font-weight-light mt-3"> place bid </h2>
        <BidForm/>
      </v-window-item>

      <v-window-item value="stop">
        <h2 align="center" class="font-weight-light mt-3"> stop auction </h2>
        <StopForm/>
      </v-window-item>

      <v-window-item value="bidquery">
        <h2 align="center" class="font-weight-light mt-3"> user-bid-item query </h2>
        <BidQueryForm/>
      </v-window-item>

      <v-window-item value="closed">
        <h2 align="center" class="font-weight-light mt-3"> view closed auction metrics </h2>
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
      tab: null
    }
  },

}
</script>

<style scoped>

</style>
