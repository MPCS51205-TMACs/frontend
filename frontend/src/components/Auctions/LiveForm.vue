<template>
  <!-- <div height="20px">
    <v-sheet class="font-weight-light text-h5 pa-2">
      {{this.updateTime}} [UTC]</v-sheet>
  </div> -->
  <!-- <div>time: {{timeDateChild}} </div> -->
  <v-table density="compact" height="350px" >
    <!-- fixed-header="true" -->
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
          <th class="text-left">
            top bidder [User Id]
          </th>
          <th class="text-left">
            progress
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


</template>

<script>
import axios from "axios";

export default {
  name: "ItemList",
  data() {
    return {
      auctions: [],
      // timer: '',
      error: false,
      // updateTime: this.getUTCTimeStr(),
    }
  },
  props: ["timeDateChild"],
  // {
  //   timeDate: {
  //       type: Date,
  //       default: new Date()
  //   }
  // },
  
  mounted() {
    this.getActiveAuctions();
  },
  // created() {
  //   // this.getActiveAuctions();
  //   this.timer = setInterval(this.getActiveAuctions, 1000);
  // },
  // beforeDestroy() {
  //   this.cancelAutoUpdate();
  // },
  methods: {
    async getActiveAuctions() {
      try {
        await axios.get(
          "/api/api/v1/activeAuctions/",
          { 
              headers: {"Authorization" : "Bearer "+localStorage.getItem("token")},
          }
        ).then(r => {
          this.auctions = r.data.auctions;
          // this.updateTime = this.getUTCTimeStr();
          // console.log(timeDate);
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
    // progress(startDateStr,endDateStr) {
    //   let startDate = this.toUTCFromStr(startDateStr);
    //   let endDate = this.toUTCFromStr(endDateStr);
    //   if (this.timeDateChild > endDate) {
    //     return 1;
    //   }

    //   if (this.timeDateChild < startDate) {
    //     return 0;
    //   }
    //   // var startDate = new Date();
    //   // Do your operations
    //   // var endDate   = new Date();
    //   var secondsTotal = (endDate.getTime() - startDate.getTime()) / 1000;
    //   var secondsElapsed = (endDate.getTime() - startDate.getTime()) / 1000;
    //   return (secondsTotal-secondsElapsed)/secondsTotal
    // },
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
    // cancelAutoUpdate() {
    //   clearInterval(this.timer);
    // },
    // getUTCTimeStr() {
    //   let date = new Date();
    //   return [
    //     date.getUTCFullYear(),
    //     this.padTo2Digits(date.getUTCMonth()),
    //     this.padTo2Digits(date.getDay()),
    //   ].join("-")+" "+[
    //     this.padTo2Digits(date.getUTCHours()),
    //     this.padTo2Digits(date.getUTCMinutes()),
    //     this.padTo2Digits(date.getUTCSeconds()),
    //   ].join(':');
    // },
    // padTo2Digits(num) {
    //   return num.toString().padStart(2, '0');
    // }
    
  },
  watch: { 
    timeDateChild: { // watch it
      immediate: true,
      // deep: true,
      handler(newValue,oldValue){
        // console.log('Prop changed: ', newValue, ' | was: ', oldValue);
        this.getActiveAuctions();
        // console.log(this.auctions);
      }
    }
  }
  // computed: {
  //   progress(startDateStr,endDateStr) {
  //     startDate = this.toDatetimeFromStr(startDateStr);
  //     endDate = this.toDatetimeFromStr(endDateStr);
  //     if (endDate > this.timeDateChild) {
  //       return 1;
  //     }

  //     if (this.timeDateChild < startDate) {
  //       return 0;
  //     }
  //     // var startDate = new Date();
  //     // Do your operations
  //     // var endDate   = new Date();
  //     var secondsTotal = (endDate.getTime() - startDate.getTime()) / 1000;
  //     var secondsElapsed = (endDate.getTime() - startDate.getTime()) / 1000;
  //     return (secondsTotal-secondsElapsed)/secondsTotal
  //   }
  // }
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
  background: rgba(255, 179, 179, 0.363) !important; 
}
.grey-bg {
  background: rgba(218, 218, 218, 0.363) !important; 
}

.green-bg {
  background: rgba(0, 255, 0, 0.657) !important; 
}

.blue-bg {
  background: rgba(180, 225, 255, 0.657) !important; 
}

.pink-bg {
  background: rgba(255, 179, 179, 0.657) !important; 
}
.grey-bg {
  background: rgba(218, 218, 218, 0.657) !important; 
}
</style>

