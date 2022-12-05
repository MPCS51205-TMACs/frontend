<template>
  <v-table density="compact" height="150px" >
    <!-- fixed-header="true" -->
      <thead>
        <tr>
          <th class="text-left">
            Item Id
          </th>
          <th class="text-left">
            start time [UTC]
          </th>
          <th class="text-left">
            end time [UTC]
          </th>
          <th class="text-left">
            start price [$]
          </th>
          <th class="text-left">
            high bid offer [$]
          </th>
          <th class="text-left">
            top bidder [User Id]
          </th>
          <th class="text-left">
            progress
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-if="(showLive && this.auction != null)"
          v-bind:class="getColorClass(auction.state)">
          <td>{{ auction.itemid }}</td>
          <td>{{ auction.starttime }}</td>
          <td>{{ auction.endtime }}</td>
          <td>{{ (auction.startpriceincents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) }}</td>
          <td>{{ auction.TopBid != null ? (auction.TopBid.amount_in_cents/100).toLocaleString('en-US', {style: 'currency', currency: 'USD',}) : "_" }}</td>
          <td>{{ auction.TopBid != null ? (auction.TopBid.bidder_user_id) : "_"}} </td>
          <td>
          {{timeLeftStr(auction.starttime, auction.endtime)}}
          <v-progress-linear v-bind:model-value="(this.toProgress(auction.starttime,auction.endtime)*100)" :height="12"></v-progress-linear>
          </td>
          
        </tr>
      </tbody>
    </v-table>
<v-form 
  lazy-validation
  class="ma-5">
  <v-container  >
      <v-row
        align="start"
       >
       <!-- show PENDING -->
        <v-col >
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model="itemId" label="Item Id" required>
            </v-text-field>
          </v-sheet>          
        </v-col>
        <!-- show ACTIVE -->
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-checkbox 
              v-model="showLive"
              label="Fetch Live"
              density="compact"
            ></v-checkbox>
          </v-sheet> 
        </v-col>
      </v-row>
    </v-container>
    <v-container  >
      <v-row
        align="start"
        no-gutters
       >
       <!-- show PENDING -->
        <v-col cols="4">
          <v-sheet class="pa-2 ma-2">
            <v-text-field
              v-model.number="offerAmountDollars" label="Offer Amount $" placeholder="0">
            </v-text-field>
          </v-sheet>          
        </v-col>
        <!-- show ACTIVE -->
        <v-col >
          <v-sheet class="pa-2 ma-2">
            <v-btn color="success" class="mr-4" @click="overTopBid(1)">+$1</v-btn>
          </v-sheet> 
        </v-col>
        <v-col >
          <v-sheet class="pa-2 ma-2">
            <v-btn color="success" class="mr-4" @click="overTopBid(5)">+$5</v-btn>
          </v-sheet> 
        </v-col >
        <v-col >
          <v-sheet class="pa-2 ma-2">
            <v-btn color="success" class="mr-4" @click="overTopBid(10)">+$10</v-btn>
          </v-sheet> 
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-btn color="success" class="mr-4" @click="submitBid">submit</v-btn>
          </v-sheet> 
        </v-col>
      </v-row>
    </v-container>
  <!-- <v-text-field
    v-model="itemId" label="Item Id" required>
  </v-text-field> -->




  <v-alert v-show="showSuccess" type="success">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
  <v-alert v-show="showInfo" type="info">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
  <v-alert v-show="showWarning" type="warning">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
  <v-alert v-show="showFailure" type="error">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
</v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "BidForm",
  data() {
    return {
      itemId: '',
      offerAmountDollars: 0,
      submission_status: null,
      submission_msg: '',
      auction: null,
      showLive: true,
      topBidOfferAmount: 0
    }
  },
  props: ["timeDateChild"],
  methods: {
    async submitBid() {
      try {
        await axios.post(
          "/api/api/v1/Bids/",
          {
            itemid: this.itemId,
            amountincents: Math.floor( this.offerAmountDollars*100 ),
          },
          {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }
        ).then(r => {
          // console.log(r);
          // console.log(r.data);
          this.submission_status = r.status;
          this.submission_msg = r.data.message;
        });
      } catch(e) {
        // console.log(e);
        // console.log(e.status);
        this.submission_status = e.response.status;
        this.submission_msg = e.message+". "+e.response.data.message;
      }
    },
    async getAuction() {
      if (this.itemId != null && this.itemId != ""){
        try {
          await axios.get(
            "/api/api/v1/Auctions/",
            { 
                headers: {"Authorization" : "Bearer "+localStorage.getItem("token")},
            }
          ).then(r => {
            // console.log(r);
            // console.log(r.data);
            for (const [key, auction] of Object.entries(r.data.auctions)) {
              if (auction.itemid == this.itemId) {
                this.auction = auction;
                // console.log(auction);
              }
            }

          });
        } catch(e) {
          console.log(e)
        }
      }
    },
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
    toUTCFromDate(date){
      
      var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds());
      return now_utc;
    },
    toUTCFromStr(timeDateStr){
      
      const regexp = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2}).(\d{6})/g;
      const matches = timeDateStr.matchAll(regexp);

      var idx = 0 
      for (const match of matches) {
        // console.log(match);
        let year = (match[1]);
        let month = match[2];
        let day = match[3];
        let hour = match[4];
        let min = match[5];
        let sec = match[6];
        let microsec = match[7];
        // console.log(idx);
        // console.log(match.index)
        let myDate = Date.UTC(year, month-1, day, hour, min, sec, microsec/1000);
        return myDate
        // return new Date(timeDateStr);
      }
    },
    timeLeftStr(startDateStr,endDateStr) {
      let startTime = this.toUTCFromStr(startDateStr);
      let endTime = this.toUTCFromStr(endDateStr);
      let nowTime = this.toUTCFromDate(this.timeDateChild);
      if ( nowTime > endTime) {
        return "over";
      }

      if (nowTime < startTime) {
        return "pending";
      }
      // var startDate = new Date();
      // Do your operations
      // var endDate   = new Date();
      var secondsTotal = endTime - startTime;
      var secondsElapsed = nowTime - startTime;
      var secondsLeft = (secondsTotal-secondsElapsed)/1000;
      var completion = secondsElapsed/secondsTotal;
      var completionStr = Number(completion).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
      var asMinutes  = secondsLeft/60;
      var asHours  = asMinutes/60;
      var asDays  = asHours/24;
      if (asDays >= 1) {
        return completionStr + " ("+Math.floor( asDays )+" days)";
      }
      if (asHours >= 1) {
        return completionStr + " ("+Math.floor( asHours)+" hrs)";
      }
      if (asMinutes >= 1) {
        return completionStr + " ("+Math.floor( asMinutes)+" mins)";
      } else {
        return completionStr + " ("+Math.floor( secondsLeft)+" secs)";
      }
    },
    toProgress(startDateStr,endDateStr) {
      let startTime = this.toUTCFromStr(startDateStr);
      let endTime = this.toUTCFromStr(endDateStr);
      let nowTime = this.toUTCFromDate(this.timeDateChild);
      if ( nowTime > endTime) {
        return 1;
      }

      if (nowTime < startTime) {
        return 0;
      }
      // var startDate = new Date();
      // Do your operations
      // var endDate   = new Date();
      var secondsTotal = endTime - startTime;
      var secondsElapsed = nowTime - startTime;
      // var secondsLeft = (secondsTotal-secondsElapsed)/1000;
      return secondsElapsed/secondsTotal;
    },
    overTopBid(amount){

      if (this.showLive && this.auction != null) {
        this.offerAmountDollars = this.getMinBidOffer() + amount;
      }
    },
    getMinBidOffer(){
      if (this.auction != null){
        if (this.auction.TopBid != null){
          return this.auction.TopBid.amount_in_cents/100;
        } else {
          return this.auction.startpriceincents/100;
        }
      } 
      return 0;
      
    }
  },
  computed: {
    showSuccess() {
      return this.submission_status === 200;
    },
    showInfo() {
      return false;
    },
    showWarning() {
      return this.submission_status === 401;
    },
    showFailure() {
      return this.submission_status != 200 && this.submission_status != 401 && this.submission_status != null;
    },
  },
  watch: { 
    timeDateChild: { // watch it
      immediate: true,
      // deep: true,
      handler(newValue,oldValue){
        // console.log('Prop changed: ', newValue, ' | was: ', oldValue);
        if (this.showLive && this.itemId != null && this.itemId != ""){
          this.getAuction();
        }
        
        // console.log(this.auctions);
      }
    }
  }
}
</script>

<style scoped>
.green-bg {
  background: rgba(0, 255, 0, 0.363) !important; 
}

.blue-bg {
  background: rgba(180, 225, 255, 0.363) !important; 
}

.pink-bg {
  background: rgba(255, 179, 179, 0.363) !important; 
}
.grey-bg {
  background: rgba(218, 218, 218, 0.363) !important; 
}

.green-bg:hover {
  background: rgba(0, 255, 0, 0.657) !important; 
}

.blue-bg:hover {
  background: rgba(180, 225, 255, 0.657) !important; 
}

.pink-bg:hover {
  background: rgba(255, 179, 179, 0.657) !important; 
}
.grey-bg:hover {
  background: rgba(218, 218, 218, 0.657) !important; 
}
</style>
