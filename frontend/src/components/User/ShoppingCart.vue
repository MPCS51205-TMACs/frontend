<template>
  <v-list lines="three">
    <v-list-item> <div v-if="!cartItems.length"><h3>No items in cart.</h3></div></v-list-item>
  </v-list>
  <v-table v-if="cartItems.length">
    <thead>
    <tr>
      <th>
        ITEM
      </th>
      <th >
      </th>
      <th >
        PRICE
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in cartItems"
      :key="item.item_id"
    >
      <td>{{ item.item_id }}</td>
      <td align="left"> <v-btn v-if="cartItems.length" label="Checkout" color="grey" class="ma-2" @click="removeFromCart(item.item_id)" >Remove</v-btn>
      </td>
      <td>${{ item.price_cents/100 }}</td>
    </tr>
    <tr>
      <td></td>
      <td align="right"><i>Shipping Fees</i></td>
      <td>{{this.convertToDollars(this.shippingCost)}}</td>

    </tr>
    <tr>
      <td></td>
      <td align="right"><i>Tax</i></td>
      <td>{{this.convertToDollars(this.tax)}}</td>
    </tr>
    <tr>
      <td></td>
      <td align="right"><b>Total</b></td>
      <td><b>{{this.convertToDollars(this.total)}}</b></td>
    </tr>
    </tbody>
    <tfoot align="center">
    <tr>
      <td >
      </td>
      <td align="right" colspan="2"> <v-btn v-if="cartItems.length" label="Checkout" color="green" class="ma-5" @click="checkout" >Checkout</v-btn>
      </td>
    </tr>
  </tfoot>
  </v-table>

  <v-card>
    <v-divider></v-divider>
    <v-card-item>
      <template v-slot:title>
        Receipts
        <v-card-actions>
          <v-btn @click="expand = !expand; getReceiptsForUser()">
            {{ !expand ? 'Show All' : 'Hide' }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card-item>
    <v-divider></v-divider>

    <v-expand-transition>
      <div class="py-2" v-if="expand">
        <v-list lines="three">
          <h3 style="margin-left:20px" v-if="!receipts.length">No receipts yet.</h3>
        </v-list>
        <v-table v-if="receipts.length">
          <thead>
          <tr>
            <th>
              RECEIPT ID
            </th>
            <th >
              DATE PROCESSED
            </th>
            <th >
              TOTAL
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="receipt in receipts"
            :key="receipt.receipt_id"
          >
            <td>{{receipt.receipt_id}}</td>
            <td>{{receipt.time_processed}}</td>
            <td>{{this.convertToDollars(receipt.total_cost_str)}}</td>
          </tr>
          </tbody>
        </v-table>
      </div>
    </v-expand-transition>
  </v-card>
</template>



<script>
/** "receipt_id": "c8b2e377-9860-4e03-955c-d3e139df2e06",
"user_id": "571d4376-fada-41a7-affa-a797ced90fd1",
  "time_processed": "2022-12-03 05:36:15.731581",
  "bill": {
  "total_cost_str": "$0.00",
    "total_cost_cents": 0,
    "items": []
 **/
import axios from "axios";
export default {
  name: "ShoppingCart",
  data() {
    return {
      expand: false,
      receipts: [],
      cartItems: [],
      total: 0,
      subTotal: 0,
      tax: 0,
      shippingCost: 0,
      taxRate: .08,
      userId: ''
    }
  },
  created() {
    this.getShoppingCart();
    this.timer = setInterval(this.getShoppingCart, 3000);
    //this.getUserId()
  },
  methods: {
    async getUserId(){
      try {
        const url = "/api/user"
        const response = await axios.get(url, {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        });
        this.userId = response.data.id;
      } catch (e) {
        console.log("Could not retrieve user id." + response)
      }
    },
    async getShoppingCart() {
      this.getUserId()
      try {
        const url = "/api/carts/" + this.userId
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        });
        this.cartItems = response.data.items;
        this.total = response.data.total_cost_cents;
        this.calculateCart();
        this.convertToDollars();
        this.getReceiptsForUser();
        console.log(response.data.items);
      } catch (e) {
        console.log("Could not retrieve shopping cart.")
        //alert("Could not retrieve shopping cart.\n" + e)
      }
    },
    async removeFromCart(item_id) {
      try {
        const url = "/api/carts/item"
        const response = await axios.delete(url, {
          data: {
            user_id: this.userId, item_id: item_id },
            headers: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token")
            }
          }
        );
        alert("Removing item " + item_id + " from cart.\n")
        this.getShoppingCart()
      } catch (e) {
        console.log("Could not remove item.")
        alert("Could not remove item\n" + e)
        this.getShoppingCart()
      }
    },
    async checkout() {
      let response = ""
      try {
        const url = "/api/carts/checkout"
        response = await axios.post(url,
          {
           user_id: this.userId }, {
            headers: {
              'content-type': 'application/json',
              'Authorization': "Bearer " + localStorage.getItem("token")
            }
          }
        );
        console.log(response)
        this.getShoppingCart()
      } catch (e) {
        console.log("Could not checkout" + e.response)
        alert("Could not Checkout!\n" + e.response.data.message)
        this.getShoppingCart()
      }
    },
    calculateCart() {
      this.shippingCost = 0
      this.subTotal = 0
      for (let i = 0; i < this.cartItems.length; i++) {
        this.shippingCost += this.cartItems[i].shipping_cost_cents;
        this.subTotal += this.cartItems[i].price_cents;
      }
      this.tax = this.subTotal * this.taxRate;
      this.subTotal = this.subTotal + this.shippingCost
      this.total = this.subTotal + this.tax
    },
    convertToDollars(item) {
      item = (item / 100).toLocaleString("en-US", {style: "currency", currency: "USD"})
      return item
    },
    async getReceiptsForUser(){
      try {
        const url = "/api/receipts/?user_id=" + this.userId
        const response = await axios.get(url, {
          headers: {
            'content-type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
          }
        });
        this.receipts = response.data;
        console.log("receipts!")
        console.log(this.receipts)
      } catch (e) {
        log.console("Could not retrieve receipts.")
        //alert("Could not retrieve receipts.\n" + e)
      }
    }
  }
}
</script>
<style scoped>
</style>
