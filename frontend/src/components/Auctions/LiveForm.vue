<template>
  <div>
    <v-sheet class="font-weight-light text-h5 ma-5 pa-2">
      Current Time: {{this.updateTime}} </v-sheet>
  </div>
  <v-table density="compact">
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
            high bid offer [$]
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:class="getColorClass(auction.state)"
          v-for="auction in auctions"
          :key="auction.name"
        >
          <td>{{ auction.itemid }}</td>
          <td>{{ auction.starttime }}</td>
          <td>{{ auction.endtime }}</td>
          <td>{{ auction.startpriceincents/100 }}</td>
          <td>{{ auction.TopBid }}</td>
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
      auctions: [],
      timer: '',
      error: false,
      updateTime: this.getUTCTimeStr(),
    }
  },
  created() {
    // this.getActiveAuctions();
    this.timer = setInterval(this.getActiveAuctions, 1000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    async getActiveAuctions() {
      try {
        await axios.get(
          "/api/api/v1/activeAuctions/"
        ).then(r => {
          this.auctions = r.data.auctions;
          this.updateTime = this.getUTCTimeStr();
        });
      } catch(e) {
        // console.log(e)
      }
    },
    // async getActiveAuctions() {
    //   try {
    //     axios.get("/api/api/v1/activeAuctions/").then(function(r){
    //       this.auctions =r.data.auctions;
    //     }).catch(function(error){
    //       console.log(error);
    //     }).finally(function(){
          
    //     });
        
    //     // alert("200")
    //     // console.log(r);
    //     // console.log(r.data);
    //     // this.auctions = r.data.auctions;

    //   } catch(e) {
    //     console.log(e)
    //   }
    // },
    getColorClass(auctionState){
      // console.log(auctionState);
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
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    getUTCTimeStr() {
      let date = new Date();
      return [
        this.padTo2Digits(date.getUTCHours()),
        this.padTo2Digits(date.getUTCMinutes()),
        this.padTo2Digits(date.getUTCSeconds()),
      ].join(':');
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
  }
}
</script>

<style scoped>
th {
      font-size: 8px !important;
 }
td {
      font-size: 8px !important;
 }

.green-bg {
  background: rgba(0, 255, 0, 0.363) !important; 
}

.blue-bg {
  background: rgba(180, 225, 255, 0.363) !important; 
}

.pink-bg {
  background: rgba(255, 179, 179, 0.651) !important; 
}
.grey-bg {
  background: rgba(218, 218, 218, 0.349) !important; 
}
</style>

