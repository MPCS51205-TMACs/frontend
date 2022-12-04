<template>
  <v-btn class="mr-4" @click="refresh">Refresh</v-btn>
  <v-card>
    <v-select
      v-model="inappropriate"
      :items="items"
      item-title="description"
      return-object
      single-line
    ></v-select>
    <v-btn color="success" class="mr-4" @click="markInappropriate">Mark Inappropriate</v-btn>
  </v-card>
  <v-divider></v-divider>
  <v-card>
    <v-select
      v-model="counterfeit"
      :items="items"
      item-title="description"
      return-object
      single-line
    ></v-select>
    <v-btn color="success" class="mr-4" @click="markCounterfeit">Mark Counterfeit</v-btn>
  </v-card>



</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "ItemAdmin",
  data() {
    return {
      items: [{id: "1", description: "hat"}, {id: "2", description: "gloves"}, {id: "3", description: "scarf"}],
      inappropriate: null,
      counterfeit: null,
    }
  },
  methods: {
    async getItems(){
      const onSuccess=(resp)=>{
        this.items = resp.data
      }
      await GatewayService.sendRequest(HttpMethod.GET,"item/all","",onSuccess)
    },

    async markInappropriate(){
      let itemId = this.inappropriate.id
      await GatewayService.sendRequest(HttpMethod.POST,`item/inappropriate/${itemId}`,"", this.refresh)
    },

    async markCounterfeit(){
      let itemId = this.counterfeit.id
      await GatewayService.sendRequest(HttpMethod.PUT,`item/counterfeit/${itemId}`,"", this.refresh)
    },

    async refresh(){
      await this.getItems()
    }

  },
  mounted(){
    this.refresh()
  }
}
</script>

<style scoped>

</style>
