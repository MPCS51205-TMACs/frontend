<template>
  <v-card ref="account">
    <v-card-item>
      <v-container>
        <v-row
          justify="space-between"
        >
          <v-col>
          <v-table v-if="emails.length" class="ma-1">
            <thead>
            <tr>
              <th>
                PROFILE INFORMATION
              </th>
              <th></th>
              <th>Update</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><b>Name: </b></td>
              <td align="left">your name</td>
              <td><v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="ma-2"
              >
                <v-text-field
                  v-model="Name"
                  label="Name"
                  required
                ></v-text-field>
                <v-btn color="success" class="mr-4" size="small" @click="updateProfile">Update Name</v-btn>
              </v-form></td>
            </tr>
            <tr>
              <td><b>Email: </b></td>
              <td align="left">your email</td>
              <td><v-form
              ref="form"
              class="ma-2"
            >
              <v-text-field
                label="Name"
                required
                size="small"
              ></v-text-field>
              <v-btn color="success" class="mr-4" size="small" @click="updateProfile">Update Name</v-btn>
            </v-form>
            </td>
            </tr>
            <tr>
              <td><b>Payment info: </b></td>
              <td align="left">payment info</td>
              <td><v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="ma-2"
            >
              <v-text-field
                v-model="Name"
                label="Name"
                required
              ></v-text-field>
              <v-btn color="success" class="mr-4" size="small" @click="updateProfile">Update Name</v-btn>
            </v-form>
            </td>
            </tr>
            </tbody>
          </v-table>
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
        {{this.emails.length}} Notifications!
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
              <th >
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
export default {
  name: "Account",
  data() {
    return {
      emails: this.getEmails()
      ,expand: false
    }
  },
  created() {
    this.timer = setInterval(this.getEmails, 1000);
  },
  methods: {
    async getEmails() {
      try {
              const response = await axios.get("api/api/v1/notification/email");
              this.emails = response.data;
            } catch (e) {
              console.log("Could not retrieve emails")
              //alert("ERROR\n" + e)
       }
    }
   }
}
</script>
<style scoped>

</style>

