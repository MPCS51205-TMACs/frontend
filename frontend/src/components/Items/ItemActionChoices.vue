<template>
  <v-card class="ma-5">
    <v-tabs bg-color="green-darken-4"
            grow
            v-model="tab">
      <v-tab value="post">Create Item</v-tab>
      <v-tab value="put">Update Item</v-tab>
      <v-tab value="delete">Delete Item</v-tab>
      <v-tab value="get">Get Items</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="post"> <ItemForm/> </v-window-item>
      <v-window-item value="put"> <strong> Update Items Here </strong> </v-window-item>
      <v-window-item value="delete"> <strong> Delete Items Here </strong> </v-window-item>
      <v-window-item value="get"> <strong> <ItemList/> </strong> </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import ItemForm from "@/components/Items/ItemForm";
import ItemList from "@/components/Items/ItemList";
export default {
  name: "ItemActionChoices",
  components: {
    ItemList,
    ItemForm
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
