<template>
  <v-table>
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
</template>


<script>
import axios from "axios";
export default {
  name: "ShoppingCart",
  data() {
    return {
      cartItems: [],
      total: 0,
      subTotal: 0,
      tax: 0,
      shippingCost: 0,
      taxRate: .08,
      // USE GLOBAL VARS
      userID: "571d4376-fada-41a7-affa-a797ced90fd1",
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NzFkNDM3Ni1mYWRhLTQxYTctYWZmYS1hNzk3Y2VkOTBmZDEiLCJhdWQiOiJtcGNzNTEyMDUiLCJpc3MiOiJ1c2VyLXNlcnZpY2UiLCJuYW1lIjoiVWZKYmsxd3h4bXdadnZkIiwiZXhwIjoxNjcwMDg0NjcyLCJpYXQiOjE2NzAwNDE0NzIsImVtYWlsIjoiVWZKYmsxd3h4bXdadnZkQG1wY3MuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl19.8ArtadxEixq3wlfspSSsHIMUWSk5Zkzec7akgSmh0Gc"
    }
  },
  created() {
    this.getShoppingCart();
    this.calculateCart();
    this.timer = setInterval(this.getShoppingCart, 7000);
  },
  methods: {
    async getShoppingCart() {
      try {
        //mocky : https://run.mocky.io/v3/7cd25a26-9a5e-47ee-8444-00b6bd3f09ab
        // endpoint not correct rn , was testing w/ mocky
        const url = "/api/carts/" + this.userID
        const response = await axios.get(url, {
          headers: {
            'content-type': 'application/json',
            'authentication': "bearer" + this.token
          }
        });
        this.cartItems = response.data.items;
        this.total = response.data.total_cost_cents;
        this.calculateCart();
        this.convertToDollars()
        console.log(response.data.items);
      } catch (e) {
        log.console("Could not retrieve shopping cart.")
        //alert("Could not retrieve shopping cart.\n" + e)
      }
    },
    async removeFromCart(item_id) {
      try {
        const url = "/api/carts/item"
        const response = await axios.delete(url, {
          data: { user_id: this.userID, item_id: item_id },
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json',
            'authentication': "bearer" + this.token
          }
        });
        alert("Removing item " + item_id + " from cart.\n")
        this.getShoppingCart()
        //this.cartItems = response.data.items;
        //this.total = response.data.total_cost_cents;
        //this.calculateCart();
        //this.convertToDollars()
        //console.log(response.data.items);
      } catch (e) {
        log.console("Could not remove item.")
        alert("Could not remove item\n" + e)
        this.getShoppingCart()
      }
      //this.getShoppingCart()
    },
    checkout() {
      this.getShoppingCart();
      alert("You have successfully checked out.");
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
    }
  }
}
</script>

<style scoped>

</style>
