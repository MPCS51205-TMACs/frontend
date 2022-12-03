<template>
  <v-form
    lazy-validation
    class="ma-5">
    <v-text-field
    v-model="itemId" label="Item Id" required>
    </v-text-field>
    <v-btn color="success" class="mr-4" @click="stopAuction">stop</v-btn>
    <v-alert v-show="showSuccess" type="success">{{this.submission_status}}+ {{this.submission_msg}}</v-alert>
    <v-alert v-show="showWarning" type="warning">{{this.submission_msg}}. </v-alert>
    <v-alert v-show="showFailure" type="error">{{this.submission_msg}}</v-alert>
  </v-form>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "StopForm",
    data() {
      return {
        submission_status: null,
        submission_msg: '',
        itemId : ''
      }
    },
    methods: {
      async stopAuction() {
        try {
          await axios.post(
            "/api/api/v1/stopAuction/"+this.itemId,
            { 
              headers: {"Authorization" : "Bearer "+localStorage.getItem("token")},
            }
          ).then(r => {
            this.submission_status = r.status;
            this.submission_msg = r.message+". "+r.data.message;
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
  