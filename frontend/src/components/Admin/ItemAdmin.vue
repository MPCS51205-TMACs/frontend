<template>
  <v-btn class="mr-4" @click="refresh">Refresh</v-btn>
  <v-card>
    <v-table>
      <thead>
      <tr>
        <th class="text-h5"> Name </th>
        <th class="text-h5"> Counterfeit </th>
        <th class="text-h5"> Inappropriate</th>
        <th class="text-h5"> </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in items"
        :key="item.id">
        <td>{{item.description}}</td>
        <td>{{item.counterfeit}}</td>
        <td>{{item.inappropriate}}</td>
        <td>
          <v-btn color="red" @click="deleteItem(item.id)"> Delete </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>



</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "ItemAdmin",
  data() {
    return {
      items: [{id: "1", description: "hat", counterfeit: true, inappropriate: false}, {id: "2", description: "gloves", counterfeit: true, inappropriate: true}, {id: "3", description: "scarf", counterfeit: false, inappropriate: true}],
      toDelete: null
    }
  },
  methods: {
    async getFlaggedItems(){
      const onSuccess=(resp)=>{
        this.items = resp.data
      }
      await GatewayService.sendRequest(HttpMethod.GET,"item/marked","",onSuccess)
    },

    async deleteItem(itemId){
      await GatewayService.sendRequest(HttpMethod.DELETE,`item/${itemId}`,"",this.refresh)
    },

    async refresh(){
      await this.getFlaggedItems()
    }

  },
  mounted(){
    this.refresh()
  }
}
</script>

<style scoped>

</style>
