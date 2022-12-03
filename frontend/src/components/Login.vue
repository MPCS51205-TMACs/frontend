<template>
  <v-toolbar class="header">
    <v-toolbar-title align="center" class="text-white text-h2 font-weight-bold mt-5">Webay</v-toolbar-title>
  </v-toolbar>
  <div>
    <v-card class="ma-10" v-if="showLogin">
      <div v-if="signupStatus" class="text-center ma-5 text-green-darken-1">
        <h3> Sign up successful! Please login with your new credentials. </h3>
      </div>
      <div v-if="loginFail" class="text-center ma-5 text-red-darken-1">
        <h3> Login Unsuccessful. Please try again. </h3>
      </div>
      <v-form class="mr-15 ml-15 mt-10" ref="form">
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
      </v-form>
      <v-div>
        <v-btn class="text-white bg-amber ma-3" @click="login">Login</v-btn>
        <v-btn class="border-double ma-3" @click="toSignup">Sign Up</v-btn>
      </v-div>
    </v-card>
    <SignUp v-if="showSignup" @signupStatus="(state) => {
      this.signupStatus = state
      this.showLogin = true
      this.showSignup = false
      this.loginFail = false
    }"/>
  </div>
</template>

<script>
import SignUp from "@/components/User/SignUp";
import axios from "axios";
export default {
  name: "Login",
  components: {SignUp},
  data() {
    return {
      email: '',
      password: '',
      showLogin: true,
      showSignup: false,
      signupStatus: false,
      loginFail: false
    }
  },
  methods: {
    async login() {
      await axios.post("/api/login", {
        email: this.email,
        password: this.password
      }).then(r => {
        localStorage.setItem("token", r.data.token);
        localStorage.setItem("isAdmin", r.data.admin);
        this.$router.push("/home");
      }).catch(reason => {
        this.loginFail = true
        this.$refs.form.reset()
        console.log(reason)
      })
    },
    toSignup() {
      this.showLogin = false;
      this.showSignup = true;
    }
  }
}
</script>

<style scoped>
.header {
  background-color: black;
  height: 90px;
}

</style>
