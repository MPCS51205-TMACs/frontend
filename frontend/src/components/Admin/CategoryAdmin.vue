<template>
  <v-card>
    <v-text-field v-model="newCategory"></v-text-field>
    <v-btn color="success" class="mr-4" @click="createCategory">Add Category</v-btn>
  </v-card>
  <v-card>
    <v-select
      v-model="toDelete"
      :items="categories"
      item-title="categoryDescription"
      return-object
      single-line
    ></v-select>
    <v-btn color="red" class="mr-4" @click="deleteCategory">Delete Category</v-btn>
  </v-card>
  <v-divider></v-divider>
  <v-card>
    <v-select
      v-model="toModify"
      :items="categories"
      item-title="categoryDescription"
      return-object
      single-line
    ></v-select>
    <v-text-field v-model="modification"></v-text-field>
    <v-btn color="blue" class="mr-4" @click="modifyCategory">Modify Category</v-btn>
  </v-card>
  <v-divider></v-divider>


</template>

<script>
import {GatewayService, HttpMethod} from "@/service/gatewayService";

export default {
  name: "CategoryAdmin",
  data() {
    return {
      categories: [{id: "1", categoryDescription: "Sports"}],
      newCategory:null,
      toDelete: null,
      toModify: null,
      modification: null
    }
  },
  methods: {
    async getCategories(){
      const onSuccess=(resp)=>{
        this.categories = resp.data
      }
      await GatewayService.sendRequest(HttpMethod.GET,"category","",onSuccess)
    },

    async createCategory(){

      await GatewayService.sendRequest(HttpMethod.POST,"category","",this.refresh,()=>{},{categoryDescription: this.newCategory})

    },

    async deleteCategory(){
      await GatewayService.sendRequest(HttpMethod.DELETE,`category/${this.toDelete.id}`,"",this.refresh)
    },

    async modifyCategory(){
      await GatewayService.sendRequest(HttpMethod.PUT,`category/${this.toModify.id}`,"",this.refresh,()=>{},this.modification)
    },

    async refresh(){
      await this.getCategories()
    }

  },
  mounted(){
    this.refresh()
  }
}
</script>

<style scoped>

</style>
