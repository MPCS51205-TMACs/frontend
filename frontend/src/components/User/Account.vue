<template>
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
            <v-list-item
              v-for="email in emails"
              :key="email.id"
              :title="email.subject">
            </v-list-item>
            <v-list-item> <div v-if="!emails.length"><h3>No notifications yet.</h3></div></v-list-item>
          </v-list>
        </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Account",
  data() {
    return {
      emails: this.getEmails(),
      expand: false
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
              log.console("Could not retrieve emails")
              //alert("ERROR\n" + e)
       }
    }
   }
}
</script>
<style scoped>

</style>

