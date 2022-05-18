<template>
  <div class="wrapper">
    <v-container>
      <div class="login">
        <v-card width="500">
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <p class="app-error" v-show="error">{{ error }}</p>
              <v-text-field
                label="username"
                @keyup.enter="$refs['password'].focus()"
                ref="username"
                v-model="form.Username"
                :rules="rules.Username"
                :error-messages="errors['username']"
                outlined
              ></v-text-field>
              <v-text-field
                ref="password"
                @keyup.enter="valid ? login() : ''"
                v-model="form.Password"
                :rules="rules.Password"
                label="password"
                type="password"
                :error-messages="errors.password"
                outlined
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                :loading="loading"
                @click.prevent="login"
                class="app-btn"
                >تسجيل دخول</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script lang="ts">
import { loginValidation } from "@/utils/validations/validations"
import { Login, Validate } from "@/repositories/user"
 import {loginRequest} from '@/models/user'
// import {snackBar} from '@/utils/Helpers'
export default {
  data() {
    return {
      error: '',
      loading: false,
      valid: true,
      rules: loginValidation,
      errors: {},
      form: {
        Username: "",
        Password: "",
      },
    };
  },
  methods: {
    async login() {
      this.loading = true;
      await (this.$refs.form as Vue & { validate: () => boolean }).validate();
      if (this.valid) {
        const payload: loginRequest = {
          Username : parseInt(this.form.Username),
          Password : this.form.Password
        }
        Login(payload)
          .then((d) => {
            this.error = '';
            this.loading = false;
            localStorage.setItem("token", d.token);
            this.$router.push("/");
          })
          .catch((e) => {
            this.loading = false;
            this.error = "بيانات غير صحيحة";
          });
      }
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      Validate().then((res) => {
        if (res) this.$router.push("/")
      });
    }
  },
};
</script>
<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>