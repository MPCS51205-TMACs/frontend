<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab value="post">Create Item</v-tab>
      <v-tab value="put">Update Item</v-tab>
      <v-tab value="delete">Delete Item</v-tab>
     <v-tab value="get">Get Items</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="post">
        <h2 align="center" class="font-weight-light mt-3"> Post an Item for Auction </h2>
        <CreateItemForm/> </v-window-item>
      <v-window-item value="put">
        <h2 align="center" class="font-weight-light mt-3"> Update an Item </h2>
        <UpdateItemForm/> </v-window-item>
      <v-window-item value="delete">
        <h2 align="center" class="font-weight-light mt-3"> Delete an Item </h2>
        <DeleteItemForm/> </v-window-item>
<!--      <v-window-item value="get">-->
<!--        <h2 align="center" class="font-weight-light mt-3"> Get Items </h2>-->
<!--        <ItemList/> </v-window-item>-->
    </v-window>
  </v-card>
</template>

<script>
import ItemForm from "@/components/Items/CreateItemForm";
import ItemList from "@/components/Items/ItemList";
import UpdateItemForm from "@/components/Items/UpdateItemForm";
import CreateItemForm from "@/components/Items/CreateItemForm";
import DeleteItemForm from "@/components/Items/DeleteItemForm";
export default {
  name: "ItemActionChoices",
  components: {
    UpdateItemForm,
    ItemList,
    CreateItemForm,
    DeleteItemForm
  },
  data() {
    return {
      tab: null
    }
  }

}
</script>

<style scoped>

</style>
