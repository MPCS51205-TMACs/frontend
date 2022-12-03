<template>
  <v-toolbar class="header">
    <v-toolbar-title align="center" class="text-white text-h2 font-weight-bold mt-5">Webay</v-toolbar-title>
  </v-toolbar>
  <div>
    <v-card class="ma-10" v-if="showLogin">
      <v-form class="mr-15 ml-15 mt-10">
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
    <SignUp v-if="showSignup"/>

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
      showSignup: false
    }
  },
  methods: {
    async login() {
      await axios.post("/api/login", {
        email: this.email,
        password: this.password
      }).then(r => {
        localStorage.setItem("token", r.data.token);
        this.$router.push("/home");
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
