<template>
  <v-row class="admin-login">
    <v-col md="6">
      <h1 class="admin-login__header">Панель администратора</h1>
      <span v-if="isInvalidPassword" class="admin-login__form-error"
        >Неверно введен пароль! Попробуйте снова.</span
      >
      <v-form @submit.prevent="validate">
        <v-text-field
          v-model="password"
          label="Введите пароль"
          required
          type="password"
        ></v-text-field>

        <v-btn
          class="admin-login__submit"
          color="primary"
          type="submit"
          :disabled="loading"
        >
          Войти
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Api from '@/scripts/common/api';

@Component
export default class Login extends Vue {
  logged = false;
  isInvalidPassword = false;
  invalidPasswordText = '';
  password = '';
  loading = false;
  $Progress: any;
  async validate() {
    this.$Progress.start();
    this.loading = true;
    try {
      await Api.login(this.password);
      this.logged = true;
      this.$emit('logged', this.logged);
    } catch (err) {
      if (err.responseJSON?.message) {
        this.invalidPasswordText = err.responseJSON.message;
      } else {
        this.invalidPasswordText = 'Неизвестная ошибка';
      }
      this.isInvalidPassword = true;
    }
    this.$Progress.finish();
    this.loading = false;
  }
}
</script>

<style lang="scss">
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 15px;
  text-align: center;

  &__header {
    text-align: center;
    font-size: 30px;
    margin: 0 0 15px 0;

    @media (max-width: 320px) {
      font-size: 20px;
    }
  }

  &__submit {
    margin: 15px 0 0 0;
  }

  &__form-error {
    color: red;
    text-align: center;
  }
}
</style>
