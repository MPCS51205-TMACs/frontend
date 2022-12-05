<template>
  <v-card ref="account">
    <v-card-item>
      <v-btn color="red" class="mr-4" size="small" @click="deleteAccount">Delete Account</v-btn>
      <v-btn color="red" class="mr-4" size="small" @click="getMe">Refresh</v-btn>
      <v-container>
        <v-row
          justify="space-between"
        >
          <v-col>
            <v-table>
              <thead>
              <tr>
                <th>
                  PROFILE INFORMATION
                </th>
                <th>Update</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><b>Name: </b></td>
                <td>
                  <v-form
                    ref="form"
                    lazy-validation
                    class="ma-2"
                  >
                    <v-text-field
                      v-model="update.name"
                      :placeholder = "me.name"
                      required
                    ></v-text-field>
                  </v-form>
                </td>
              </tr>
              <tr>
                <td><b>Email: </b></td>
                <td>
                  <v-form
                    ref="form"
                    lazy-validation
                    class="ma-2"
                  >
                    <v-text-field
                      v-model="update.email"
                      :placeholder = "me.email"
                      required
                    ></v-text-field>
                  </v-form>
                </td>
              </tr>
              <tr>
                <td><b>Payment info: </b></td>
                <td>
                  <v-form
                    ref="form2"
                    lazy-validation
                    class="ma-2"
                  >
                    <v-text-field
                      v-model="update.paymentMethod"
                      :placeholder="me.paymentMethod"
                      required
                    ></v-text-field>
                  </v-form>
                </td>
              </tr>
              <tr>
                <td><b>Home Address: </b></td>
                <td>
                  <v-form
                    ref="form3"
                    lazy-validation
                    class="ma-2"
                  >
                    <v-text-field
                      v-model="update.homeAddress"
                      :placeholder="me.homeAddress"
                      required
                    ></v-text-field>
                  </v-form>
                </td>
              </tr>
              </tbody>
            </v-table>
            <v-btn
              color="success" class="mr-4" size="small" @click="updateProfile">Update Profile
            </v-btn>
          </v-col>

        </v-row>
      </v-container>
    </v-card-item>
  </v-card>
  <v-card>
    <v-divider></v-divider>
    <v-card-item>
      <template v-slot:title>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="mr-1 pb-1"
        ></v-icon>
        {{ this.emails.length }} Notifications!
        <v-card-actions>
          <v-btn @click="expand = !expand">
            {{ !expand ? 'Show All' : 'Hide' }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card-item>
    <v-divider></v-divider>

    <v-expand-transition>
      <div class="py-2" v-if="expand">
        <v-list lines="three">
          <div v-if="!emails.length"><h3 style="margin-left:20px">No notifications yet.</h3></div>
        </v-list>
        <v-table v-if="emails.length">
          <thead>
          <tr>
            <th>
              FROM
            </th>
            <th>
              DATE SEND
            </th>
            <th>
              SUBJECT
            </th>
            <th>
              MESSAGE
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="email in emails"
            :key="email.email_id"
          >
            <td>{{ email.senderEmail }}</td>
            <td>{{ email.sentDate }}</td>
            <td>{{ email.subject }}</td>
            <td>{{ email.body }}</td>
          </tr>

          </tbody>
        </v-table>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
/**
 * {
 *         "id": "07d8f0d6-ded3-4eb6-b54c-472cd1d8fc2a",
 *         "senderId": "874555dc-7974-4229-ba03-6b000275fca2",
 *         "receiverId": "874555dc-7974-4229-ba03-6b000275fca2",
 *         "senderEmail": "alerts@webay.com",
 *         "receiverEmail": "email",
 *         "senderName": "Admin",
 *         "receiverName": "Your name",
 *         "sentDate": "2022-12-03T04:21:09.231",
 *         "subject": "Auction end alert!",
 *         "body": "Auction end alert!",
 *         "templateType": "auction-end"
 *     }
 */
import axios from "axios";
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "Account",
  data() {
    return {
      emails: this.getEmails(),
      userId: ''
      , expand: false,
      update: {name: null, email: null, paymentMethod: null, homeAddress: null},
      me: {name: null, email:null, paymentMethod: null, homeAddress:null}
    }
  },
  created() {
    this.timer = setInterval(this.getEmails, 1000);
  },
  methods: {
    async getUserId(){
      try {
        const url = "/api/user"
        const response = await axios.get(url, {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
            //'authentication': "Bearer" + this.token
          }
        });
        this.userId = response.data.id;
        console.log('userId')
      } catch (e) {
        console.log("Could not retrieve user id." + response)
      }
    },
    async getEmails() {
      try {
        const url = "/api/api/v1/notification/email"
        const response = await axios.get(url, {
          headers: {
            'content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        })
        this.emails = response.data;
      } catch (e) {
        console.log("Could not retrieve emails", e)
      }
    },
    async deleteAccount() {
      await GatewayService.sendRequest(HttpMethod.DELETE, "user", "", (resp) => {
        this.$router.push("/")
      })
    },

    async updateProfile() {
      await GatewayService.sendRequest(HttpMethod.PUT, "user", "", (resp) => {this.getMe()}, () => {}, this.update)
      this.$refs.form.reset()
      this.$refs.form1.reset()
      this.$refs.form2.reset()
      this.$refs.form3.reset()
    },

    async getMe(){
      await GatewayService.sendRequest(HttpMethod.GET,"user","",(resp)=>{this.me=resp.data})
    }
  },
  mounted() {
    this.getMe()
  }
}
</script>
<style scoped>

</style>

