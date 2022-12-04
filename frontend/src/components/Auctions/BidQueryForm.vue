<template>
  <v-form
    lazy-validation
    class="ma-5">
    <v-text-field
    v-model="userId" label="User Id" required>
    </v-text-field>
    <v-btn color="success" class="mr-4" @click="getItemsUserHasBidsOn">query</v-btn>
    <v-alert v-show="showSuccess" type="success">{{this.submission_status}}</v-alert>
    <v-alert v-show="showWarning" type="warning">{{this.submission_status}}. {{this.submission_msg}} </v-alert>
    <v-alert v-show="showFailure" type="error">{{this.submission_status}}. {{this.submission_msg}}</v-alert>
  </v-form>
  <v-table v-show="(this.submission_status==200)" density="compact" height="300px" >
    <!-- fixed-header="true" -->
      <thead>
        <tr>
          <th class="text-left">
            Item Id
          </th>
          <!-- <th class="text-left">
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
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="itemid in itemIdsWithUserBids"
        >
          <td>{{ itemid }}</td>
        </tr>
      </tbody>
    </v-table>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "BidQueryForm",
    data() {
      return {
        submission_status: null,
        submission_msg: '',
        userId : '',
        itemIdsWithUserBids : []
      }
    },
    methods: {
      async getItemsUserHasBidsOn() {
        try {
          await axios.get(
            "/api/api/v1/ItemsUserHasBidsOn/"+this.userId,
            { 
              headers: {"Authorization" : "Bearer "+localStorage.getItem("token")},
            }
          ).then(r => {
            console.log(r.data);
            // console.log(r.data.response.status);
            this.submission_status = r.status;
            this.submission_msg = r.message;
            this.itemIdsWithUserBids = r.data.itemids;
          });
        } catch(e) {
          // console.log(e);
          // console.log(e.status);
          this.submission_status = e.response.status;
          this.submission_msg = e.message+". ";
          
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
  