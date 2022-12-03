<template>

  <v-table density="compact" height="400px" fixed-header="true">
      <thead>
        <tr>
          <th class="text-left">
            Item Id
          </th>
          <th class="text-left">
            start time
          </th>
          <th class="text-left">
            end time
          </th>
          <th class="text-left">
            start price [$]
          </th>
          <th class="text-left">
            bids [count]
          </th>
          <th class="text-left">
            winner
          </th>
          <th class="text-left">
            end-auction-high [$]
          </th>
          <th class="text-left">
            history
          </th>
        </tr>
      </thead>
      <tbody v-for="closedauction in closedauctions">
        <tr v-bind:class="getColorClass(closedauction.winning_bid)"
          :key="closedauction.name"
        >
          <td>{{ closedauction.item_id }}</td>
          <td>{{ closedauction.start_time }}</td>
          <td>{{ closedauction.end_time }}</td>
          <td>{{ (closedauction.start_price_in_cents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }}</td>
          <td>{{ closedauction.bids.length }}</td>
          <td>{{ closedauction.winning_bid == null ? "" : closedauction.winning_bid.bidder_user_id }}</td>
          <td>{{ closedauction.winning_bid == null ? "" : (closedauction.winning_bid.amount_in_cents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }}</td>

          <td>
              <v-btn
                class="ma-2"
                color="blue"
                x-small
                @click="toggleBidHistory(closedauction)"
              >
                <v-icon
                  x-small
                >
                  mdi-call-split
                </v-icon>
              </v-btn>
          </td>          
        </tr>
        <tr><td colspan="8" v-if="closedauction.showBidHistory" v-html="closedauction.bidHistoryHtml"></td></tr> 
      </tbody>
    </v-table>

</template>

<script>
import axios from "axios";

export default {
  name: "ItemList",
  data() {
    return {
      closedauctions: []
    }
  },
  methods: {
    async getClosedAuctions() {
      try {
        await axios.get(
          "/api/api/v1/closedauctions/",
          {
          }
        ).then(r => {
          console.log(r);
          console.log(r.data);
          var arr = [];
          for (const [key, value] of Object.entries(r.data)) {
            value.showBidHistory=false;
            value.bidHistoryHtml="";
            arr.push(value);
          }
          this.closedauctions = arr;
        });
      } catch(e) {
        console.log(e)
      }
    },
    async getBidHistoryAsHtml(closedauction) {
      try {
        await axios.get(
          "/api/api/v1/closedauctions/"+closedauction.item_id+"/visualization",
          {
          }
        ).then(r => {
          closedauction.bidHistoryHtml = r.data;
        });
      } catch(e) {
        console.log(e)
      }
    },
    getColorClass(WinningBid){
      let classToUse;
      switch (WinningBid) {
        case null:
          classToUse = 'grey-bg';
          break;
        default:
          classToUse = 'greygreen-bg';
          break;
      }
      return classToUse;
    },
    toggleBidHistory(closedauction){
      closedauction.showBidHistory = !closedauction.showBidHistory;
      if (closedauction.showBidHistory && closedauction.bidHistoryHtml == "") {
        this.getBidHistoryAsHtml(closedauction);
        
      }
    }
  },
  // computed: {
  //   computedContent: function (closedauction) {
  //     return closedauction.showBidHistory ? getBidHistoryAsHtml(closedauction.item_id) : ''
  //   }
}
</script>

<style scoped>
th {
      font-size: 8px !important;

 }
td {
      font-size: 8px !important;

 }
.greygreen-bg {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(109, 221, 99, 0.349) !important; 
}
.grey-bg {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(218, 218, 218, 0.349) !important; 
}

img {
  height: 10px !important;
}
</style>
