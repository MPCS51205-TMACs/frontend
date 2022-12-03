<template>
<v-form
  lazy-validation
  class="ma-5">
  <v-text-field
    v-model="itemId" label="Item Id" required>
  </v-text-field>
  <!-- <v-text-field
  v-model="userId" label="User Id" required>
  </v-text-field> -->
  <v-text-field
    v-model.number="offerAmountDollars" label="Offer Amount $" placeholder="0">
  </v-text-field>
  <v-btn color="success" class="mr-4" @click="submitBid">submit bid</v-btn>
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
      offerAmountDollars: null,
      submission_status: null,
      submission_msg: '',
    }
  },
  methods: {
    async submitBid() {
      try {
        await axios.post(
          "/api/api/v1/Bids/",
          {
            itemid: this.itemId,
            amountincents: this.offerAmountDollars*100,
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
    }
  },
  computed: {
    showSuccess() {
      return this.submission_status === 200;
    },
    showInfo() {
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
