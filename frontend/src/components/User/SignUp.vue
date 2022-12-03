<template>
  <v-card class="ma-10">
    <v-form class="mr-15 ml-15 mt-10" ref="form">
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model.number="paymentMethod"
        label="Credit Card Number"
        required
      ></v-text-field>
      <v-checkbox v-model="isAdmin" label="Admin"></v-checkbox>
    </v-form>
    <v-div>
      <v-btn class="border-double ma-3" @click="signup">Sign Up</v-btn>
    </v-div>
    <div v-if="error" class="text-center text-red-accent-3 border-double">
      <h3>Sign up not successful. Please try again.</h3>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      name: '',
      email: '',
      password: '',
      paymentMethod: null,
      isAdmin: false,
      signupSuccess: false,
      error: false
    }
  },
  methods: {
    async signup() {
      await axios.post("/api/register", {
        name: this.name,
        email: this.email,
        password: this.password,
        admin: this.isAdmin,
        paymentMethod: this.paymentMethod
      }).then(r => {
        this.error = false
        this.$emit('signupStatus', this.signupSuccess = true)
      }).catch(reason => {
        this.error = true
        this.$refs.form.reset()
        console.log(reason)
      })
    }
  }
}
</script>

<style scoped>

</style>
