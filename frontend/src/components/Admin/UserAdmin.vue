<template>
  <v-card>
    <v-select
      v-model="toBlock"
      :items="users"
      item-title="name"
      return-object
      single-line
    ></v-select>
    <v-btn color="red" class="mr-4" @click="blockUser">Block User</v-btn>
  </v-card>
  <v-divider></v-divider>
  <v-card>
    <v-select
      v-model="toSuspend"
      :items="users"
      item-title="name"
      return-object
      single-line
    ></v-select>
    <v-btn color="red" class="mr-4" @click="suspendUser">Suspend User</v-btn>
  </v-card>
  <v-divider></v-divider>
  <v-card>
    <v-select
      v-model="toUnsuspend"
      :items="suspendedUsers"
      item-title="name"
      return-object
      single-line
    ></v-select>
    <v-btn color="success" class="mr-4" @click="unsuspendUser">Unsuspend User</v-btn>
  </v-card>
  <v-divider></v-divider>


</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "UserAdmin",
  data() {
    return {
      users: [],
      suspendedUsers:[],
      toBlock: null,
      toSuspend: null,
      toUnsuspend: null
    }
  },
  methods: {
    async getUsers(){
      const onSuccess=(resp)=>{
        this.users = resp.data
      }
      await GatewayService.sendRequest(HttpMethod.GET,"user/all","mini=true",onSuccess)
    },

    async getSuspendedUsers(){
      const onSuccess=(resp)=>{
        this.suspendedUsers = resp.data
      }
      await GatewayService.sendRequest(HttpMethod.GET,"user/admin/suspended","",onSuccess)
    },

    async blockUser(){
      let userId = this.toBlock.id
      await GatewayService.sendRequest(HttpMethod.POST,`user/admin/${userId}/block`,"", this.refresh)
    },

    async suspendUser(){
      let userId = this.toSuspend.id
      await GatewayService.sendRequest(HttpMethod.PUT,`user/admin/${userId}/suspend`,"", this.refresh)
    },

    async unsuspendUser(){
      let userId = this.toUnsuspend.id
      await GatewayService.sendRequest(HttpMethod.PUT,`user/admin/${userId}/unsuspend`,"", this.refresh)
    },

    async refresh(){
      await this.getUsers()
      await this.getSuspendedUsers()
    }

  },
  mounted(){
    this.refresh()
  }
}
</script>

<style scoped>

</style>
