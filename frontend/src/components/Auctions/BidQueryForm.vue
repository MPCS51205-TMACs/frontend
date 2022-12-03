<template>
  <v-form
    lazy-validation
    class="ma-5">
    <!-- <v-text-field
      v-model="itemId" label="Item Id" required>
    </v-text-field> -->
    <v-text-field
    v-model="userId" label="User Id" required>
    </v-text-field>
    <!-- <v-text-field
      v-model.number="offerAmountDollars" label="Offer Amount $" placeholder="0">
    </v-text-field> -->
    <v-btn color="success" class="mr-4" @click="getItemsUserHasBidsOn">query</v-btn>
    <v-alert v-show="showSuccess" type="success">{{this.submission_status}}</v-alert>
    <v-alert v-show="showWarning" type="warning">{{this.submission_status}}. {{this.submission_msg}} </v-alert>
    <v-alert v-show="showFailure" type="error">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
  </v-form>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "BidQueryForm",
    data() {
      return {
        submission_status: null,
        submission_msg: '',
        userid : []
      }
    },
    methods: {
      async getItemsUserHasBidsOn() {
        try {
          await axios.get(
            "/api/api/v1/ItemsUserHasBidsOn/"+this.userId,
            { 
              // headers: {"Authorization" : `Bearer ${token}`},
            }
          ).then(r => {
            console.log(r);
            // console.log(r.data.response.status);
            this.submission_status = r.status;
            this.submission_msg = r.message+". "+r.data.message;
            // this.auctions = r.data.auctions;
          });
        } catch(e) {
          console.log(e);
          console.log(e.status);
          this.submission_status = e.response.status;
          this.submission_msg = e.message+". "+e.response.data.message;
          
        }
      }
    },
    computed: {
      showSuccess() {
        return this.submission_status === 200;
      },
      showWarning() {
        return this.submission_status === 401;
      },
      showFailure() {
        return this.submission_status != 200 && this.submission_status != 401 && this.submission_status != null;
      },
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  