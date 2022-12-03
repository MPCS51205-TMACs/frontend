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
        </tr>
      </thead>
      <tbody >
        <tr v-bind:class="getColorClass(auction.state)"
          v-for="auction in auctions"
          :key="auction.name"
        > 
          <td>{{ auction.itemid }}</td>
          <td>{{ auction.starttime }}</td>
          <td>{{ auction.endtime }}</td>
          <td>{{ (auction.startpriceincents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }}</td>
        </tr>
      </tbody>
    </v-table>


</template>

<script>
import axios from "axios";

export default {
  name: "ItemList",
  data() {
    return {
      auctions: []
    }
  },
  methods: {
    async getAuctions() {
      try {
        await axios.get(
          "/api/api/v1/Auctions/",
          {
          }
        ).then(r => {
          // alert("200")
          console.log(r);
          console.log(r.data);
          this.auctions = r.data.auctions;
        });
      } catch(e) {
        console.log(e)
      }
    },
    getColorClass(auctionState){
      // return 'green-bg';
      let classToUse;
      switch (auctionState) {
        case 'ACTIVE':
          classToUse = 'green-bg';
          break;
        case 'OVER':
          classToUse = 'grey-bg';
          break;
        case 'PENDING':
          classToUse = 'blue-bg';
          break;
        case 'FINALIZED':
          classToUse = 'grey-bg';
          break;
        case 'CANCELED':
          classToUse = 'grey-bg';
          break;
        default:
          classToUse = 'grey-bg';
          break;
      }
      return classToUse;
    },
  },    
}
</script>

<style scoped>
th {
      font-size: 8px !important;

 }
td {
      font-size: 8px !important;

 }

.green-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(0, 255, 0, 0.363) !important; 
}

.blue-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(180, 225, 255, 0.363) !important; 
}

.pink-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(255, 179, 179, 0.651) !important; 
}
.grey-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: rgba(218, 218, 218, 0.349) !important; 
}
</style>
