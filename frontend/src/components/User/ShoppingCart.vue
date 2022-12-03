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
      <td align="left"> <v-btn v-if="cartItems.length" label="Checkout" color="grey" class="ma-2" @click="checkout" >Remove</v-btn>
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
      token: "555",
      total: 0,
      subTotal: 0,
      tax: 0,
      shippingCost: 0,
      taxRate: .08
    }
  },
  created() {
    this.getShoppingCart();
    this.calculateCart();
    //this.timer = setInterval(this.calculateCart, 5000);
  },
  methods: {
    async getShoppingCart() {
      try {
        //mocky : https://run.mocky.io/v3/7cd25a26-9a5e-47ee-8444-00b6bd3f09ab
        // endpoint not correct rn , was testing w/ mocky
        const response = await axios.get("/api", {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json',
            'authentication' : 'bearer 555'
          }
        });
        this.cartItems = response.data.items;
        this.total = response.data.total_cost_cents;
        this.calculateCart();
        this.convertToDollars()
        console.log(response.data.items);
      } catch (e) {
        alert("ERROR\n" + e)
      }
    },
    checkout() {
      alert("You have successfully checked out.");
    },
    calculateCart() {
      for (let i = 0; i < this.cartItems.length; i++) {
         this.shippingCost += this.cartItems[i].shipping_cost_cents;
         this.subTotal += this.cartItems[i].price_cents;
      }
      this.tax = this.subTotal*this.taxRate;
      this.subTotal = this.subTotal + this.shippingCost
      this.total = this.subTotal + this.tax
    },
    convertToDollars(item) {
      item = (item / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})
      return item
    }
  }
}
</script>

<style scoped>

</style>
