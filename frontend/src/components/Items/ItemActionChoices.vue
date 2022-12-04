<template>
  <v-card class="ma-5">
    <v-tabs bg-color="blue-darken-1"
            grow
            v-model="tab">
      <v-tab value="get">Buy Now List</v-tab>
      <v-tab value="search">Search</v-tab>
      <v-tab value="post">Create Item</v-tab>
      <v-tab value="put">Update Item</v-tab>
      <v-tab value="delete">Delete Item</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="get">
        <h2 align="center" class="font-weight-light mt-3"> Item List </h2>
        <ItemList/> </v-window-item>
      <v-window-item value="search">
        <h2 align="center" class="font-weight-light mt-3"> Search for Item </h2>
         <SearchItem/> </v-window-item>
      <v-window-item value="post">
        <h2 align="center" class="font-weight-light mt-3"> Post an Item for Auction </h2>
        <CreateItemForm/> </v-window-item>
      <v-window-item value="put">
        <h2 align="center" class="font-weight-light mt-3"> Update an Item </h2>
        <UpdateItemForm/> </v-window-item>
      <v-window-item value="delete">
        <h2 align="center" class="font-weight-light mt-3"> Delete an Item </h2>
        <DeleteItemForm/> </v-window-item>

    </v-window>
  </v-card>
</template>

<script>
import ItemForm from "@/components/Items/CreateItemForm";
import ItemList from "@/components/Items/ItemList";
import UpdateItemForm from "@/components/Items/UpdateItemForm";
import CreateItemForm from "@/components/Items/CreateItemForm";
import DeleteItemForm from "@/components/Items/DeleteItemForm";
import SearchItem from "@/components/Items/SearchItem";
export default {
  name: "ItemActionChoices",
  components: {
    UpdateItemForm,
    ItemList,
    CreateItemForm,
    DeleteItemForm,
    SearchItem
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
